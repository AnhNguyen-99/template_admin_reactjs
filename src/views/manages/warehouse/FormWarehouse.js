import React, { useEffect } from "react";
import { Grid } from "@mui/material";
import { useForm, Form } from "ui-component/useForm";
import Controls from "ui-component/controls/Controls";

const FormWarehouse = (props) => {
    const initialFValues = {
        code: '',
        supplier_code: '',
        total_price: ''
    }

    const { addOrEdit, recordForEdit } = props

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('name' in fieldValues)
            temp.name = fieldValues.name ? "" : "This fields is required."
        
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
    }, [recordForEdit])

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
                    <Controls.Input
                        name="supplier_name"
                        label="SupplierName"
                        value={values.supplier_name}
                        onChange={handleInputChange}
                        error={errors.supplier_name}
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