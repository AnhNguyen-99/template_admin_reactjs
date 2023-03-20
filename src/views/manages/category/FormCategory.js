import React, { useEffect } from 'react'
import { Grid } from '@mui/material';
import { useForm, Form } from 'ui-component/useForm';
import Controls from 'ui-component/controls/Controls';
import { createCategory, updateCategory, deleteCategory } from 'services/ProductService';
import { createSub, updateSub, deleteSub } from 'services/ProductService';
import { showNotification } from 'services/NotificationService';

const FormCategory = (props) => {
    
    const initialFValues = {
        categoryName: '',
        subCategory: ''
    }
    const { addOrEdit, recordForEdit } = props

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('categoryName' in fieldValues)
            temp.categoryName = fieldValues.categoryName ? "" : "This field is required."

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
        
        console.log(values);
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
                        name="categoryName"
                        label="CategoryName"
                        value={values.categoryName}
                        onChange={handleInputChange}
                        error={errors.categoryName}
                    />
                    <Controls.Input
                        label="SubCategory"
                        name="subCategory"
                        value={values.subCategory}
                        onChange={handleInputChange}
                        error={errors.subCategory}
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