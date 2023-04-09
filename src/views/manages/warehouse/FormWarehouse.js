import React, { useEffect } from "react";
import { Box, Grid, Tab, Tabs, Typography } from "@mui/material";
import { useForm, Form } from "ui-component/useForm";
import Controls from "ui-component/controls/Controls";
import { getListSupplier, getlistProduct } from "services/ProductService";
import { useState } from "react";


// Tab 
function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const FormWarehouse = (props) => {
    const initialFValues = {
        code: '',
        supplier: '',
        total_price: '',
        product_code: ''
    }

    const { addOrEdit, recordForEdit } = props

    const [value, setValue] = useState(0);

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('supplier' in fieldValues)
            temp.supplier = fieldValues.supplier ? "" : "This fields is required."

        setErrors({
            ...temp
        })

        if (fieldValues == values)
            return Object.values(temp).every(x => x == "")
    }

    const [lstSupplier, setLstSupplier] = useState([])
    const [lstProduct, setLstProduct] = useState([])

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
        getAllSupplier();
        getAllProduct();
    }, [recordForEdit])

    const getAllSupplier = () => {
        getListSupplier()
            .then(response => {
                let list = [];
                response.forEach(item => {
                    let customItem = {};
                    customItem = { ...item, id: item.code, title: item.supplier_name }
                    list = [...list, customItem];
                });
                setLstSupplier(list);
            }).catch(error => {
                console.log(error)
            });
    }

    const handleChangeSupplier = (event) => {
        console.log(event);
        const {
            target: { value },
        } = event;
        // setValues({
        //     ...values,
        //     supplier: value,
        // })
    }
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const getAllProduct = () => {
        getlistProduct()
            .then(response => {
                let list = [];
                response.forEach(item => {
                    let customItem = {};
                    customItem = { ...item, id: item.id, title: item.name }
                    list = [...list, customItem];
                });
                setLstProduct(list);
            }).catch(error => {
                console.log(error)
            });
    }

    const handleChangeProduct = (event) => {
        console.log(event);
    }
    return (
        <Form onSubmit={handleSubmit}>
            <Box container>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label="basic tabs example"
                >
                    <Tab label="Info" {...a11yProps(0)} />
                    <Tab label="Import Product" {...a11yProps(1)} />
                </Tabs>
                {/* Code giao diện và xử lý phần thông tin của phiếu nhập */}
                <TabPanel value={value} index={0}>
                    <Box item xs={12} style={{ marginBottom: '15px' }}>
                        <Controls.Input
                            name="code"
                            label="Code"
                            value={values.code}
                            onChange={handleInputChange}
                            error={errors.code}
                        />
                        <Controls.Select
                            options={lstSupplier}
                            name="supplier"
                            label="SupplierName"
                            value={values.supplier}
                            onChange={handleChangeSupplier}
                        />
                        <Controls.Input
                            name="total_price"
                            label="TotalPrice"
                            value={values.total_price}
                            onChange={handleInputChange}
                            error={errors.total_price}
                        />
                    </Box>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <Box item xs={12} style={{ width: '500px' }}>
                        <Box item xs={4} style={{ marginBottom: '15px' }}>
                            <Controls.Select
                                options={lstProduct}
                                name="product_code"
                                label="Product"
                                value={values.product_code}
                                onChange={handleChangeProduct}
                            />
                        </Box>
                        <Box item xs={4} style={{ marginBottom: '15px' }}>
                            <Controls.Input
                                name="quantity"
                                label="Quantity"
                                value={values.code}
                                onChange={handleInputChange}
                                error={errors.code}
                            />
                        </Box>

                    </Box>
                </TabPanel>
                <Grid item xs={12} style={{ textAlign: 'right' }}>
                    <div>
                        <Controls.Button
                            type="submit"
                            text="Save"
                        />
                    </div>
                </Grid>
            </Box>
        </Form>
    )
}

export default FormWarehouse;