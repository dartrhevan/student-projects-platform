import React from 'react';
import {useParams} from 'react-router-dom';
import Table from "../components/util/Table";
import MaterialTable, {Query, QueryResult} from "material-table";
import ProjectParticipation from "../model/ProjectParticipation";
import {getPortfolio} from "../api/users";
import {Link} from "@mui/material";
import {labelColors} from "../model/Project";
import Notification from "../model/Notification";
import {useSelector} from "react-redux";
import getUsername from "../hooks/getUsername";

interface LoginParam {
    login: string
}

const tableColumns = [
    {
        title: 'Название проекта',
        field: "title",
        filtering: false,
        sorting: false,
        render: (p: ProjectParticipation) =>
            <Link href={`/project?projectId=${p.projectId}&workspaceId=${p.workspaceId}`}>{p.title}</Link>
    },
    {
        title: 'Роль на проекте',
        field: "role",
        sorting: false,
        filtering: false
    },
    {
        title: 'Оценка за проект',
        field: "score",
        sorting: false,
        filtering: false
    },
    {
        title: 'Статус проект',
        field: "status",
        sorting: false,
        filtering: false,
        render: (p: ProjectParticipation) => <span style={{color: labelColors.get(p.status)}}>{p.status}</span>
    }
];

export default function () {
    const currentUserLogin = useSelector(getUsername);

    const {login} = useParams<LoginParam>();

    const data = (query: Query<ProjectParticipation>) => getPortfolio(login);

    return (
        <Table title={`Портфолио пользователя ${login}`} filtering={false} data={data} tableColumns={tableColumns}
               paging={false}
               emptyDataSourceMessage={login === currentUserLogin?.user.username
                   ? 'На данной странице будут отображаться завершенные проекты с вашим участием'
                   : "У пользователя пока нет ни одного завершенного проекта"}/>);
}
