import React, {useState} from 'react';
import Table from "../components/util/Table";
import ViewableText from "../components/elements/ViewableText";
import Score from "../model/Score";
import MaterialTable, {QueryResult} from "material-table";
import {getEvaluateTable, uploadScores} from "../api/scoring";
import {TextField, Link, Typography} from "@mui/material";
import {useParams} from "react-router-dom";
import {allNotEmpty, correctNumericInput, correctScoreInput} from "../utils/utils";
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import {useError, useSuccess} from "../hooks/logging";
import {getPresentation} from "../api/projectPlan";


export default function () {
    const {workspaceId} = useParams<{ workspaceId: string }>();
    const [sprintNumber, setSprintNumber] = useState(0);
    const data = () => new Promise<QueryResult<Score>>(res => getEvaluateTable(workspaceId, sprintNumber)
        .then(r => {
            if (sprintNumber === 0) setSprintNumber(parseInt(r.data.currentSprintNumber) + 1);
            res({data: r.data.scores, page: 0, totalCount: 1})
        }));


    const [scores, setScores] = useState([] as Score[]);

    const success = useSuccess();
    const error = useError();

    const actions = [
        {
            icon: () => <AssignmentTurnedInIcon fontSize='large'/>,
            onClick: () => {
                uploadScores(scores).then(r => success("Данные успешно отправлены")).catch(error);
            },
            tooltip: 'Сохранить оценки',
            isFreeAction: true,
        },
    ];

    function getScore(row: Score) {
        let score = scores.find(r => r.sprintId === row.sprintId);
        if (!score) {
            score = row;
            scores.push(row);
        }
        return score as Score;
    }

    function onChangePresScore(e: React.FormEvent<HTMLDivElement>, row: Score) {
        const input = correctScoreInput(e);
        getScore(row).presentationScore = input;
        row.presentationScore = input;
        setScores([...scores]);
    }

    function onChangeTracerScore(e: React.FormEvent<HTMLDivElement>, row: Score) {
        const input = correctScoreInput(e);
        getScore(row).trackerScore = input;
        row.trackerScore = input;
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
            render: (row: Score) => <>
                {
                    allNotEmpty(row.presentation) &&
                    <Link target="_blank"
                          onClick={() => getPresentation(`${row.projectTitle}_sprint_${sprintNumber}.pptx`,
                              row.presentation)}>Презентация</Link>
                    || <>Презентация не добавлена</>
                }
            </>
        },
        {
            title: 'Оценка',
            field: "presentationScore",
            sorting: false,
            render: (row: Score) => <TextField type='number' sx={{padding: '2px', maxWidth: '25px'}}
                                               onInput={e => onChangePresScore(e, row)}
                                               variant='standard' value={row.presentationScore}/>
        },
        {
            title: 'Доска',
            sorting: false,
            render: (row: Score) => <>
                {
                    allNotEmpty(row.trackerLink) &&
                    <Link target="_blank" href={row.trackerLink}>Доска</Link>
                    || <>Ссылка на доску не добавлена</>
                }
            </>
        },
        {
            title: 'Оценка',
            field: "trackerScore",
            sorting: false,
            filtering: false,
            render: (row: Score) => <TextField type='number' sx={{padding: '2px', maxWidth: '25px'}}
                                               onInput={e => onChangeTracerScore(e, row)}
                                               value={row.trackerScore} variant='standard'/>
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
                                                  maxWidth={200} multiline>{row.comment || ''}</ViewableText>
        }
    ];

    const tableRef = React.createRef<MaterialTable<Score>>();

    return (<Table paging={false} title='Оценивание' filtering={false} data={data} tableColumns={tableColumns}
                   tableActions={actions} subHeader='Чтобы сохранить изменения, нажмите:' tableRef={tableRef}
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
                               onInput={e => {
                                   setSprintNumber(correctNumericInput(e));
                                   (tableRef.current as any).onQueryChange();
                               }}
                               value={sprintNumber}/>
                       </>
                   )}/>);
}
