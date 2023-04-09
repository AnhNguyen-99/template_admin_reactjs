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
import { IconEdit, IconSearch } from '@tabler/icons';
import AddIcon from '@mui/icons-material/Add';
import { useEffect } from 'react';
import { createFunction, updateFunction } from 'services/AccountService';
import { showNotification } from 'services/NotificationService';
import { getListOrder } from 'services/OrdersService';
import ViewOrderItem from './VierwOrderItem';

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

const ManageOrders = () => {

    const classes = useStyles();

    const headCells = [
        { id: 'id', label: 'STT' },
        { id: 'code', label: 'Code' },
        { id: 'customerId', label: 'Customer' },
        { id: 'phone', label: 'Phone' },
        { id: 'address', label: 'Address' },
        { id: 'total', label: 'Total' },
        { id: 'status', label: 'Status' },
        { id: 'actions', label: 'Actions', disableSorting: true }
    ]

    const [open, setOpen] = useState(false);
    const [recordForEdit, setRecordForEdit] = useState(null);
    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } });
    const [records, setRecords] = useState([])

    const addOrEdit = (functions, resetForm) => {
        if (functions.id) {
            // Update function
            updateFunction(functions).then(response => {
                if (response !== null) {
                    showNotification('Update Function Success', 'success');
                    getData();
                }
            }).catch(error => {
                showNotification('Update Function Fail', 'danger');
            });
        } else {
            // Thêm mới function
            createFunction(functions.name_function).then(response => {
                if (response !== null) {
                    showNotification('Create Function Success', 'success');
                    getData();
                }
            }).catch(error => {
                showNotification('Create Function Fail', 'danger');
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
                    return items;
                }
                else
                    return items.filter(x => x.code.toLowerCase().includes(target.value.toLowerCase()))
            }
        })
    }

    useEffect(() => {
        getData();
    }, [])

    const getData = () => {
        getListOrder()
            .then(response => {
                setRecords(response);
            }).catch(error => {
                console.log(error)
            });
    };

    const converToPrice = (price) => {
        return new Intl.NumberFormat('it-IT', {
            style: 'currency',
            currency: 'VND'
          }).format(price);
        
    }

    return (
        <>
            <MainCard title="List Function">
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
                </Toolbar>
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={12}>
                        {/* === Table === */}
                        <TblContainer>
                            <TblHead />
                            <TableBody>
                                {
                                    recordsAfterPagingAndSorting().map((item, index) =>
                                    (<TableRow key={item.id}>
                                        <TableCell>{index + 1}</TableCell>
                                        <TableCell>{item.code}</TableCell>
                                        <TableCell>{item.customer}</TableCell>
                                        <TableCell>{item.phone}</TableCell>
                                        <TableCell>{item.address}</TableCell>
                                        <TableCell>{converToPrice(item.total_price)}</TableCell>
                                        <TableCell>{item.status === false ? 'Pending' : 'Approved'}</TableCell>
                                        <TableCell>
                                            <Controls.ActionButton
                                                color="primary"
                                                onClick={() => { openInPopup(item) }}
                                            >
                                                <IconEdit />
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
            <Popup title="List OrderDetail" openPopup={open} setOpenPopup={setOpen}>
                <ViewOrderItem recordForEdit={recordForEdit}
                    addOrEdit={addOrEdit} />
            </Popup>
        </>
    );
};

export default ManageOrders;
