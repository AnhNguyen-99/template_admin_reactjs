import React, { useEffect } from 'react'
import { Grid, TableBody, TableRow, TableCell } from '@mui/material';
import { useForm } from 'ui-component/useForm';
import Controls from 'ui-component/controls/Controls';
import useTable from 'ui-component/useTable';
import { useState } from 'react';
import { gridSpacing } from 'store/constant';
import { getListFunction, getListPermission2 } from 'services/AccountService';

const FormFunctionRole = (props) => {
    const options = [
        { id: 'Add', title: 'Add' },
        { id: 'Edit', title: 'Edit' },
        { id: 'Delete', title: 'Delete' },
    ]

    const headCells = [
        { id: 'id', label: 'ID' },
        { id: 'functionName', label: 'FunctionName' },
        { id: 'apply', label: 'Apply' },
        { id: 'actions', label: 'Actions', disableSorting: true }
    ];


    const initialFValues = {
        roleName: ''
    }
    const { addOrEdit, recordForEdit } = props

    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } });
    const [records, setRecords] = useState([])

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('roleName' in fieldValues)
            temp.roleName = fieldValues.roleName ? "" : "This field is required."

        setErrors({
            ...temp
        })

        if (fieldValues == values)
            return Object.values(temp).every(x => x == "")
    }

    const {
        values,
        setValues,
        errors,
        setErrors,
        resetForm
    } = useForm(initialFValues, true, validate);

    const {
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPagingAndSorting
    } = useTable(records, headCells, filterFn);

    const handleSubmit = e => {
        e.preventDefault();
        addOrEdit(records, recordForEdit, resetForm);
    }

    useEffect(() => {
        getListFunctions();
        if (recordForEdit != null)
            setValues({
                ...recordForEdit
            })
    }, [recordForEdit])

    // Lấy ds chức năng
    const getListFunctions = () => {
        let lstPerimssionRole = [];
        getListPermission2(recordForEdit.id)
        .then(response => {
            lstPerimssionRole = response;
        }).catch(error => {
            console.log(error);
        })
        getListFunction()
            .then(response => {
                let dataNew = [];
                response.forEach(e => {
                    let ls = [];
                    let apply = false;
                    let item = {};
                    if(lstPerimssionRole.length !== 0){
                        lstPerimssionRole.forEach(p => {
                            if(p.function === e.id){
                                apply = true;
                                ls = p.action.split('|')
                            }
                            item = { id: e.id, name_function: e.name_function, apply: apply, action: ls };
                            console.log(item)
                        })
                    }else{
                        item = { id: e.id, name_function: e.name_function, apply: false, action: [] };
                    }
                    dataNew = [...dataNew, item];
                });
                console.log(dataNew);
                setRecords(dataNew);
            }).catch(error => {
                console.log(error);
            })
    }

    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        const {
            target: { name },
        } = event;
        // Cập nhật list
        let dataNew = [];
        records.forEach(e => {
            let item = {};
            let ls = [];
            if (e.id.toString() === name) {
                ls = value;
            }
            else {
                ls = e.action;
            }
            item = { id: e.id, name_function: e.name_function, apply: e.apply, action: ls };
            dataNew = [...dataNew, item];
        });
        setRecords(dataNew);
    }

    const handleCheckboxChange = (event) => {
        const {
            target: { value },
        } = event;
        const {
            target: { name },
        } = event;
        // Cập nhật checkbox của list
        let dataNew = [];
        records.forEach(e => {
            let item = {};
            let check = false;
            if (e.id.toString() === name) {
                check = value;
            }
            else {
                check = e.apply;
            }
            item = { id: e.id, name_function: e.name_function, apply: check, action: e.action };
            dataNew = [...dataNew, item];
        });
        setRecords(dataNew);
    }
    return (
        <div>
            <Grid container spacing={gridSpacing} style={{ width: '800px' }}>
                <Grid item xs={12}>
                    {/* === Table === */}
                    <TblContainer>
                        <TblHead />
                        <TableBody>
                            {
                                recordsAfterPagingAndSorting().map(item =>
                                (<TableRow key={item.id}>
                                    <TableCell>{item.id}</TableCell>
                                    <TableCell>{item.name_function}</TableCell>
                                    <TableCell><Controls.Checkbox value={item.apply} onChange={handleCheckboxChange} name={item.id.toString()}></Controls.Checkbox></TableCell>
                                    <TableCell><Controls.SelectMultiple options={options} value={item.action} onChange={handleChange} name={item.id.toString()}></Controls.SelectMultiple></TableCell>
                                </TableRow>
                                ))
                            }
                        </TableBody>
                    </TblContainer>
                    <TblPagination />
                </Grid>
                <Grid item xs={12} style={{ textAlign: 'right' }}>
                    <div>
                        <Controls.Button
                            type="submit"
                            text="Save" onClick={handleSubmit} />
                    </div>
                </Grid>
            </Grid>
        </div>
    )
};

export default FormFunctionRole;