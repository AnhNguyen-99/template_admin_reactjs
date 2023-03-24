import React, { useEffect } from 'react'
import { Grid } from '@mui/material';
import { useForm, Form } from 'ui-component/useForm';
import Controls from 'ui-component/controls/Controls';

const FormRole = (props) => {
    
    const initialFValues = {
        role_name: ''
    }
    const { addOrEdit, recordForEdit } = props

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('role_name' in fieldValues)
            temp.role_name = fieldValues.role_name ? "" : "This field is required."

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
        <Form onSubmit={handleSubmit} style={{width: '500px'}}>
            <Grid container style={{width: '500px'}}>
                <Grid item xs={12} style={{textAlign: 'center', marginBottom: '15px'}}>
                    <Controls.Input
                        name="role_name"
                        label="RoleName"
                        value={values.role_name}
                        onChange={handleInputChange}
                        error={errors.role_name}
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

export default FormRole;