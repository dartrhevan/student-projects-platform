import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import {makeStyles, Typography} from "@material-ui/core";
import Sprint, {ProjectPlan} from "../model/Sprint";
import {addSprint, getProjectPlan} from "../api/projectPlan";
import AddIcon from '@mui/icons-material/Add';
import ListItemProps from "../props.common/ListItemProps";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Button,
    Card, CardActionArea, CardContent,
    FormControlLabel,
    Paper,
    TextField
} from "@mui/material";

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
    label: {
        margin: '10px'
    },
    card: {
        display: "flex",
        justifyContent: 'center',
        alignItems: 'center'
    }
}));

interface ProjectParams {
    workspaceId: string,
    projectId: string
}

interface SprintProps extends ListItemProps {
    sprint: Sprint
    number: number
    editable: boolean
}

const SprintComponent = ({sprint, number, editable}: SprintProps) => {
    const classes = useStyles();

    return (
        <Accordion>
            <AccordionSummary
                expandIcon={<ArrowForwardIosSharpIcon sx={{fontSize: '0.9rem', transform: 'rotate(90deg)'}}/>}>
                <Typography>Спринт {number}</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Typography paragraph variant='h6'>Цели спринта</Typography>
                <TextField disabled={!editable} multiline minRows={5} variant='outlined' fullWidth
                           defaultValue={sprint.goalsDescription} className={classes.label}/>
                <Typography className={classes.label}>Начало спринта</Typography>
                <TextField disabled={!editable} type='date' defaultValue={sprint.endDate.toISOString().slice(0, 10)}/>
                <br/>
                <Typography className={classes.label}>Окончание спринта</Typography>
                <TextField disabled={!editable} type='date' defaultValue={sprint.endDate.toISOString().slice(0, 10)}/>
                <div className={classes.label}>
                    <Button>Удалить</Button>
                    {editable ? <Button>Подтвердить изменения</Button> : <></>}
                </div>
            </AccordionDetails>
        </Accordion>);
};

export default function ProjectPlanComponent() {

    const classes = useStyles();

    const {workspaceId, projectId} = useParams<ProjectParams>();
    // const [project, setProject] = useState(null as DetailedProject | null);

    const [projectPlan, setProjectPlan] = useState(null as ProjectPlan | null);

    const dispatch = useDispatch();

    useEffect(() => {
        getProjectPlan(projectId, workspaceId).then(r => setProjectPlan(r.payload));
    }, [projectId, workspaceId]);

    function addNewSprint() {
        const sprint = new Sprint();
        addSprint(projectId, workspaceId, sprint)
            .then(r => {
                projectPlan?.plan.push(sprint);
                setProjectPlan(new ProjectPlan(projectPlan?.projectTitle as string,
                    projectPlan?.plan as Sprint[])); //TODO: rewrite for null-safe
            });
    }

    return (
        <Paper className={classes.paper}>
            <Typography align='center' paragraph variant='h4'>План проекта {}</Typography>
            <br/>
            {projectPlan?.plan.map((s, i) => <SprintComponent editable={projectPlan.owner} sprint={s} number={i} key={s.goalsDescription}/>)}
            <Card sx={{margin: '30px 0'}} onClick={addNewSprint}>
                <CardActionArea>
                    <CardContent sx={{padding: '5px'}} className={classes.card}>
                        <AddIcon fontSize='large' color='action'/>
                    </CardContent>
                </CardActionArea>
            </Card>
        </Paper>);
}
