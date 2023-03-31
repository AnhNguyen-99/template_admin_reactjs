import React, { useEffect } from "react";
import { Grid } from "@mui/material";
import { useForm, Form } from "ui-component/useForm";
import Controls from "ui-component/controls/Controls";


const FormSale = (props) => {

    const initialFValues = {
        sale_code: '',
        sales: '',
        date_sale: '',
        finish_sale: ''
    }

    const { addOrEdit, recordForEdit } = props

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('sale_code' in fieldValues)
            temp.supplier_name = fieldValues.sale_code ? "" : "This fields is required."
            
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
                <Grid item xs={12} style={{ textAlign: "center", marginBottom: '15px' }}>
                    <Controls.Input
                        name="sale_code"
                        label="SaleCode"
                        value={values.sale_code}
                        onChange={handleInputChange}
                        error={errors.sale_code}
                    />
                    <Controls.Input
                        name="sale"
                        label="Sale"
                        value={values.sale}
                        onChange={handleInputChange}
                        error={errors.sale}
                    />
                    <Controls.Input
                        name="date_sale"
                        label="DateSale"
                        value={values.date_sale}
                        onChange={handleInputChange}
                        error={errors.date_sale}
                    />
                    <Controls.Input
                        name="finish_sale"
                        label="FinishSale"
                        value={values.finish_sale}
                        onChange={handleInputChange}
                        error={errors.finish_sale}
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

export default FormSale;