import React, { useEffect } from 'react'
import { Grid, TableBody, TableRow, TableCell } from '@mui/material';
import { useForm } from 'ui-component/useForm';
import Controls from 'ui-component/controls/Controls';
import useTable from 'ui-component/useTable';
import { useState } from 'react';
import { gridSpacing } from 'store/constant';

const FormFunctionRole = (props) => {
    const options = [
        { id: 1, title: 'Add' },
        { id: 2, title: 'Edit' },
        { id: 3, title: 'Delete' },
    ]

    const data = [
        {
            'id': 1,
            'functionName': 'Manages Category',
            'apply': true,
            'action': [1, 2]
        },
        {
            'id': 2,
            'functionName': 'Manages Role',
            'apply': false,
            'action': [1, 2]
        },
        {
            'id': 3,
            'functionName': 'Manage Branch',
            'apply': true,
            'action': [1, 2]
        },
        {
            'id': 4,
            'functionName': 'Manages User',
            'apply': false,
            'action': [1, 2]
        }
    ]

    const headCells = [
        { id: 'id', label: 'RoleID' },
        { id: 'functionName', label: 'FunctionName' },
        { id: 'apply', label: 'Apply' },
        { id: 'actions', label: 'Actions', disableSorting: true }
    ];


    const initialFValues = {
        roleName: ''
    }
    const { addOrEdit, recordForEdit } = props

    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } });
    const [records, setRecords] = useState(data)

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
        handleInputChange,
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
        console.log(records);
        addOrEdit(records, resetForm);
    }

    useEffect(() => {
        if (recordForEdit != null)
            setValues({
                ...recordForEdit
            })
    }, [recordForEdit])

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
            item = { id: e.id, functionName: e.functionName, apply: e.apply, action: ls };
            dataNew = [...dataNew, item];
        });
        setRecords(dataNew);
    }
    return (
        // <Form onSubmit={handleSubmit} style={{width: '500px'}}>
        //     <Grid container style={{width: '500px'}}>
        //         <Grid item xs={12} style={{textAlign: 'center', marginBottom: '15px'}}>
        //             <Controls.Input
        //                 name="roleName"
        //                 label="RoleName"
        //                 value={values.roleName}
        //                 onChange={handleInputChange}
        //                 error={errors.roleName}
        //             />
        //         </Grid>
        //         <Grid item xs={12} style={{textAlign: 'right'}}>
        //             <div>
        //                 <Controls.Button
        //                     type="submit"
        //                     text="Save" />
        //             </div>
        //         </Grid>
        //     </Grid>
        // </Form>
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
                                    <TableCell>{item.functionName}</TableCell>
                                    <TableCell><Controls.Checkbox value={item.apply} onChange={handleInputChange}></Controls.Checkbox></TableCell>
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
                            text="Save" onClick={handleSubmit}/>
                    </div>
                </Grid>
            </Grid>
        </div>
    )
};

export default FormFunctionRole;