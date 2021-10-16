import React from 'react';
import {Action, Query, QueryResult} from 'material-table';

import Table from "../components/util/Table";
import {Check, Clear} from "@material-ui/icons";
import Dot from "../components/util/Dot";

interface Row {
    new: boolean,
    date: string,
    text: string
}

const tableColumns = [
    {
        title: 'Новые',
        field: "new",
        filtering: false,
        render: (row: Row) => row.new ? <Dot /> : <></>
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
        res({data: [{new: true, date: '10/10//2021', text: 'Java'}, {new: false, date: '10/02/2021', text: 'Lay'}], page: 0, totalCount: 1}));

    return (<Table title='Уведомления' filtering={false} data={data} tableColumns={tableColumns} tableActions={tableActions}/>);
}
