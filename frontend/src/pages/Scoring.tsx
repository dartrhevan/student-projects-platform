import React, {useState} from 'react';
import Table from "../components/util/Table";
import ViewableText from "../components/elements/ViewableText";
import Score from "../model/Score";
import {QueryResult} from "material-table";
import {getEvaluateTable, uploadScores} from "../api/scoring";
import {TextField, Link, FormControlLabel, Typography} from "@mui/material";
import {useParams} from "react-router-dom";
import {correctNumericInput} from "../utils/utils";
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import {useError, useSuccess} from "../hooks/logging";
import {ProjectRole} from "../model/Project";


export default function () {
    const {workspaceId} = useParams<{ workspaceId: string }>();
    const data = () => new Promise<QueryResult<Score>>(res => getEvaluateTable(workspaceId)
        .then(r => res({data: r.data, page: 0, totalCount: 1})));

    const [scores, setScores] = useState([] as Score[]);

    const success = useSuccess();
    const error = useError();

    const actions = [
        {
            icon: () => <AssignmentTurnedInIcon fontSize='large' />,
            onClick: () => {
                uploadScores(scores).then(r => success("Данные успешно отправлены")).catch(error);
            },
            tooltip: 'Сохранить оценки',
            isFreeAction: true,
        },
    ];

    function getScore(row: Score) {
        let score = scores.find(r => r.projectId === row.projectId);
        if (!score) {
            score = row;
            scores.push(row);
        }
        return score as Score;
    }

    function onChangePresScore(e: React.FormEvent<HTMLDivElement>, row: Score) {
        getScore(row).presentationScore = correctNumericInput(e);
        setScores([...scores]);
    }

    function onChangeTracerScore(e: React.FormEvent<HTMLDivElement>, row: Score) {
        getScore(row).trackerScore = correctNumericInput(e);
        setScores([...scores]);
    }

    function onChangeComment(comment: string, row: Score) {
        getScore(row).comment = comment;
        setScores([...scores]);
    }

    const tableColumns = [
        {
            title: 'Команда',
            field: "projectTitle",
            sorting: false
        },
        {
            title: 'Ментор',
            field: "mentorTeam",
            sorting: false,
        },
        {
            title: 'Презентация',
            sorting: false,
            render: (row: Score) => <Link target="_blank" href={row.presentation}>Презентация</Link>
        },
        {
            title: 'Оценка',
            field: "presentationScore",
            sorting: false,
            render: (row: Score) => <TextField type='number' sx={{padding: '2px', maxWidth: '25px'}}
                                               onInput={e => onChangePresScore(e, row)}
                                               variant='standard' defaultValue={row.presentationScore}/>
        },
        {
            title: 'Доска',
            sorting: false,
            render: (row: Score) => <Link target="_blank" href={row.board}>Доска</Link>
        },
        {
            title: 'Оценка',
            field: "trackerScore",
            sorting: false,
            filtering: false,
            render: (row: Score) => <TextField type='number' sx={{padding: '2px', maxWidth: '25px'}}
                                               onInput={e => onChangeTracerScore(e, row)}
                                               defaultValue={row.trackerScore} variant='standard'/>
        },
        {
            title: 'Итог',
            sorting: false,
            render: (row: Score) => (row.trackerScore + row.presentationScore) / 2
        },
        {
            title: 'Комментарий',
            field: "comment",
            sorting: false,
            render: (row: Score) => <ViewableText submit={s => onChangeComment(s, row)} editable label='Комментарий'
                                                  maxWidth={200}>{row.comment}</ViewableText>
        }
    ];

    return (<Table paging={false} title='Оценивание' filtering={false} data={data} tableColumns={tableColumns}
                   tableActions={actions} subHeader='Чтобы сохранить изменения, нажмите:'
                   buttons={(
                       <>
                           <Typography variant="body2" align='center' sx={{
                               display: "flex",
                               alignItems: "center",
                               margin: "0 15px"
                           }}>
                               Номер оцениваемого спринта:
                           </Typography>
                           <TextField
                                      sx={{width: '40px'}} type='number' variant='standard'
                                      onInput={correctNumericInput}
                                      onChange={e => {
                                          // setMaxParticipantsCount(parseInt(e.target.value))
                                          // project.maxParticipantsCount = parseInt(e.target.value);
                                      }}
                                      value={5}/>
                       </>
                   )}/>);
}
