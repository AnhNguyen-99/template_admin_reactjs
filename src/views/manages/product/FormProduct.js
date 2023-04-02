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
        handleChangeCategory();
        handleChangeBranch();
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
                    {/* <Controls.Input
                        name="image_product"
                        type="file"
                    /> */}
                    {/* Hình ảnh sp */}
                    <Grid item xs="12">
                        <Controls.Input type="file" id="upload1" accept="image/*"/>
                        {/* <label style="width: 62px; height: 58px;" for="upload1"/> */}
                        {/* <img class="avatar-img" [src]="imageUrl" [class.scale-up-img]="imageUrl" style="width: 100%; height: 100%;">
        </label>
        <label for="upload1" *ngIf="imageUrl === null">
          <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g opacity="0.64">
              <rect width="64" height="64" rx="12" fill="#FDF1EC"/>
              <g opacity="0.7">
                <path fill-rule="evenodd" clip-rule="evenodd"
                      d="M36.896 26.8049C36.932 26.8655 36.995 26.9088 37.076 26.9088C39.236 26.9088 41 28.6055 41 30.6832V35.8255C41 37.9032 39.236 39.6 37.076 39.6H26.924C24.755 39.6 23 37.9032 23 35.8255V30.6832C23 28.6055 24.755 26.9088 26.924 26.9088C26.996 26.9088 27.068 26.8741 27.095 26.8049L27.149 26.701C27.18 26.6381 27.2119 26.5735 27.2442 26.5079C27.4744 26.0409 27.7292 25.5243 27.887 25.2206C28.301 24.4415 29.003 24.0087 29.876 24H34.115C34.988 24.0087 35.699 24.4415 36.113 25.2206C36.2547 25.4933 36.4707 25.9326 36.6789 26.356C36.7218 26.4433 36.7644 26.53 36.806 26.6144L36.896 26.8049ZM36.2386 30.1291C36.2386 30.5619 36.5986 30.9082 37.0486 30.9082C37.4986 30.9082 37.8676 30.5619 37.8676 30.1291C37.8676 29.6962 37.4986 29.3413 37.0486 29.3413C36.5986 29.3413 36.2386 29.6962 36.2386 30.1291ZM30.4425 31.471C30.8655 31.0641 31.4145 30.8477 31.9995 30.8477C32.5845 30.8477 33.1335 31.0641 33.5475 31.4624C33.9615 31.8606 34.1865 32.3887 34.1865 32.9514C34.1775 34.1114 33.2055 35.055 31.9995 35.055C31.4145 35.055 30.8655 34.8386 30.4515 34.4404C30.0375 34.0422 29.8125 33.5141 29.8125 32.9514V32.9427C29.8035 32.3973 30.0285 31.8692 30.4425 31.471ZM34.4927 35.358C33.8537 35.9726 32.9717 36.3535 31.9997 36.3535C31.0547 36.3535 30.1727 35.9986 29.4977 35.358C28.8317 34.7087 28.4627 33.8603 28.4627 32.9513C28.4537 32.051 28.8227 31.2026 29.4887 30.5533C30.1637 29.904 31.0547 29.5491 31.9997 29.5491C32.9447 29.5491 33.8357 29.904 34.5017 30.5447C35.1677 31.1939 35.5367 32.051 35.5367 32.9513C35.5277 33.8949 35.1317 34.7433 34.4927 35.358Z"
                      fill="#101840"/>
              </g>
            </g>
          </svg>
        </label>

        <label id="uploadav" for="upload1" class="btn btn-primary btn-upload" style="background-color: #3366ff; color: white; font-weight: 600">
          <svg width="12"  height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.69882 7.5628L6.29258 5.45342C6.16212 5.25771 5.83801 5.25771 5.70755 5.45342L4.30131 7.5628C4.22954 7.67061 4.2227 7.80931 4.2838 7.92364C4.3449 8.03797 4.46403 8.10938 4.59381 8.10938H4.94537V10.5703C4.94537 10.7646 5.10261 10.9219 5.29693 10.9219H6.70318C6.8975 10.9219 7.05474 10.7646 7.05474 10.5703V8.10938H7.4063C7.53607 8.10938 7.65521 8.03797 7.71633 7.92364C7.77746 7.80931 7.77056 7.67061 7.69882 7.5628Z" fill="white"/>
            <path d="M10.206 4.11183C10.1751 3.69169 10.0045 3.29975 9.70413 2.99935C9.24981 2.54503 8.56588 2.40917 7.96511 2.57689C7.38742 1.64796 6.39362 1.07812 5.29689 1.07812C3.64824 1.07812 2.29041 2.34532 2.14861 3.98642C0.918471 4.29713 0 5.41738 0 6.70314C0 8.25393 1.28515 9.51564 2.83594 9.51564H4.2422V8.75245C3.99774 8.66627 3.79004 8.49152 3.66369 8.25496C3.48001 7.91197 3.50026 7.49725 3.71588 7.17315L5.12249 5.06342C5.31439 4.77537 5.64261 4.60372 6.00001 4.60372C6.35741 4.60372 6.68563 4.77537 6.87754 5.06342L8.28379 7.1728C8.49974 7.49725 8.51999 7.91197 8.33631 8.25496C8.20996 8.49152 8.00226 8.66627 7.7578 8.75245V9.51564H9.16406C10.7148 9.51564 12 8.25393 12 6.70314C12 5.54286 11.2722 4.53645 10.206 4.11183Z" fill="white"/>
          </svg>
          {{ 'COMMON.CHOOSE_FILE' | translate }}
        </label> */}

                    </Grid>
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
                    <Controls.TextArea
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