import React, { useEffect } from "react";
import { Grid } from "@mui/material";
import { useForm, Form } from "ui-component/useForm";
import Controls from "ui-component/controls/Controls";


const FormSupplier = (props) => {

    const options = [
        { id: 1, title: 'Add' },
        { id: 2, title: 'Edit' },
        { id: 3, title: 'Delete' },
    ]

    const initialFValues = {
        supplier_name: '',
        code_tax: '',
        email: '',
        phone: '',
        address: '',
        area: ''
    }

    const { addOrEdit, recordForEdit } = props

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('supplier_name' in fieldValues && 'phone' in fieldValues)
            temp.supplier_name = fieldValues.supplier_name ? "" : "This fields is required."
        temp.phone = fieldValues.phone ? "" : "This field is required."

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
        e.preventDefault()
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
            <Grid container style={{ width: '500px' }}>
                <Grid item xs={12} style={{ textAlign: 'center', marginBottom: '15px' }}>
                    <Controls.Input
                        name="supplier_name"
                        label="SupplierName"
                        value={values.supplier_name}
                        onChange={handleInputChange}
                        error={errors.supplier_name}
                    />
                    <Controls.Input
                        name="code_tax"
                        label="CodeTax"
                        value={values.code_tax}
                        onChange={handleInputChange}
                        error={errors.code_tax}
                    />
                    <Controls.Input
                        name="email"
                        label="Email"
                        value={values.email}
                        onChange={handleInputChange}
                        error={errors.email}
                    />
                    <Controls.Input
                        name="phone"
                        label="Phone"
                        value={values.Phone}
                        onChange={handleInputChange}
                        error={errors.Phone}
                    />
                    <Controls.Select 
                        options={options}
                        value={values.area}
                        onChange={handleInputChange}
                        name="area"
                        label="Area"
                    />
                    <Controls.Input
                        name="address"
                        label="Address"
                        value={values.address}
                        onChange={handleInputChange}
                        error={errors.address}
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

export default FormSupplier;