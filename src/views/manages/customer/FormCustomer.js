import React, { useEffect } from "react";
import { Grid } from "@mui/material";
import { useForm, Form } from "ui-component/useForm";
import Controls from "ui-component/controls/Controls";
import { useState } from "react";
import { getListDistricByProvinceId, getListProvince, getListWardbyDistrictId } from "services/AccountService";

const FormCustomer = (props) => {
    const initialFValues = {
        username: '',
        customer_code: '',
        code_tax: '',
        company_name: '',
        gender: '',
        date: '',
        email: '',
        phone: '',
        address: '',
        province: '',
        district: '',
        ward: '',
        image: ''
    }

    const { addOrEdit, recordForEdit } = props

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('username' in fieldValues)
            temp.username = fieldValues.username ? "" : "This fields is required."
        
        setErrors({
            ...temp
        })

        if (fieldValues == values)
            return Object.values(temp).every(x => x == "")
    }

    const [lstProvince, setLstProvince] = useState([])
    const [lstDistric, setLstDistrict] = useState([])
    const [lstWard, setLstWard] = useState([])

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
                customItem = {...item, id: item.id, title: item.name};
                list = [...list, customItem];
            });
            setLstProvince(list);
        }).catch(error => {
            console.log(error);
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

        // Lấy danh sách huyện theo id tỉnh
        getListDistricByProvinceId(value)
        .then(response => {
            let list = [];
            response.forEach(item => {
                let customItem = {};
                customItem = {...item, id: item.id, title: item.name};
                list = [...list, customItem];
            });
            setLstDistrict(list);
        }).catch(error => {
            console.log(error);
        });
    }

    const handleChangeDistrict = (event) => {
        const {
            target: { value },
        } = event;
        setValues({
            ...values,
            province: value
        })

        // Lấy danh sách phường/xã theo id quận/huyện
        getListWardbyDistrictId(value)
        .then(response => {
            let list = [];
            response.forEach(item => {
                let customItem = {};
                customItem = {...item, id: item.id, title: item.name}
                list = [...list, customItem];
            })
            setLstWard(list);
        }).catch(error => {
            console.log(error)
        })
    }
    
    return (
        <Form onSubmit={handleSubmit}>
            <Grid container style={{ width: '700px' }}>
                <Grid item xs={6} style={{ marginBottom: '15px' }}>
                    <Controls.Input
                        name="username"
                        label="CustomerName"
                        value={values.username}
                        onChange={handleInputChange}
                        error={errors.username}
                    />
                    <Controls.Input
                        name="customer_code"
                        label="CustomerCode"
                        value={values.customer_tax}
                        onChange={handleInputChange}
                        error={errors.customer_tax}
                    />
                    <Controls.RadioGroup
                        name="gender"
                        label="Gender"
                        value={values.gender}
                        onChange={handleInputChange}
                        error={errors.gender} 
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
                </Grid>
                <Grid item xs={6} style={{ marginBottom: '15px' }}>
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
                        onChange={handleChangeDistrict}
                        name="distric"
                        label="Distric"
                    />
                    <Controls.Select
                        options={lstWard}
                        value={values.ward}
                        onChange={handleInputChange}
                        name="ward"
                        label="Ward"
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

export default FormCustomer;