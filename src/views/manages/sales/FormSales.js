import React, { useEffect } from "react";
import { Box, Grid, Tabs } from "@mui/material";
import { useForm, Form } from "ui-component/useForm";
import Controls from "ui-component/controls/Controls";
import Typography from '@mui/material/Typography';
import Tab from '@mui/material/Tab';
import { useState } from "react";


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

// TabPanel.PropTypes = {
//     children: PropTypes.node,
//     index: PropTypes.number.isRequired,
//     value: PropTypes.number.isRequired,
// };

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const FormSale = (props) => {

    const initialFValues = {
        sale_code: '',
        sales: '',
        date_sale: '',
        finish_sale: ''
    }

    const { addOrEdit, recordForEdit } = props

    const [value, setValue] = useState(0);

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('sale_code' in fieldValues)
            temp.supplier_name = fieldValues.sale_code ? "" : "This fields is required."

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

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Box container style={{ width: '500px' }}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label="basic tabs example"
                >
                    <Tab label="Info" {...a11yProps(0)} />
                    <Tab label="Choose Product Sale" {...a11yProps(1)} />
                </Tabs>
                <TabPanel value={value} index={0}>
                    <Box item xs={12} style={{ marginBottom: '15px' }}>
                        <Controls.Input
                            name="sale_code"
                            label="SaleCode"
                            value={values.sale_code}
                            onChange={handleInputChange}
                            error={errors.sale_code}
                        />
                        <Controls.Input
                            name="sales"
                            label="Sale (%)"
                            value={values.sales}
                            onChange={handleInputChange}
                            error={errors.sales}
                        />
                        <Controls.DateTimePicker
                            name="date_sale"
                            label="DateSale"
                            value={values.date_sale}
                            onChange={handleInputChange}
                            error={errors.date_sale}
                        />
                        <Controls.DateTimePicker
                            name="finish_sale"
                            label="FinishSale"
                            value={values.finish_sale}
                            onChange={handleInputChange}
                            error={errors.finish_sale}
                        />
                    </Box>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    Item Two
                </TabPanel>
                <Box item xs={12} style={{ textAlign: 'right' }}>
                    <div>
                        <Controls.Button
                            type="submit"
                            text="Save"
                        />
                    </div>
                </Box>
            </Box>
        </Form>
    )
}

export default FormSale;