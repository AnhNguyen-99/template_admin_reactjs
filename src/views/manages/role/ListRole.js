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
import FormRole from './FormRole';

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

    const data = [
        {
            'id': 1,
            'roleName': 'Admin'
        },
        {
            'id': 2,
            'roleName': 'Manages'
        },
        {
            'id': 3,
            'roleName': 'Employee'
        },
        {
            'id': 4,
            'roleName': 'User'
        }
    ]

    const headCells = [
        { id: 'id', label: 'RoleID' },
        { id: 'roleName', label: 'RoleName' },
        { id: 'actions', label: 'Actions', disableSorting: true }
    ]

    const [open, setOpen] = useState(false);
    const [recordForEdit, setRecordForEdit] = useState(null);
    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } });
    const [records, setRecords] = useState(data)

    const addOrEdit = (category, resetForm) => {
        console.log(category);
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
        // console.log(e);
        // let target = e.target;
        // setFilterFn({
        //     fn: items => {
        //         if (target.value == "")
        //             return items;
        //         else
        //             return items.filter(x => x.categoryName.toLowerCase().includes(target.value))
        //     }
        // })
        // Code tìm kiếm 
    }


    return (
        <>
            <MainCard title="List Role">
                <Toolbar>
                    <Controls.Input
                        label="Search Role"
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
                                    recordsAfterPagingAndSorting().map(item =>
                                    (<TableRow key={item.id}>
                                        <TableCell>{item.id}</TableCell>
                                        <TableCell>{item.roleName}</TableCell>
                                        <TableCell>
                                            <Controls.ActionButton
                                                color="primary"
                                                onClick={() => { openInPopup(item) }}
                                                >
                                                <IconEdit />
                                            </Controls.ActionButton>
                                            <Controls.ActionButton
                                                color="secondary">
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
        </>
    );
};

export default ManageRole;
