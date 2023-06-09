import React, { useEffect } from 'react'
import { Grid, TableBody, TableRow, TableCell } from '@mui/material';
import { useForm } from 'ui-component/useForm';
import Controls from 'ui-component/controls/Controls';
import useTable from 'ui-component/useTable';
import { useState } from 'react';
import { gridSpacing } from 'store/constant';
import { getListOrderItemByOrderId } from 'services/OrdersService';

const ViewOrderItem = (props) => {

    const headCells = [
        { id: 'id', label: 'ID' },
        { id: 'productName', label: 'ProductName' },
        { id: 'quantity', label: 'Quantity' },
        { id: 'price', label: 'Price' },
        { id: 'totalPrice', label: 'TotalPrice' }
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
        getListOrderItem(1);
        if (recordForEdit != null)
            setValues({
                ...recordForEdit
            })
    }, [recordForEdit])

    // Lấy ds chức năng

    const getListOrderItem = (id) => {
        getListOrderItemByOrderId(id)
        .then(response => {
            setRecords(response);
        }).catch(error => {
            console.log(error)
        });
    }

    const converToPrice = (price) => {
        return new Intl.NumberFormat('it-IT', {
            style: 'currency',
            currency: 'VND'
          }).format(price);
        
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
                                    <TableCell>{item.product}</TableCell>
                                    <TableCell>{item.quantity}</TableCell>
                                    <TableCell>{converToPrice(item.price)}</TableCell>
                                    <TableCell>{converToPrice(item.total_price)}</TableCell>
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
                            text="Approved" onClick={handleSubmit} />
                    </div>
                </Grid>
            </Grid>
        </div>
    )
};

export default ViewOrderItem;