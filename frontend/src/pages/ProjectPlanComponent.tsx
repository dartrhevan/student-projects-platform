import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import {makeStyles, Typography} from "@material-ui/core";
import Sprint, {ProjectPlan} from "../model/Sprint";
import {getProjectPlan} from "../api/projectPlan";
import ListItemProps from "../props.common/ListItemProps";
import {Accordion, AccordionDetails, AccordionSummary, FormControlLabel, Paper, TextField} from "@mui/material";
import {DatePicker, LocalizationProvider} from "@mui/lab";


const useStyles = makeStyles(theme => ({
    paper: {
        padding: '10px 20px',
        width: '70vw',
        minHeight: '70vh',
        marginTop: '70px',
        '&:only-child': {
            width: '100%'
        }
    },
    title: {}
}));

interface ProjectParams {
    workspaceId: string,
    projectId: string
}

interface SprintProps extends ListItemProps {
    sprint: Sprint
    number: number
    editable?: boolean
}

const SprintComponent = ({sprint, number, editable = false}: SprintProps) => (
    <Accordion /*expanded={expanded === 'panel1'} onChange={handleChange('panel1')}*/>
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
            <Typography>Спринт {number}</Typography>
        </AccordionSummary>
        <AccordionDetails>
            <Typography paragraph variant='h6'>Цели спринта</Typography>
            <TextField disabled={!editable} multiline minRows={5} variant='outlined' fullWidth
                       defaultValue={sprint.goalsDescription}/>
            <FormControlLabel label='Начало спринта' control={
                <DatePicker
                    disableFuture
                    // label="Начало спринта"
                    openTo="day"
                    views={['year', 'month', 'day']}
                    value={sprint.startDate}
                    onChange={(newValue) => {
                        // setValue(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                />}
            />
            <FormControlLabel label='Окончание спринта' control={
                <DatePicker
                    disableFuture
                    // label="Начало спринта"
                    openTo="day"
                    views={['year', 'month', 'day']}
                    value={sprint.endDate}
                    onChange={(newValue) => {
                        // setValue(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                />}
            />
        </AccordionDetails>
    </Accordion>);

export default function ProjectPlanComponent() {

    const classes = useStyles();

    const {workspaceId, projectId} = useParams<ProjectParams>();
    // const [project, setProject] = useState(null as DetailedProject | null);

    const [projectPlan, setProjectPlan] = useState(null as ProjectPlan | null);

    const dispatch = useDispatch();

    useEffect(() => {
        getProjectPlan(projectId, workspaceId).then(r => setProjectPlan(r.payload));
    }, [projectId, workspaceId]);

    return (
        <Paper className={classes.paper}>
            <Typography align='center' paragraph variant='h4'>План проекта {}</Typography>
            <br/>

            <LocalizationProvider dateAdapter={AdapterDateFns}>
                {projectPlan?.plan.map((s, i) => <SprintComponent sprint={s} number={i} key={s.goalsDescription}/>)}
            </LocalizationProvider>
        </Paper>);
}
