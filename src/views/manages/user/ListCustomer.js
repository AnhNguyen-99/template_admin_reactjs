// material-ui
import { Grid, TableBody, TableRow, TableCell, InputAdornment, Toolbar } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import { useState } from 'react';

import Popup from 'ui-component/Popup';
import useTable from 'ui-component/useTable';
import Controls from 'ui-component/controls/Controls';
import { makeStyles } from '@mui/styles';
// ===============================|| Dialog ||================================= //
import { IconEdit, IconTrash, IconSearch } from '@tabler/icons';
import AddIcon from '@mui/icons-material/Add';
import { useEffect } from 'react';
import { showNotification } from 'services/NotificationService';
import { getListCustomer, createCustomer, deleteCustomer, updateCustomer } from 'services/AccountService';
import FormCustomer from './FormCustomer';

const useStyles = makeStyles(theme => ({
    pageContent: {
        margin: theme.spacing(5),
        padding: theme.spacing(3)
    },
    searchInput: {
        width: '75%'
    },
    newButton: {
        position: 'absolute',
        right: '10px'
    }
}));

const ManageCustomer = () => {

    const classes = useStyles();

    const headCells = [
        { id: 'id', label: 'STT' },
        { id: 'username', label: 'NameCustomer' },
        { id: 'customer_code', label: 'CustomerCode'},
        { id: 'email', label: 'Email'},
        { id: 'phone', label: 'Phone'},
        { id: 'gender', label: 'Gender'},
        { id: 'date', label: 'Date'},
        { id: 'address', label: 'Address'},
        { id: 'type', label: 'Type'},
        { id: 'actions', label: 'Actions', disableSorting: true }
    ]

    const [open, setOpen] = useState(false);
    const [recordForEdit, setRecordForEdit] = useState(null);
    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } });
    const [records, setRecords] = useState([])

    const addOrEdit = (customer, resetForm) => {
        const dateBirth = new Date(customer.date);
        customer.date = dateBirth;
        if (customer.id) {
            updateCustomer(customer).then(response => {
                if (response !== null) {
                    showNotification("Update Customer Success", 'success');
                    getData();
                }
            }).catch(error => {
                showNotification("Update Customer Fail", 'danger');
            })
        } else {
            createCustomer(customer)
            .then(response => {
                showNotification("Create Customer Success", 'success');
            });
        }
        resetForm()
        setRecordForEdit(null)
        setOpen(false)
    }

    const {
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPagingAndSorting
    } = useTable(records, headCells, filterFn);

    const openInPopup = (item) => {
        console.log(item);
        item.gender = item.gender !== null ? item.gender === false ? 0 : 1 : '';
        setRecordForEdit(item);
        setOpen(true);
    }

    const handleSearch = (e) => {
        let target = e.target;
        setFilterFn({
            fn: items => {
                if (target.value == "") {
                    console.log(items);
                    return items;
                }
                else{
                    return items.filter(x => x.username.toLowerCase().includes(target.value.toLowerCase()))
                }
            }
        })
    }

    useEffect(() => {
        getData();
    }, [])

    const getData = () => {
        getListCustomer()
            .then(response => {
                setRecords(response);
            }).catch(error => {
                console.log(error)
            });
    };

    const deleteCustomers = (item) => {
        deleteCustomer(item).then(response => {
            if (response !== null) {
                showNotification("Delete Customer Success", 'success');
                getData();
            }
        }).catch(error => {
            console.log(error);
            showNotification("Delete Customer Fail", 'danger');
        });
    }

    return (
        <>
            <MainCard title="List Customer">
                <Toolbar>
                    <Controls.Input
                        label="Search"
                        className={classes.searchInput}
                        placeholder="Search ...."
                        InputProps={{
                            startAdornment: (<InputAdornment position="start">
                                <IconSearch />
                            </InputAdornment>)
                        }}
                        onChange={handleSearch}
                    />
                    <Controls.Button
                        text="Add New"
                        variant="contained"
                        startIcon={<AddIcon />}
                        className={classes.newButton}
                        onClick={() => { setOpen(true); setRecordForEdit(null); }}
                    />
                </Toolbar>
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={12} style={{overflow: 'auto'}}>
                        {/* === Table === */}
                        <TblContainer>
                            <TblHead />
                            <TableBody>
                                {
                                    recordsAfterPagingAndSorting().map((item, index) =>
                                    (<TableRow key={item.id}>
                                        <TableCell>{index + 1}</TableCell>
                                        <TableCell>{item.username}</TableCell>
                                        <TableCell>{item.customer_code}</TableCell>
                                        <TableCell>{item.email}</TableCell>
                                        <TableCell>{item.phone}</TableCell>
                                        <TableCell>{item.gender !== null ? item.gender === false ? 'Nam': 'Nữ' : ''}</TableCell>
                                        <TableCell>{item.date}</TableCell>
                                        <TableCell>{item.address}</TableCell>
                                        <TableCell>{item.type}</TableCell>
                                        <TableCell>
                                            <Controls.ActionButton
                                                color="primary"
                                                onClick={() => { openInPopup(item) }}
                                            >
                                                <IconEdit />
                                            </Controls.ActionButton>
                                            <Controls.ActionButton
                                                color="secondary"
                                                onClick = {() => { deleteCustomers(item) }}
                                            >
                                                <IconTrash color='red' />
                                            </Controls.ActionButton>
                                        </TableCell>
                                    </TableRow>)
                                    )
                                }
                            </TableBody>
                        </TblContainer>
                        <TblPagination />
                    </Grid>
                </Grid>
            </MainCard>
            <Popup title="Create Customer" openPopup={open} setOpenPopup={setOpen}>
                <FormCustomer recordForEdit={recordForEdit}
                    addOrEdit={addOrEdit} />
            </Popup>
        </>
    );
};

export default ManageCustomer;
