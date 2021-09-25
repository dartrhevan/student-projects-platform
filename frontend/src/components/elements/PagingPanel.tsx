import React from 'react';
import {Button, Chip, IconButton, makeStyles, Paper, TablePagination, TextField} from "@material-ui/core";
import {Add, FirstPage, KeyboardArrowLeft, KeyboardArrowRight, LastPage} from "@material-ui/icons";

import Pagination from '@mui/material/Pagination';

const useStyles = makeStyles(theme => ({
    pagingPanel: {
        padding: '10px 15px',
        width: '100%',
        maxWidth: '80vw',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end'
    }
}));

export default function PagingPanel() {
    const classes = useStyles();
    const page = 5;
    const handleChangePage = () => {};
    const rowsPerPage = 10;

    function handleChangeRowsPerPage() {

    }

    return (<TablePagination
                className={classes.pagingPanel}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
             count={500}/>);
}