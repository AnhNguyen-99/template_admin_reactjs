import React, { useEffect } from 'react'
import { Grid } from '@mui/material';
import { useForm, Form } from 'ui-component/useForm';
import Controls from 'ui-component/controls/Controls';
import { getlistCategory } from 'services/ProductService';
import { useState } from 'react';

const FormCategory = (props) => {
    
    const initialFValues = {
        category_name: '',
        parent_id: '',
        code: ''
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
        getAllCategory();
        if (recordForEdit != null)
            setValues({
                ...recordForEdit
            })
    }, [recordForEdit])

    const getAllCategory = () => {
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
    const handleChangeCategory = (event) => {
        const {
            target: { value },
        } = event;
        setValues({
            ...values,
            parent_id: value
        })
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Grid container style={{ width: '500px'}}>
                <Grid item xs={12} style={{marginBottom: '15px'}}>
                    {/* Code */}
                    <Controls.Input
                        label="Code Category"
                        name="code"
                        value={values.code}
                        onChange={handleInputChange}
                        error={errors.code}
                    />
                    {/* CategoryName */}
                    <Controls.Input
                        label="Category Name"
                        name="category_name"
                        value={values.category_name}
                        onChange={handleInputChange}
                        error={errors.category_name}
                    />
                    <Controls.Select
                        options={lstCategory}
                        name="parent_id"
                        label="ParentId"
                        value={values.parent_id}
                        onChange={handleChangeCategory}
                        error={errors.parent_id}
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