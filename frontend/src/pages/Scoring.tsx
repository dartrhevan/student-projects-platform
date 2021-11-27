import React, {useState} from 'react';
import Table from "../components/util/Table";
import ViewableText from "../components/elements/ViewableText";
import Score from "../model/Score";
import {Query, QueryResult} from "material-table";
import {getScores} from "../api/scoring";
import {TextField, Link} from "@mui/material";
import {useParams} from "react-router-dom";

const tableColumns = [
    {
        title: 'Команда',
        field: "team",
        sorting: false,
        // filtering: false
    },
    {
        title: 'Ментор',
        field: "mentor",
        sorting: false,
        // filtering: false
    },
    {
        title: 'Презентация',
        // field: "presentation",
        sorting: false,
        // filtering: false
        render: (row: Score) => <Link target="_blank" href={row.presentation}>Презентация</Link>
    },
    {
        title: 'Оценка',
        field: "presentationScore",
        sorting: false,
        render: (row: Score) => <TextField type='number' sx={{padding: '2px', maxWidth: '25px'}}
                                           variant='standard' defaultValue={row.presentationScore}/>
    },
    {
        title: 'Доска',
        // field: "board",
        sorting: false,
        render: (row: Score) => <Link target="_blank" href={row.board}>Доска</Link>
    },
    {
        title: 'Оценка',
        field: "backlogScore",
        sorting: false,
        filtering: false,
        render: (row: Score) => <TextField type='number' sx={{padding: '2px', maxWidth: '25px'}}
                       defaultValue={row.backlogScore} variant='standard'/>
    },
    {
        title: 'Итог',
        // field: "project",
        sorting: false,
        render: (row: Score) => (row.backlogScore + row.presentationScore) / 2
    },
    {
        title: 'Комментарий',
        field: "comment",
        sorting: false,
        render: (row: Score) => <ViewableText editable label='Комментарий' maxWidth={200}>{row.comment}</ViewableText>
    }
];

export default function () {
    const {workspaceId} = useParams<{ workspaceId: string }>();
    const data = (query: Query<Score>) => new Promise<QueryResult<Score>>(res => getScores(workspaceId)
        .then(r => res({data: r.data, page: 0, totalCount: 1})));


    return (<Table paging={false} title='Оценивание' filtering={false} data={data} tableColumns={tableColumns}
                   tableActions={[]}/>);
}
