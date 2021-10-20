import React from 'react';
import {makeStyles, Typography} from "@material-ui/core";
import {Action, Query, QueryResult} from 'material-table';
import {Person, PersonAdd,} from "@material-ui/icons";
import Table from "../components/util/Table";

interface Row {
    name: string,
    surname: string,
    roles: string,
    skills: string,
    username: string,
    reputation: string,
    interests: string
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
        // filtering: false
    },
    {
        title: 'Фамилимя',
        field: "surname",
        sorting: false,
        // filtering: false
    },
    {
        title: 'Роли',
        field: "roles",
        sorting: false,
    },
    {
        title: 'Навыки',
        field: "skills",
        sorting: false,
    },
    {
        title: 'Интересы',
        field: "interests",
        sorting: false,
        filtering: false
    },
    {
        title: 'Репутация',
        field: "reputation",
        sorting: true,
    }
];

export default function Users() {
    const classes = useStyles();
    const data = (query: Query<Row>) => new Promise<QueryResult<Row>>((res, rej) => {
        console.log(`query`);
        console.log(query);
        res({
            data: [{
                name: 'Vova',
                surname: 'Satunkin',
                roles: 'backend',
                skills: 'Java',
                reputation: '5',
                username: 'me',
                interests: 'Programming Programming Programming Programming Programming\nProgramming Programming Programming Programming Programming Programming Programming Programming Programming\nProgramming Programming Programming Programming'
            }], page: 0, totalCount: 1
        });
    });
    const tableActions: Action<Row>[] = [
        {
            icon: () => <Person/>,
            onClick: (event: React.EventHandler<any>, objectData: Row | Row[]) =>
                window.location.href = `/portfolio/${(objectData as Row).username}`,
            tooltip: 'Просмотр портфолио',
        },
        {
            icon: () => <PersonAdd/>,
            onClick: (event: React.EventHandler<any>, objectData: Row | Row[]) => {
                console.log(objectData);
            },
            tooltip: 'Пригласить',
        },
    ];

    return (<Table title='Поиск учасников' data={data} tableColumns={tableColumns} tableActions={tableActions}/>);
}
