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
import { IconEdit, IconTrash, IconSearch, IconAlignRight } from '@tabler/icons';
import AddIcon from '@mui/icons-material/Add';
import FormRole from './FormRole';
import FormFunctionRole from './FormFunctionRole';
import { useEffect } from 'react';
import { getListRole, createRole, updateRole, deleteRole, createPermission } from 'services/AccountService';
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

const ManageRole = () => {

    const classes = useStyles();

    const headCells = [
        { id: 'id', label: 'STT' },
        { id: 'roleName', label: 'RoleName' },
        { id: 'actions', label: 'Actions', disableSorting: true }
    ]

    const [open, setOpen] = useState(false);
    const [openAddFunction, setOpenAddFunction] = useState(false);
    const [recordForEdit, setRecordForEdit] = useState(null);
    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } });
    const [records, setRecords] = useState([])

    const addOrEdit = (role, resetForm) => {
        if (role.id) {
            updateRole(role).then(response => {
                if (response !== null) {
                    showNotification("Update Role Success", 'success');
                    getData();
                }
            }).catch(error => {
                console.log(error);
                showNotification("Update Role Fail", 'danger');
            })
        } else {
            // Thêm mới role
            createRole(role)
            .then(response => {
                if(response !== null){
                    showNotification("Create Role Success", 'success');
                    getData();
                }
            }).catch(error => {
                console.log(error);
                showNotification("Create Role Fail", 'danger');
            });
        }
        resetForm()
        setRecordForEdit(null)
        setOpen(false)
    }

    const addFunctionRole = (lstFunction, itemRole, resetForm) => {
        console.log(lstFunction);
        console.log(itemRole);
        const lst = lstFunction.filter(f => f.apply === true);
        console.log(lst);
        // Call api lưu thông tin vào bảng account_permission_function
        let lstSave = [];
        lst.forEach(e => {
            let item = {};
            item = { function_id: e.id, role_id: itemRole.id, action: e.action.join('|') };
            lstSave = [...lstSave, item];
        });
        console.log(lstSave);
        let check = 0;
        lstSave.forEach(e => {
            createPermission(e).then(response => {
                if (response !== null) {
                    check +=1;
                }
            }).catch(error => {
                console.log(error)
            })
        })
        console.log(check);
        if(check === lstSave.length){
            showNotification("Create Permission Success", 'success');
        }else{
            showNotification("Create Permission Fail", 'danger');
        }
        resetForm()
        setRecordForEdit(null)
        setOpenAddFunction(false)
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

    const openInPopupFunction = (item) => {
        console.log(item)
        setRecordForEdit(item);
        setOpenAddFunction(true);
    }

    const handleSearch = (e) => {
        let target = e.target;
        setFilterFn({
            fn: items => {
                if (target.value == "")
                    return items;
                else
                    return items.filter(x => x.role_name.toLowerCase().includes(target.value))
            }
        })
        // Code tìm kiếm 
    }

    useEffect(() => {
        getData();
    }, []);

    const getData = () => {
        getListRole()
            .then(response => {
                setRecords(response);
            })
            .catch(error => {
                console.log(error);
            })
    }

    const deleteRoles = (item) => {
        deleteRole(item).then(response => {
            if (response !== null) {
                showNotification("Delete Role Success", 'success');
                getData();
            }
        }).catch(error => {
            console.log(error);
            showNotification("Delete Role Fail", 'danger');
        });
    }

    return (
        <>
            <MainCard title="List Role">
                <Toolbar>
                    <Controls.Input
                        label="Search Role"
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
                                        <TableCell>{item.role_name}</TableCell>
                                        <TableCell>
                                            <Controls.ActionButton
                                                color="primary"
                                                onClick={() => { openInPopupFunction(item) }}
                                            >
                                                <IconAlignRight />
                                            </Controls.ActionButton>
                                            <Controls.ActionButton
                                                color="primary"
                                                onClick={() => { openInPopup(item) }}
                                            >
                                                <IconEdit />
                                            </Controls.ActionButton>
                                            <Controls.ActionButton
                                                color="secondary"
                                                onClick={() => {deleteRoles(item) }}>
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
            <Popup title="Create Role" openPopup={open} setOpenPopup={setOpen}>
                <FormRole recordForEdit={recordForEdit}
                    addOrEdit={addOrEdit} />
            </Popup>
            <Popup title="Add Function" openPopup={openAddFunction} setOpenPopup={setOpenAddFunction}>
                <FormFunctionRole recordForEdit={recordForEdit}
                    addOrEdit={addFunctionRole} />
            </Popup>
        </>
    );
};

export default ManageRole;
