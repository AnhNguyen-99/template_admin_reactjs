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
import FormWarehouse from './FormWarehouse';
import { getlistImport, updateImport, deleteImport, createImport } from 'services/ProductService';

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

const ManageWarehouse = () => {
    
    const classes = useStyles();

    const headCells = [
        { id: 'id', label: 'STT' },
        { id: 'code', label: 'CodeImport' },
        { id: 'supllier_name', label: 'SupplierName'},
        { id: 'total_price', label: 'TotalPrice'},
        { id: 'actions', label: 'Actions', disableSorting: true }
    ]

    const [open, setOpen] = useState(false);
    const [recordForEdit, setRecordForEdit] = useState(null);
    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } });
    const [records, setRecords] = useState([])

    const addOrEdit = (imports, resetForm) => {
        if (imports.id) {
            updateImport(imports).then(response => {
                if (response !== null) {
                    showNotification("Update Import Warehouse Success", 'success');
                    getData();
                }
            }).catch(error => {
                showNotification("Update Import Warehouse Fail", 'danger')
            })
        } else {
            // Thêm mới category
            createImport(imports)
            .then(response => {
                showNotification('Create Import Warehouse Success', 'success');
                getData();
            }).catch(error => {
                showNotification('Create Import Warehouse Fail', 'danger');
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
                else {
                    return items.filter(x => x.code.toLowerCase().includes(target.value.toLowerCase()))
                }
            }
        })
        // Code tìm kiếm 
    }

    useEffect(() => {
        getData();
    }, [])

    const getData = () => {
        let promise;
        promise = getlistImport()
            .then(response => {
                setRecords(response);
            })
            .catch(error => {
                console.log(error);
            });
    }

    const deleteImports = (item) => {
        deleteImport(item).then(response => {
            if (response !== null) {
                showNotification("Delete Import Warehouse Success", 'success');
                getData();
            }
        }).catch(error => {
            console.log(error);
            showNotification('Delete Import Warehouse Fali', 'danger');
        });
    }

    return (
        <>
            <MainCard title="List Category">
                <Toolbar>
                    <Controls.Input
                        label="Search"
                        className={classes.searchInput}
                        placeholder= "Search ...."
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
                                        <TableCell>{item.supplier_name}</TableCell>
                                        <TableCell>{item.total_price}</TableCell>
                                        <TableCell>
                                            <Controls.ActionButton
                                                color="primary"
                                                onClick={() => { openInPopup(item) }}
                                                >
                                                <IconEdit />
                                            </Controls.ActionButton>
                                            <Controls.ActionButton
                                                color="secondary"
                                                onClick={() => {deleteImports(item) }}>
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
            <Popup title="Create Import Warehouse" openPopup={open} setOpenPopup={setOpen}>
                <FormWarehouse recordForEdit={recordForEdit}
                    addOrEdit={addOrEdit} />
            </Popup>
        </>
    );
};

export default ManageWarehouse;
