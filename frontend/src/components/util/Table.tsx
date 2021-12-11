import React, {forwardRef} from 'react';

import {makeStyles} from "@material-ui/core";
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
import THEME, {ElementsStyle} from '../../theme';
import {Fade, Typography} from "@mui/material";
import isMobile from "../../hooks/isMobile";

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
    tableActions?: Action<T>[] | ((t: T) => Action<T>)[]
    filtering?: boolean
    paging?: boolean
    subHeader?: string
    tableRef?: React.Ref<MaterialTable<T>>
    emptyDataSourceMessage?: React.ReactNode
    buttons?: React.ReactNode
}

export default function Table<T extends object>(
    {
        tableRef,
        title,
        data,
        tableColumns,
        tableActions,
        paging = true,
        filtering = true,
        subHeader,
        emptyDataSourceMessage = 'Нет данных',
        buttons
    }: ITableProps<T>) {
    // const classes = useStyles();
    // const mobile = isMobile();

    const icons: Icons = {
        FirstPage: forwardRef((props, ref) => <FirstPage ref={ref}/>),
        LastPage: forwardRef((props, ref) => <LastPage ref={ref}/>),
        NextPage: forwardRef((props, ref) => <KeyboardArrowRight ref={ref}/>),
        PreviousPage: forwardRef((props, ref) => <KeyboardArrowLeft ref={ref}/>),
        Search: forwardRef((props, ref) => <Search ref={ref}/>),
        Filter: forwardRef((props, ref) => <Search ref={ref}/>),
        SortArrow: forwardRef((props, ref) => <ArrowDownward ref={ref}/>),
        ResetSearch: forwardRef((props, ref) => <Close ref={ref}/>),

    };
    return (

        <Fade in={true}>
            <MaterialTable
                tableRef={tableRef}
                title={(<div style={{display: 'flex', flexDirection: buttons ? 'row' : 'column'}}>
                    <Typography variant="h6" sx={ElementsStyle} gutterBottom>
                        {title}
                    </Typography>
                    {buttons}
                    <Typography variant="body2" align='center' sx={{
                        display: "flex",
                        alignItems: "center",
                        margin: "0 15px"
                    }}>
                        {subHeader}
                    </Typography>
                </div>)}
                data={data}
                columns={tableColumns}
                actions={tableActions}
                icons={icons}
                options={{
                    paging: paging,
                    pageSize: 10,
                    pageSizeOptions: [10, 20, 30],
                    debounceInterval: 500,
                    toolbarButtonAlignment: 'left',
                    draggable: false,
                    search: false,
                    filtering: filtering,
                    actionsColumnIndex: -1,
                    headerStyle: ElementsStyle
                }}
                localization={{
                    header: {
                        actions: 'Действия'
                    },
                    body: {
                        emptyDataSourceMessage: emptyDataSourceMessage
                    }
                }}
                style={{
                    width: '90%', margin: '20px 0px',
                    minHeight: '80%',
                    ...ElementsStyle
                }}/>
        </Fade>);
}
