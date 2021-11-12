import React, {forwardRef} from 'react';

import {makeStyles, Typography} from "@material-ui/core";
import MaterialTable, {Action, Column, Icons, Query, QueryResult} from "material-table";
import {
    ArrowDownward,
    Close,
    FirstPage,
    KeyboardArrowLeft,
    KeyboardArrowRight,
    LastPage,
    Search
} from "@material-ui/icons";

const useStyles = makeStyles(theme => ({
    main: {
        // margin: "50px 0"
    },
    title: {
        margin: '45px 0 10px 0'
    }
}));

interface ITableProps<T extends object> {
    title: string
    data: (query: Query<T>) => Promise<QueryResult<T>>
    tableColumns: Column<T>[]
    tableActions?: Action<T>[]
    filtering?: boolean
    paging?: boolean
    tableRef?: React.Ref<MaterialTable<T>>
}

export default function Table<T extends object>({tableRef, title, data, tableColumns, tableActions, paging = true, filtering = true}: ITableProps<T>) {
    const classes = useStyles();
    const icons: Icons = {
        FirstPage: forwardRef((props, ref) => <FirstPage ref={ref}/>),
        LastPage:  forwardRef((props, ref) => <LastPage ref={ref}/>),
        NextPage: forwardRef((props, ref) => <KeyboardArrowRight ref={ref}/>),
        PreviousPage: forwardRef((props, ref) => <KeyboardArrowLeft ref={ref}/>),
        Search: forwardRef((props, ref) => <Search ref={ref}/>),
        Filter: forwardRef((props, ref) => <Search ref={ref}/>),
        // Delete,
        // Clear,
        // Check,
        SortArrow: forwardRef((props, ref) => <ArrowDownward ref={ref}/>),
        ResetSearch: forwardRef((props, ref) => <Close ref={ref}/>),
        // Edit
    };
    return (
        <>
            <Typography className={classes.title} variant='h3'>{title}</Typography>

            <MaterialTable
                tableRef={tableRef}
                title={<Typography
                    variant="h6"
                    gutterBottom>
                    {title}
                </Typography>}
                data={data}
                columns={tableColumns}
                actions={tableActions}
                icons={icons}
                options={{
                    paging: paging,
                    pageSize: 10,
                    pageSizeOptions: [10, 20, 30],
                    debounceInterval: 500,
                    toolbarButtonAlignment: 'right',
                    draggable: false,
                    search: false,
                    filtering: filtering,
                    actionsColumnIndex: -1
                }}
                style={{width: '100%', margin: 15}}/>
        </>);
}
