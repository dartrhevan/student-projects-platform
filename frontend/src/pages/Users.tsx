import React, {useEffect, useState} from 'react';
import {Button, Dialog, DialogContent} from "@material-ui/core";
import {Action, Query} from 'material-table';
import {Person, PersonAdd,} from "@material-ui/icons";
import Table from "../components/util/Table";
import queryString from "query-string";
import {allNotEmpty} from "../utils/utils";
import ViewableText from "../components/elements/ViewableText";
import {DialogActions, DialogTitle} from "@mui/material";
import {getUsers, inviteToProject} from "../api/users";
import UserRow, {UserType} from "../model/UserRow";
import RoleInput from "../components/elements/RoleInput";
import {useSuccess} from "../hooks/logging";
import {getRolesReference} from "../api/reference";
import SlideTransition from "../components/util/SlideTransition";


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
        field: "typeUser",
        sorting: false,
        filtering: false,
        render: (row: UserRow) => {
            switch (row.typeUser) {
                case UserType.ORGANIZER:
                    return 'Организатор';
                case UserType.MENTOR:
                    return 'Ментор';
                case UserType.STUDENT:
                    return "Студент";
            }
        }
    },
    {
        title: 'Текущий проект',
        field: "projectTitle",
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
        return getUsers(workspaceId as string, query, projectId as string | null);
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

    const success = useSuccess();

    const [rolesReference, setRolesReference] = useState([] as string[]);

    useEffect(() => {
        getRolesReference().then(r => setRolesReference(r.data)).catch(console.log);
    }, []);

    function onInvite() {
        inviteToProject(openInviteUsername, projectId, inviteRole).then(() => {
            success('Invitation has been sent');
            setOpenInviteDialog(false)
        })
    }

    function onRoleChange(s: string | string[]) {
        const newRole = s as string;
        setInviteRole(newRole);
    }

    function onInviteAborted() {
        setOpenInviteDialog(false);
        setInviteRole('');
    }

    return (<>
        <Dialog TransitionComponent={SlideTransition} open={openInviteDialog} onClose={onInviteAborted}>
            <DialogTitle>Пригласить участника</DialogTitle>
            <DialogContent dividers>
                <RoleInput reference={rolesReference} onChange={onRoleChange} multiple={false}/>
            </DialogContent>
            <DialogActions>
                <Button disabled={!inviteRole || inviteRole === ''} onClick={onInvite}>Подтвердить</Button>
            </DialogActions>
        </Dialog>
        <Table title='Поиск участников' data={data} tableColumns={tableColumns} tableActions={tableActions}/>
    </>);

}
