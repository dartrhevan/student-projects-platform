import React, {useEffect, useState} from 'react';
import {Button, DialogContent} from "@material-ui/core";
import {Action, Query} from 'material-table';
import {Person, PersonAdd,} from "@material-ui/icons";
import Table from "../components/util/Table";
import queryString from "query-string";
import {allNotEmpty} from "../utils/utils";
import ViewableText from "../components/elements/ViewableText";
import {Dialog, DialogActions, DialogTitle} from "@mui/material";
import {invitePerson} from "../api/workspaces";
import {getUsers} from "../api/users";
import Pageable from "../model/Pageable";
import UserRow from "../model/UserRow";
import RolesInput from "../components/elements/RolesInput";


const tableColumns = [
    {
        title: 'Имя',
        field: "name",
        sorting: false,
    },
    {
        title: 'Фамилимя',
        field: "surname",
        sorting: false,
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
        title: 'Месенджр',
        field: "messenger",
        sorting: false,
        filtering: false
    },
    {
        title: 'Email',
        field: "email",
        sorting: false,
        filtering: false
    },
    {
        title: 'Тип',
        field: "userType",
        sorting: false,
        filtering: false
    },
    {
        title: 'Текущий проект',
        field: "project",
        sorting: false,
        filtering: true,
    },
    {
        title: 'Интересы',
        field: "interests",
        sorting: false,
        filtering: false,
        render: (row: UserRow) => <ViewableText maxWidth={200}>{row.interests}</ViewableText>
    }
];

export default function Users() {
    const params = queryString.parse(window.location.search);
    const workspaceId = params?.workspaceId, projectId = params?.projectId;

    const [openInviteUsername, setOpenInviteUsername] = useState('');
    const [openInviteDialog, setOpenInviteDialog] = useState(false);
    const [inviteRole, setInviteRole] = useState('');

    const invite = allNotEmpty(workspaceId, projectId);

    const data = (query: Query<UserRow>) => {
        console.log(`query`);
        console.log(query);
        return getUsers(workspaceId as string, query);
    };
    const tableActions: Action<UserRow>[] = [
        {
            icon: () => <Person/>,
            onClick: (event: React.EventHandler<any>, objectData: UserRow | UserRow[]) =>
                window.location.href = `/portfolio/${(objectData as UserRow).username}`,
            tooltip: 'Просмотр портфолио',
        },
    ];

    if (invite)
        tableActions.push({
            icon: () => <PersonAdd/>,
            onClick: (event: React.EventHandler<any>, objectData: UserRow | UserRow[]) => {
                setOpenInviteUsername((objectData as UserRow).username);
                setOpenInviteDialog(true);
            },
            tooltip: 'Пригласить',
        });


    function onInvite() {
        invitePerson(openInviteUsername, inviteRole).then(() => {
            alert('Invitation has been sent');
            setOpenInviteDialog(false)
        })
    }

    return (<>
        <Dialog open={openInviteDialog} onClose={() => setOpenInviteDialog(false)}>
            <DialogTitle>Пригласить участника</DialogTitle>
            <DialogContent dividers>
                <RolesInput onChange={s => setInviteRole(s as string)} role={inviteRole} multiple={false}/>
            </DialogContent>
            <DialogActions>
                <Button disabled={inviteRole === ''} onClick={onInvite}>Подтвердить</Button>
            </DialogActions>
        </Dialog>
        {/*<Button onClick={() => setOpenInviteDialog(true)}>assasa</Button>*/}
        <Table title='Поиск учасников' data={data} tableColumns={tableColumns} tableActions={tableActions}/>
    </>);
}
