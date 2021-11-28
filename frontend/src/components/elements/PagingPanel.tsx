import React from 'react';
import {makeStyles, TablePagination} from "@material-ui/core";
import getPaging from '../../hooks/getPaging';
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {setPage, setPageSize} from "../../store/actions/paging/setPagingData";
import THEME, {BackgroundStyle, ElementsStyle} from "../../theme";

const useStyles = makeStyles(theme => ({
    pagingPanel: {
        padding: '10px 15px',
        width: '100%',
        maxWidth: '80vw',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        border: 'none',
        ...BackgroundStyle
    }
}));


export default function PagingPanel() {
    const {totalCount, pageSize, pageNumber} =  useSelector(getPaging, shallowEqual);
    const classes = useStyles();
    const dispatch = useDispatch();
    const handleChangePage = (event: any, page: number) => dispatch(setPage(page));

    const handleChangeRowsPerPage = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
        dispatch(setPageSize(Number.parseInt(e.target.value)));

    console.log(`pageSize: ${pageSize} totalCount: ${totalCount} pageNumber: ${pageNumber}`);
    return (<TablePagination
        className={classes.pagingPanel}
        page={pageNumber}
        onPageChange={handleChangePage}
        rowsPerPage={pageSize}
        labelRowsPerPage='Кол-во отображаемых объектов'
        onRowsPerPageChange={handleChangeRowsPerPage}
        count={totalCount}/>);
}
