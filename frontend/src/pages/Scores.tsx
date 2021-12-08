import React, {useEffect, useState} from 'react';

import Table from '@mui/material/Table';
import {useParams} from "react-router-dom";
import ScoreDTO from "../model/dto/ScoreDTO";
import {Paper, TableCell, TableContainer, TableHead, TableRow, Typography} from '@mui/material';
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

    const classes = useStyles();

    useEffect(() => {
        getScores(workspaceId).then(r => setData(r.data));
    }, [workspaceId]);

    const sprintsCount = Array.from({
        length: data.map(d => d.scores.length)
            .reduce((max, cur) => Math.max(max, cur), Number.MIN_VALUE)
    }, (value, key) => key); //an array with length of a maximum sprints count

    return (<TableContainer component={Paper} style={{width: '90%', minHeight: '80%', ...ElementsStyle}}>
        <Table sx={{minWidth: 650}} size="small" aria-label="a dense table">
            <TableHead>
                <Typography variant="h6" sx={{margin: '15px 24px', ...ElementsStyle}} gutterBottom>
                    Оценки
                </Typography>
                <TableRow>
                    <TableCell className={classes.cell}>Проект</TableCell>
                    <TableCell className={classes.cell}>Ментор</TableCell>
                    {sprintsCount.map((l, i) => <TableCell align="right">{`Спринт ${i}`}</TableCell>)}
                    <TableCell className={classes.cell}>Финальная оценка</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {data.map(row => {
                    const finalValue = row.scores.reduce((acc, val) => val + acc) // row.scores.length;
                    return (
                        <TableRow
                            key={row.projectTitle}
                            sx={{'&:last-child td, &:last-child th': {border: 0}}}>
                            <TableCell className={classes.cell} component="th" scope="row">
                                {row.projectTitle}
                            </TableCell>
                            <TableCell className={classes.cell} align="right">{row.mentor}</TableCell>
                            {sprintsCount.map((l, i) => <TableCell
                                align="right">{i < row.scores.length ? row.scores[i] : ''}</TableCell>)}
                            <TableCell align="right">{finalValue}</TableCell>
                        </TableRow>
                    );
                })}
            </TableBody>
        </Table>
    </TableContainer>);
}
