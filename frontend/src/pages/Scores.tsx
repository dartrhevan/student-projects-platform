import React, {useEffect, useState} from 'react';

import Table from '@mui/material/Table';
import {useParams} from "react-router-dom";
import {getScores} from "../api/workspaces";
import ScoreDTO from "../model/dto/ScoreDTO";
import {Paper, TableCell, TableContainer, TableHead, TableRow, Typography} from '@mui/material';
import TableBody from '@material-ui/core/TableBody/TableBody';

// const basicTableColumns = [
//     {
//         title: 'Название проекта',
//         field: "projectTitle",
//         // filtering: false,
//         // render: (row: Row) =>
//         //     <Checkbox sx={{height: '40px', width: '40px'}} icon={<></>} checked={row.new} checkedIcon={<Dot/>}/>
//     },
//     {
//         title: 'Ментор',
//         field: "mentor",
//         sorting: true,
//     }
// ];

export default function Scores() {
    const {workspaceId} = useParams<{ workspaceId: string }>();
    const [data, setData] = useState([] as ScoreDTO[]);

    // const [tableColumns, setTablesColumns] = useState(basicTableColumns as object[]);

    useEffect(() => {
        getScores(workspaceId).then(r => {
            // tableColumns = [...basicTableColumns];
            // tableColumns.push(r.payload[0].scores.map((s, i) =>
            // if (s.comment)
            //     baseColumn.push({
            //
            //     })
            // [{title: `Спринт ${i}`, render: (r: ScoreDTO) => r.scores[i]}]
            // ));
            // tableColumns.push({
            //     title: 'Финальная оценка',
            // render: (r: ScoreDTO) => r.scores.reduce((acc, val) => val + acc) / r.scores.length
            // });
            setData(r.payload);
            // setTablesColumns([...tableColumns])
            // return {data: r.payload, page: 0, totalCount: 1};
        });
    }, [workspaceId]);

    const sprintsCount = Array.from({
        length: data.map(d => d.scores.length)
            .reduce((max, cur) => Math.max(max, cur), Number.MIN_VALUE)
    }, (value, key) => key); //an array with length of a maximum sprints count

    return (<>
        <Typography paragraph variant='h3'>Оценки</Typography>
        <TableContainer component={Paper}>
            <Table sx={{minWidth: 650}} size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        <TableCell>Проект</TableCell>
                        <TableCell>Ментор</TableCell>
                        {sprintsCount.map((l, i) => <TableCell align="right">{`Спринт ${i}`}</TableCell>)}
                        <TableCell>Финальная оценка</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map(row => {
                        const finalValue = row.scores.reduce((acc, val) => val + acc) // row.scores.length;
                        return (
                            <TableRow
                                key={row.projectTitle}
                                sx={{'&:last-child td, &:last-child th': {border: 0}}}>
                                <TableCell component="th" scope="row">
                                    {row.projectTitle}
                                </TableCell>
                                <TableCell align="right">{row.mentor}</TableCell>
                                {sprintsCount.map((l, i) => <TableCell
                                    align="right">{i < row.scores.length ? row.scores[i] : ''}</TableCell>)}
                                <TableCell align="right">{finalValue}</TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    </>);
    //(<Table title='Оценки' paging={false} filtering={false} data={data} tableColumns={tableColumns}/>);
}
