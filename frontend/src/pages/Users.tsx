import React, {useState} from 'react';
import {Button, makeStyles, Typography} from "@material-ui/core";
import {Action, Query, QueryResult} from 'material-table';
import {Person, PersonAdd,} from "@material-ui/icons";
import Table from "../components/util/Table";
import queryString from "query-string";
import {allNotEmpty, getOnFieldChange} from "../utils/utils";
import ViewableText from "../components/elements/ViewableText";
import {Dialog, MenuItem, Select, TextField} from "@mui/material";
import Centered from "../components/util/Centered";
import {invitePerson} from "../api/workspaces";

interface Row {
    name: string,
    surname: string,
    roles: string,
    skills: string,
    username: string,
    reputation: string,
    interests: string,
    project: string
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
        filtering: false,
        render: (row: Row) => <ViewableText maxWidth={200}>{row.interests}</ViewableText>
    },
    {
        title: 'Текущий проект',
        field: "project",
        sorting: true,
    },
    {
        title: 'Репутация',
        field: "reputation",
        sorting: true,
    }
];

export default function Users() {
    const params = queryString.parse(window.location.search);
    const workspaceId = params?.workspaceId, projectId = params?.projectId;

    const invite = allNotEmpty(workspaceId, projectId);

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
                project: 'Project Activity',
                interests: 'Programming Programming Programming Programming Programming Programming\nProgramming Programming Programming\nProgramming Programming Programming Programming'
            }], page: 0, totalCount: 1
        });
    });
    const tableActions: Action<Row>[] = [
        {
            icon: () => <Person/>,
            onClick: (event: React.EventHandler<any>, objectData: Row | Row[]) =>
                window.location.href = `/portfolio/${(objectData as Row).username}`,
            tooltip: 'Просмотр портфолио',
        }
    ];

    if (invite)
        tableActions.push({
            icon: () => <PersonAdd/>,
            onClick: (event: React.EventHandler<any>, objectData: Row | Row[]) => {
                // console.log(objectData);

                setOpenInviteUsername((objectData as Row).username);
            },
            tooltip: 'Пригласить',
        });

    const [openInviteUsername, setOpenInviteUsername] = useState(null as string | null);
    const [inviteRole, setInviteRole] = useState(null as string | null);

    function onInvite() {
        invitePerson(openInviteUsername as string, inviteRole as string).then(() => {
            alert('Invitation has been sent');
            setOpenInviteUsername(null);
        })
    }

    return (<>
        <Dialog open={openInviteUsername !== null} onClose={() => setOpenInviteUsername(null)}>
            <Centered>
                {/*<Select*/}
                {/*    value={}*/}
                {/*    label="Выберите роль"*/}
                {/*    onChange={handleChange}>*/}
                {/*    */}
                {/*</Select>*/}
                <TextField margin='normal' value={inviteRole} onChange={getOnFieldChange(setInviteRole)}
                           label="Введите роль"/>
                <Button disabled={!inviteRole} onClick={onInvite}>Подтвердить</Button>
            </Centered>
        </Dialog>
        <Table title='Поиск учасников' data={data} tableColumns={tableColumns} tableActions={tableActions}/>
    </>);
}
