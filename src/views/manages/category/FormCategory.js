import React, { useEffect } from 'react'
import { Grid } from '@mui/material';
import { useForm, Form } from 'ui-component/useForm';
import Controls from 'ui-component/controls/Controls';
import { getlistCategory } from 'services/ProductService';
import { useState } from 'react';

const FormCategory = (props) => {
    
    const initialFValues = {
        category_name: '',
        sub_category: ''
    }
    const { addOrEdit, recordForEdit } = props

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('category_name' in fieldValues) {
            temp.category_name = fieldValues.category_name ? "" : "This field is required."
        }
        setErrors({
            ...temp
        })

        if (fieldValues == values)
            return Object.values(temp).every(x => x == "")
    }

    const [lstCategory, setLstCategory] = useState([])

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
        handleChangeCategory();
        if (recordForEdit != null)
            setValues({
                ...recordForEdit
            })
    }, [recordForEdit])

    const handleChangeCategory = () => {
        getlistCategory().
        then(response => {
            let list = [];
            response.forEach(item => {
                let customItem = {};
                customItem = {...item, id: item.id, title: item.category_name};
                list = [...list, customItem];
            });
            setLstCategory(list);
        }).catch(error => {
            console.log(error)
        });
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Grid container style={{ width: '500px'}}>
                <Grid item xs={12} style={{textAlign: 'center', marginBottom: '15px'}}>
                    <Controls.Select
                        options={lstCategory}
                        name="category_name"
                        label="CategoryName"
                        value={values.category_name}
                        onChange={handleChangeCategory}
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