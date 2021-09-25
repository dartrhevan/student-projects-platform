import React, {forwardRef} from 'react';
import {makeStyles, Typography} from "@material-ui/core";
import MaterialTable, {Action, Icons, Query, QueryResult} from 'material-table';
import {
    Edit,
    Delete,
    FirstPage,
    LastPage,
    KeyboardArrowRight,
    KeyboardArrowLeft,
    Search, Clear, Check, ArrowDownward, Close
} from "@material-ui/icons";

interface Row {
    name: string,
    roles: string,
    skills: string
}

const useStyles = makeStyles(theme => ({
    main: {
        // margin: "50px 0"
    },
    title: {
        margin: '45px 0 10px 0'
    }
}));


const tableColumns = [
    {
        title: 'Имя',
        field: "name",
        sorting: false,
        filtering: false
    },
    {
        title: 'Роли',
        field: "roles",
        sorting: true,
    },
    {
        title: 'Навыки',
        field: "skills",
        sorting: true,
    }
];

export default function Notifications() {
    const classes = useStyles();
    const data = (query: Query<Row>) => new Promise<QueryResult<Row>>((res, rej) =>
        res({data: [{name: 'Vova', roles: 'backend', skills: 'Java'}], page: 0, totalCount: 1}));
    const tableActions: Action<Row>[] = [
        {
            icon: () => <Edit/>,
            onClick: (event: React.EventHandler<any>, objectData: Row | Row[]) => {
            },
            tooltip: 'Просмотр профиля',
        },
        {
            icon: () => <Delete/>,
            onClick: (event: React.EventHandler<any>, objectData: Row | Row[]) => {
                console.log(objectData);
            },
            tooltip: 'Пригласить',
        },
    ];
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
            <Typography className={classes.title} variant='h3'>Уведомления</Typography>

            <MaterialTable
                title={<Typography
                    variant="h6"
                    gutterBottom>
                    Уведомления
                </Typography>}
                data={data}
                columns={tableColumns}
                actions={tableActions}
                icons={icons}
                options={{
                    pageSize: 10,
                    pageSizeOptions: [10, 20, 30],
                    debounceInterval: 500,
                    toolbarButtonAlignment: 'right',
                    draggable: false,
                    search: false,
                    filtering: true,
                    actionsColumnIndex: -1
                }}
                style={{width: '100%', margin: 15}}/>
        </>);
}