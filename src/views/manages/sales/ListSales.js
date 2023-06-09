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
import {  updateSale, createSales, deleteSales, getListSales } from 'services/ProductService';
import FormSale from './FormSales';

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

const ManageSales = () => {

    const classes = useStyles();

    const headCells = [
        { id: 'id', label: 'STT' },
        { id: 'sale_code', label: 'SaleCode' },
        { id: 'Sale', label: 'Sale (%)'},
        { id: 'date_sale', label: 'DateSale'},
        { id: 'finish_sale', label: 'FinishSale'},
        { id: 'actions', label: 'Actions', disableSorting: true }
    ]

    const [open, setOpen] = useState(false);
    const [recordForEdit, setRecordForEdit] = useState(null);
    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } });
    const [records, setRecords] = useState([])

    const addOrEdit = (sales, resetForm) => {
        if (sales.id) {
            updateSale(sales).then(response => {
                if (response !== null) {
                    showNotification("Update Sale Success", 'success');
                    getData();
                }
            }).catch(error => {
                showNotification("Update Sale Fail", 'danger');
            })
        } else {
            createSales(sales)
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
                    return items.filter(x => x.sale_code.toLowerCase().includes(target.value.toLowerCase()))
                }
            }
        })
    }

    useEffect(() => {
        getData();
    }, [])

    const getData = () => {
        getListSales()
            .then(response => {
                setRecords(response);
            }).catch(error => {
                console.log(error)
            });
    };

    const deleteSale = (item) => {
        deleteSales(item).then(response => {
            if (response !== null) {
                showNotification("Delete Sale Success", 'success');
                getData();
            }
        }).catch(error => {
            console.log(error);
            showNotification("Delete Sale Fail", 'danger');
        });
    }

    const convertDateTime = (dateTime) => {
        const date = new Date(dateTime);
        return date.toISOString().split('T')[0] + ' '
        + date.toTimeString().split(' ')[0];
    }

    const padTo2Digits = (num) => {
        return num.toString().padStart(2, '0');
      }

    const formatDateTime = (dateTime) => {
        const date = new Date(dateTime);
        return (
            [
              date.getFullYear(),
              padTo2Digits(date.getMonth() + 1),
              padTo2Digits(date.getDate()),
            ].join('-') +
            ' ' +
            [
              padTo2Digits(date.getHours()),
              padTo2Digits(date.getMinutes()),
              padTo2Digits(date.getSeconds()),
            ].join(':')
          );   
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
                                        <TableCell>{item.sale_code}</TableCell>
                                        <TableCell>{item.sales}</TableCell>
                                        <TableCell>{item.date_sale !== null ? formatDateTime(item.date_sale) : ''}</TableCell>
                                        <TableCell>{item.finish_sale !== null ? formatDateTime(item.finish_sale) : ''}</TableCell>
                                        <TableCell>
                                            <Controls.ActionButton
                                                color="primary"
                                                onClick={() => { openInPopup(item) }}
                                            >
                                                <IconEdit />
                                            </Controls.ActionButton>
                                            <Controls.ActionButton
                                                color="secondary"
                                                onClick = {() => { deleteSale(item) }}
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
            <Popup title="Create Sale" openPopup={open} setOpenPopup={setOpen}>
                <FormSale recordForEdit={recordForEdit}
                    addOrEdit={addOrEdit} />
            </Popup>
        </>
    );
};

export default ManageSales;
