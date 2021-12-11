import React, {useEffect, useState} from 'react';

import Table from '@mui/material/Table';
import {useParams} from "react-router-dom";
import ScoreDTO from "../model/dto/ScoreDTO";
import {Fade, Paper, TableCell, TableContainer, TableHead, TableRow, Typography} from '@mui/material';
import TableBody from '@material-ui/core/TableBody/TableBody';
import {makeStyles} from "@material-ui/core";
import {getScores} from "../api/scoring";
import {ElementsStyle} from "../theme";

const useStyles = makeStyles(theme => ({
    cell: {
        margin: '10px',
        padding: '10px',
        ...ElementsStyle
    }
}));

export default function Scores() {
    const {workspaceId} = useParams<{ workspaceId: string }>();
    const [data, setData] = useState([] as ScoreDTO[]);
    const [sprintsCount, setSprintsCount] = useState(5);

    const classes = useStyles();

    useEffect(() => {
        getScores(workspaceId).then(r => {
            setData(r.projects);
            setSprintsCount(r.sprintsCount);
        });
    }, [workspaceId]);

    const sprintsNumbers = Array.from({
        length: sprintsCount
    }, (value, key) => key); //an array with length of a maximum sprints count

    return (
        <Fade in={true}>
            <TableContainer component={Paper} style={{width: '90%', minHeight: '80%', ...ElementsStyle}}>
                <Table sx={{minWidth: 650}} size="small" aria-label="a dense table">
                    <TableHead>
                        <Typography variant="h6" sx={{margin: '15px 24px', ...ElementsStyle}} gutterBottom>
                            Оценки
                        </Typography>
                        <TableRow>
                            <TableCell className={classes.cell}>Проект</TableCell>
                            <TableCell className={classes.cell}>Ментор</TableCell>
                            {sprintsNumbers.map((l, i) => <TableCell align="right">{`Спринт ${i + 1}`}</TableCell>)}
                            <TableCell className={classes.cell}>Финальная оценка</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.length > 0 ? data.map(row => {
                            const finalValue = row.scores.reduce((acc, val) => val + acc, 0) // row.scores.length;
                            return (
                                <TableRow
                                    key={row.projectId}
                                    sx={{'&:last-child td, &:last-child th': {border: 0}}}>
                                    <TableCell className={classes.cell} component="th" scope="row">
                                        {row.projectTitle}
                                    </TableCell>
                                    <TableCell className={classes.cell} align="right">{row.mentor}</TableCell>
                                    {sprintsNumbers.map((l, i) => <TableCell
                                        align="right">{i < row.scores.length ? row.scores[i] : ''}</TableCell>)}
                                    <TableCell align="right">{finalValue}</TableCell>
                                </TableRow>
                            );
                        }) : <Typography align='center' sx={{marginLeft: '5%', ...ElementsStyle}}>В данном рабочем
                            пространстве не создано ни одного проекта</Typography>}
                    </TableBody>
                </Table>
            </TableContainer>
        </Fade>);
}
