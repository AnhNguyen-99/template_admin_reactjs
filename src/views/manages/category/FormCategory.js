import React, { useEffect } from 'react'
import { Grid } from '@mui/material';
import { useForm, Form } from 'ui-component/useForm';
import Controls from 'ui-component/controls/Controls';
import { createCategory, updateCategory, deleteCategory } from 'services/ProductService';

const FormCategory = (props) => {
    
    const initialFValues = {
        category_name: '',
        sub_category: ''
    }
    const { addOrEdit, recordForEdit } = props

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('category_name' in fieldValues)
            temp.category_name = fieldValues.category_name ? "" : "This field is required."

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
            <Grid container>
                <Grid item xs={12} style={{textAlign: 'center', marginBottom: '15px'}}>
                    <Controls.Input
                        name="category_name"
                        label="CategoryName"
                        value={values.category_name}
                        onChange={handleInputChange}
                        error={errors.category_name}
                    />
                    <Controls.Input
                        label="SubCategory"
                        name="sub_category"
                        value={values.sub_category}
                        onChange={handleInputChange}
                        error={errors.sub_category}
                    />
                </Grid>
                <Grid item xs={12} style={{textAlign: 'right'}}>
                    <div>
                        <Controls.Button
                            type="submit"
                            text="Save" />
                    </div>
                </Grid>
            </Grid>
        </Form>
    )
};

export default FormCategory;