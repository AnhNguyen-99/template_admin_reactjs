import React, { useEffect } from "react";
import { Grid } from "@mui/material";
import { useForm, Form } from "ui-component/useForm";
import Controls from "ui-component/controls/Controls";
import { useState } from "react";
import { getListDistricByProvinceId, getListProvince } from "services/AccountService";


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
        area: '',
        province: ''
    }

    const { addOrEdit, recordForEdit } = props

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('supplier_name' in fieldValues)
            temp.supplier_name = fieldValues.supplier_name ? "" : "This fields is required."
        if ('phone' in fieldValues)
            temp.phone = fieldValues.phone ? "" : "This fields is required."
        if ('address' in fieldValues)
            temp.address = fieldValues.address ? "" : "This fields is required."
            
        setErrors({
            ...temp
        })

        if (fieldValues == values)
            return Object.values(temp).every(x => x == "")
    }

    const [lstProvince, setLstProvince] = useState([])
    const [lstDistric, setLstDistric] = useState([])

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
        getListProvinces();
    }, [recordForEdit])

    const getListProvinces = () => {
        getListProvince()
        .then(response => {
            let list = [];
            response.forEach(item => {
                let customItem = {};
                customItem = {...item, id: item.id , title: item.name};
                list = [...list, customItem];
            });
            setLstProvince(list);
        }).catch(error => {
            console.log(error)
        });

    }

    const handleChangeProvince = (event) => {
        const {
            target: { value },
        } = event;
        setValues({
            ...values,
            province: value
        })
        // Lấy ds huyện theo id tỉnh
        getListDistricByProvinceId(value)
        .then(response => {
            let list = [];
            response.forEach(item => {
                let customItem = {};
                customItem = {...item, id: item.id , title: item.name};
                list = [...list, customItem];
            });
            setLstDistric(list);
        }).catch(error => {
            console.log(error)
        });
    }

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
                        value={values.phone}
                        onChange={handleInputChange}
                        error={errors.phone}
                    />
                    <Controls.Select 
                        options={lstProvince}
                        value={values.province}
                        onChange={handleChangeProvince}
                        name="province"
                        label="Province"
                    />
                    <Controls.Select 
                        options={lstDistric}
                        value={values.distric}
                        onChange={handleInputChange}
                        name="distric"
                        label="Distric"
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