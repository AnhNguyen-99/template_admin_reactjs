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
import FormBranch from './FormBranch';
import { useEffect } from 'react';
import { showNotification } from 'services/NotificationService';
import { createBranch, getListBranch, updateBranch, deleteBranch } from 'services/ProductService';

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

const ManageBranch = () => {

    const classes = useStyles();

    const headCells = [
        { id: 'id', label: 'STT' },
        { id: 'nameBranch', label: 'NameBranch' },
        { id: 'actions', label: 'Actions', disableSorting: true }
    ]

    const [open, setOpen] = useState(false);
    const [recordForEdit, setRecordForEdit] = useState(null);
    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } });
    const [records, setRecords] = useState([])

    const addOrEdit = (branch, resetForm) => {
        if (branch.id) {
            // Update branch
            updateBranch(branch).then(response => {
                if (response !== null) {
                    showNotification('Update Branch Success', 'success');
                    getData();
                }
            }).catch(error => {
                showNotification('Update Branch Fail', 'danger');
            });
        } else {
            // Thêm mới branch
            createBranch(branch.branch_name).then(response => {
                if (response !== null) {
                    showNotification('Create Branch Success', 'success');
                    getData();
                }
            }).catch(error => {
                showNotification('Create Branch Fail', 'danger');
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
                    return items.filter(x => x.branch_name.toLowerCase().includes(target.value.toLowerCase()))
            }
        })
    }

    useEffect(() => {
        getData();
    }, [])

    const getData = () => {
        getListBranch()
            .then(response => {
                setRecords(response);
            }).catch(error => {
                console.log(error)
            });
    };

    const deleteBranchs = (item) => {
        deleteBranch(item).then(response => {
            if (response !== null) {
                showNotification('Delete Branch Success', 'success');
                getData();
            }
        }).catch(error => {
            console.log(error);
            showNotification('Delete Branch Fail', 'danger');
        });
    }


    return (
        <>
            <MainCard title="List Branch">
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
                                        <TableCell>{item.branch_name}</TableCell>
                                        <TableCell>
                                            <Controls.ActionButton
                                                color="primary"
                                                onClick={() => { openInPopup(item) }}
                                            >
                                                <IconEdit />
                                            </Controls.ActionButton>
                                            <Controls.ActionButton
                                                color="secondary"
                                                onClick={() => { deleteBranchs(item) }}>
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
            <Popup title="Create Branch" openPopup={open} setOpenPopup={setOpen}>
                <FormBranch recordForEdit={recordForEdit}
                    addOrEdit={addOrEdit} />
            </Popup>
        </>
    );
};

export default ManageBranch;
