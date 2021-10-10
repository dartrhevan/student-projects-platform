import React from 'react';
import {makeStyles, Typography} from "@material-ui/core";
import {Action, Query, QueryResult} from 'material-table';

import Table from "../components/util/Table";
import {Check, Clear} from "@material-ui/icons";

interface Row {
    new: boolean,
    date: string,
    text: string
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
        title: 'Новые',
        field: "new",
        filtering: false
    },
    {
        title: 'Дата',
        field: "date",
        sorting: true,
        filtering: false
    },
    {
        title: 'Текст',
        field: "text",
        sorting: false,
        filtering: false
    }
];

export default function Notifications() {
    const classes = useStyles();
    const tableActions: Action<Row>[] = [
        {
            icon: () => <Check />,
            onClick: (event: React.EventHandler<any>, objectData: Row | Row[]) => {
            },
            tooltip: 'Принять',
        },
        {
            icon: () => <Clear />,
            onClick: (event: React.EventHandler<any>, objectData: Row | Row[]) => {
                console.log(objectData);
            },
            tooltip: 'Отклонить',
        },
    ];
    const data = (query: Query<Row>) => new Promise<QueryResult<Row>>((res, rej) =>
        res({data: [{new: true, date: '10/10//2021', text: 'Java'}], page: 0, totalCount: 1}));

    return (<Table title='Уведомления' filtering={false} data={data} tableColumns={tableColumns} tableActions={tableActions}/>);
}
