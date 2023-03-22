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
import FormFunction from './FormFunction';
import { useEffect } from 'react';
import { createFunction, deleteFunction, getListFunction, updateFunction } from 'services/AccountService';
import { showNotification } from 'services/NotificationService';

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

const ManageFunction = () => {

    const classes = useStyles();

    const headCells = [
        { id: 'id', label: 'STT' },
        { id: 'nameFunction', label: 'NameFunction' },
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
                    console.log(items);
                    return items;
                }
                else
                    return items.filter(x => x.name_function.toLowerCase().includes(target.value.toLowerCase()))
            }
        })
    }

    useEffect(() => {
        getData();
    }, [])

    const getData = () => {
        getListFunction()
            .then(response => {
                setRecords(response);
            }).catch(error => {
                console.log(error)
            });
    };

    const deleteFunctions = (item) => {
        deleteFunction(item).then(response => {
            if (response !== null) {
                showNotification('Delete Success', 'success');
                getData();
            }
        }).catch(error => {
            console.log(error);
            showNotification('Delete Fail', 'danger');
        });
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
                                        <TableCell>{item.name_function}</TableCell>
                                        <TableCell>
                                            <Controls.ActionButton
                                                color="primary"
                                                onClick={() => { openInPopup(item) }}
                                            >
                                                <IconEdit />
                                            </Controls.ActionButton>
                                            <Controls.ActionButton
                                                color="secondary"
                                                onClick={() => { deleteFunctions(item) }}>
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
            <Popup title="Create Function" openPopup={open} setOpenPopup={setOpen}>
                <FormFunction recordForEdit={recordForEdit}
                    addOrEdit={addOrEdit} />
            </Popup>
        </>
    );
};

export default ManageFunction;
