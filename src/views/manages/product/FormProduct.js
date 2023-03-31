import React, { useEffect } from "react";
import { Grid, TextareaAutosize } from "@mui/material";
import { useForm, Form } from "ui-component/useForm";
import Controls from "ui-component/controls/Controls";
import { useState } from "react";
import { getListBranch, getlistCategory } from "services/ProductService";

const FormProduct = (props) => {
    const initialFValues = {
        name: '',
        cost_price: '',
        product_code: '',
        price: '',
        weight: '',
        direct_sales: '',
        image_product: '',
        unit: '',
        description: '',
        importdetail: '',
        branch: '',
        category: ''
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

    const [lstCategory, setLstCategory] = useState([])
    const [lstBranch, setLstBranch] = useState([])

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

    const handleChangeCategory = () => {
        getlistCategory()
        .then(response => {
            let list = [];
            response.forEach(item => {
                let customItem = {};
                customItem = {...item, id: item.id, title: item.category_name}
                list = [...list, customItem];
            });
            setLstCategory(list);
        }).catch(error => {
            console.log(error)
        });
    }

    const handleChangeBranch = () => {
        getListBranch()
        .then(response => {
            let list = [];
            response.forEach(item => {
                let customItem = {};
                customItem = {...item, id: item.id, title: item.branch_name}
                list = [...list, customItem];
            });
            setLstBranch(list);
        }).catch(error => {
            console.log(error)
        });
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Grid container style={{ width: '700px' }}>
                <Grid item xs={6} style={{ marginBottom: '15px' }}>
                    <Controls.Input
                        name="product_code"
                        label="ProductCode"
                        value={values.product_code}
                        onChange={handleInputChange}
                        error={errors.product_code}
                    />
                    <Controls.Input
                        name="name"
                        label="ProductName"
                        value={values.name}
                        onChange={handleInputChange}
                        error={errors.name}
                    />
                    <Controls.Select 
                        options={lstCategory}
                        value={values.category}
                        onChange={handleChangeCategory}
                        name="category"
                        label="Category"
                    />
                    <Controls.Select 
                        options={lstBranch}
                        value={values.branch}
                        onChange={handleChangeBranch}
                        name="branch"
                        label="Branch"
                    />
                    <Controls.Input
                        name="image_product"
                        type="file"
                    />
                </Grid>
                <Grid item xs={6} style={{ marginBottom: '15px' }}>
                    <Controls.Input
                        name="cost_price"
                        label="CostPrice"
                        value={values.cost_price}
                        onChange={handleInputChange}
                        error={errors.cost_price}
                    />
                    <Controls.Input
                        name="price"
                        label="Price"
                        value={values.price}
                        onChange={handleInputChange}
                        error={errors.price}
                    />
                    <Controls.Input
                        name="weight"
                        label="Weight"
                        value={values.weight}
                        onChange={handleInputChange}
                        error={errors.weight}
                    />
                    <Controls.Input
                        name="unit"
                        label="Unit"
                        value={values.unit}
                        onChange={handleInputChange}
                        error={errors.unit}
                    />
                    <Controls.Checkbox
                        name="direct_sales"
                        label="Direct_sales"
                        value={values.direct_sales}
                        onChange={handleInputChange}
                        error={errors.direct_sales}
                    />
                    <Controls.Input
                        name="description"
                        label="Description"
                        value={values.description}
                        onChange={handleInputChange}
                        error={errors.description}
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

export default FormProduct;