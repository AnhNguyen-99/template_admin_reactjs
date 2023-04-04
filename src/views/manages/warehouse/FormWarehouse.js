import React, { useEffect } from "react";
import { Grid } from "@mui/material";
import { useForm, Form } from "ui-component/useForm";
import Controls from "ui-component/controls/Controls";
import { getListSupplier } from "services/ProductService";
import { useState } from "react";

const FormWarehouse = (props) => {
    const initialFValues = {
        code: '',
        supplier: '',
        total_price: ''
    }

    const { addOrEdit, recordForEdit } = props

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('supplier' in fieldValues)
            temp.supplier = fieldValues.supplier ? "" : "This fields is required."
        
        setErrors({
            ...temp
        })

        if (fieldValues == values)
            return Object.values(temp).every(x => x == "")
    }

    const [lstSupplier, setLstSupplier] = useState([])

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(initialFValues, true, validate);

    const handleSubmit = e => {
        e.preventDefault();
        if (validate()) {
            addOrEdit(values, resetForm);
        }
    }

    useEffect(() => {  
        if (recordForEdit != null)
            setValues({
                ...recordForEdit
            })
        handleChangeSupplier();
    }, [recordForEdit])

    const handleChangeSupplier = () => {
        getListSupplier()
        .then(response => {
            let list = [];
            response.forEach(item => {
                let customItem = {};
                customItem = {...item, id: item.id, title: item.supplier_name}
                list = [...list, customItem];
            });
            setLstSupplier(list);
        }).catch(error => {
            console.log(error)
        });
    }


    return (
        <Form onSubmit={handleSubmit}>
            <Grid container>
                <Grid item xs={12} style={{ textAlign: "center", marginBottom: '15px' }}>
                    <Controls.Input
                        name="code"
                        label="Code"
                        value={values.code}
                        onChange={handleInputChange}
                        error={errors.code}
                    />
                    <Controls.Select
                        options={lstSupplier}
                        name="supplier"
                        label="SupplierName"
                        value={values.supplier}
                        onChange={handleChangeSupplier}
                    />
                    <Controls.Input
                        name="total_price"
                        label="TotalPrice"
                        value={values.total_price}
                        onChange={handleInputChange}
                        error={errors.total_price}
                    />
                </Grid>
                <Grid item xs={12} style={{ textAlign: 'right' }}>
                    <div>
                        <Controls.Button
                            type="submit"
                            text="Save"
                        />
                    </div>
                </Grid>
            </Grid>
        </Form>
    )
}

export default FormWarehouse;