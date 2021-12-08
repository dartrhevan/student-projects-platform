import React from 'react';
import {useParams} from 'react-router-dom';
import Table from "../components/util/Table";
import {Query, QueryResult} from "material-table";
import ProjectParticipation from "../model/ProjectParticipation";
import {getPortfolio} from "../api/users";
import {Link} from "@mui/material";
import {labelColors} from "../model/Project";

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
    const {login} = useParams<LoginParam>();

    const data = (query: Query<ProjectParticipation>) => new Promise<QueryResult<ProjectParticipation>>((res, rej) =>
        getPortfolio(login).then(d =>
            res({
                data: d.data.projects, page: 0, totalCount: 1
            })));

//TODO: лучше выводить ФИ пользователя
    return (
        <Table title={`Портфолио пользователя ${login}`} filtering={false} data={data} tableColumns={tableColumns}
               paging={false}/>);
}
