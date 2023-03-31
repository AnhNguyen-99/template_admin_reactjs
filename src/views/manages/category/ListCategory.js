// material-ui
import { Grid, TableBody, TableRow, TableCell, InputAdornment, Toolbar } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import { useState } from 'react';

import Popup from 'ui-component/Popup';
import FormCategory from './FormCategory';
import useTable from 'ui-component/useTable';
import Controls from 'ui-component/controls/Controls';
import { makeStyles } from '@mui/styles';
// ===============================|| Dialog ||================================= //
import { IconEdit, IconTrash, IconSearch } from '@tabler/icons';
import AddIcon from '@mui/icons-material/Add';
import { useEffect } from 'react';
import { createCategory, deleteCategory, getlistCategory, updateCategory } from 'services/ProductService';
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

const ManageCategory = () => {
    
    const classes = useStyles();

    // const data = [
    //     {
    //         'id': 1,
    //         'categoryName': 'Danh mục 1'
    //     },
    //     {
    //         'id': 2,
    //         'categoryName': 'Danh mục 2'
    //     }
    // ]

    const headCells = [
        { id: 'id', label: 'STT' },
        { id: 'categoryName', label: 'CategoryName' },
        { id: 'subCategory', label: 'SubCategory'},
        { id: 'actions', label: 'Actions', disableSorting: true }
    ]

    const [open, setOpen] = useState(false);
    const [recordForEdit, setRecordForEdit] = useState(null);
    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } });
    const [records, setRecords] = useState([])

    const addOrEdit = (category, resetForm) => {
        if (category.id) {
            updateCategory(category).then(response => {
                if (response !== null) {
                    showNotification("Update Category Success", 'success');
                    getData();
                }
            }).catch(error => {
                showNotification("Update Category Fail", 'danger')
            })
        } else {
            // Thêm mới category
            createCategory(category)
            .then(response => {
                showNotification('Create Category Success', 'success');
                getData();
            }).catch(error => {
                showNotification('Create Category Fail', 'danger');
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
                    return items.filter(x => x.category_name.toLowerCase().includes(target.value.toLowerCase()))
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
        promise = getlistCategory()
            .then(response => {
                setRecords(response);
            })
            .catch(error => {
                console.log(error);
            });
    }

    const deleteCategorys = (item) => {
        deleteCategory(item).then(response => {
            if (response !== null) {
                showNotification("Delete Category Success", 'success');
                getData();
            }
        }).catch(error => {
            console.log(error);
            showNotification('Delete Category Fail', 'danger');
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
                                        <TableCell>{item.category_name}</TableCell>
                                        <TableCell>{item.sub_category}</TableCell>
                                        <TableCell>
                                            <Controls.ActionButton
                                                color="primary"
                                                onClick={() => { openInPopup(item) }}
                                                >
                                                <IconEdit />
                                            </Controls.ActionButton>
                                            <Controls.ActionButton
                                                color="secondary"
                                                onClick={() => {deleteCategorys(item) }}>
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
            <Popup title="Create Category" openPopup={open} setOpenPopup={setOpen}>
                <FormCategory recordForEdit={recordForEdit}
                    addOrEdit={addOrEdit} />
            </Popup>
        </>
    );
};

export default ManageCategory;
