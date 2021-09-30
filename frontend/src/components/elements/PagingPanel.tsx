import React, {ChangeEvent} from 'react';
import {Button, Chip, IconButton, makeStyles, Paper, TablePagination, TextField} from "@material-ui/core";
import {Add, FirstPage, KeyboardArrowLeft, KeyboardArrowRight, LastPage} from "@material-ui/icons";

import Pagination from '@mui/material/Pagination';
import PagingState from "../../store/state/PagingState";
import getPaging from '../../hooks/getPaging';
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {getOpenedProjectId} from "../../hooks/getMenuState";
import {setPage} from "../../store/actions/paging/setPagingData";

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

// interface PagingProps {
//     pageCount: number
//     pageSize: number
//     pageNumber: number
// }

export default function PagingPanel(/*{pageCount, pageSize, pageNumber}*/) {
    const {totalCount, pageSize, pageNumber} =  useSelector(getPaging, shallowEqual);
    const classes = useStyles();
    const dispatch = useDispatch();
    const handleChangePage = (event: any, page: number) => dispatch(setPage(page));

    function handleChangeRowsPerPage() {

    }

    return (<TablePagination
        className={classes.pagingPanel}
        page={pageNumber}
        onPageChange={handleChangePage}
        rowsPerPage={10}
        onRowsPerPageChange={handleChangeRowsPerPage}
        count={totalCount}/>);
}