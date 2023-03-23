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
import FormSupplier from './FormSupplier';
import { showNotification } from 'services/NotificationService';
import { getListSupplier, createSupplier, deleteSupplier, updateSupplier } from 'services/ProductService';

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

const ManageSupplier = () => {

    const classes = useStyles();

    const headCells = [
        { id: 'id', label: 'STT' },
        { id: 'nameSupplier', label: 'NameSupplier' },
        { id: 'codeTax', label: 'CodeTax'},
        { id: 'email', label: 'Email'},
        { id: 'phone', label: 'Phone'},
        { id: 'address', label: 'Address'},
        { id: 'actions', label: 'Actions', disableSorting: true }
    ]

    const [open, setOpen] = useState(false);
    const [recordForEdit, setRecordForEdit] = useState(null);
    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } });
    const [records, setRecords] = useState([])

    const addOrEdit = (supplier, resetForm) => {
        if (supplier.id) {
            updateSupplier(supplier).then(response => {
                if (response !== null) {
                    showNotification("Update Supplier Success", 'success');
                    getData();
                }
            }).catch(error => {
                showNotification("Update Supplier Fail", 'danger');
            })
        } else {
            createSupplier(supplier)
            .then(response => {
                showNotification("Create Supplier Success", 'success');
                getData();
            }).catch(error => {
                showNotification("Create Supplier Fail", 'danger');
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
                    return items.filter(x => x.supplier_name.toLowerCase().includes(target.value.toLowerCase()))
                }
            }
        })
    }

    useEffect(() => {
        getData();
    }, [])

    const getData = () => {
        getListSupplier()
            .then(response => {
                setRecords(response);
            }).catch(error => {
                console.log(error)
            });
    };

    const deleteSuppliers = (item) => {
        deleteSupplier(item).then(response => {
            if (response !== null) {
                showNotification("Delete Supplier Success", 'success');
                getData();
            }
        }).catch(error => {
            console.log(error);
            showNotification("Delete Supplier Fail", 'danger');
        });
    }

    return (
        <>
            <MainCard title="List Supplier">
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
                                        <TableCell>{item.supplier_name}</TableCell>
                                        <TableCell>{item.code_tax}</TableCell>
                                        <TableCell>{item.email}</TableCell>
                                        <TableCell>{item.phone}</TableCell>
                                        <TableCell>{item.address}</TableCell>
                                        <TableCell>
                                            <Controls.ActionButton
                                                color="primary"
                                                onClick={() => { openInPopup(item) }}
                                            >
                                                <IconEdit />
                                            </Controls.ActionButton>
                                            <Controls.ActionButton
                                                color="secondary"
                                                onClick = {() => { deleteSuppliers(item) }}
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
            <Popup title="Create Supplier" openPopup={open} setOpenPopup={setOpen}>
                <FormSupplier recordForEdit={recordForEdit}
                    addOrEdit={addOrEdit} />
            </Popup>
        </>
    );
};

export default ManageSupplier;
