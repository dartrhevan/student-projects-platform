import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import {Button, makeStyles, Typography} from "@material-ui/core";
import Sprint, {ProjectPlan} from "../model/Sprint";
import {addSprint, getProjectPlan, updateSprint, uploadPresentation} from "../api/projectPlan";
import AddIcon from '@mui/icons-material/Add';
import ListItemProps from "../props.common/ListItemProps";
import FileUploadIcon from '@mui/icons-material/FileUpload';
import Dropzone from 'react-dropzone'
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
import {toDateString} from "../utils/utils";

const useStyles = makeStyles(theme => ({
    score: {
        width: '60px',
        margin: '0 10px',
    },
    scores: {
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'row',
        alignItems: 'baseline'
    },
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
    },
    dropzone: {
        height: '60px',
        width: '100%'
    },
    criterion: {
        fontSize: '18px',
        margin: '0 10px'
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
    const editable = true;//role === ProjectRole.OWNER;

    const [presentationFile, setPresentationFile] = useState(undefined as File | undefined);
    const [goalsDescription, setGoalsDescription] = useState(sprint.goalsDescription);
    const [scores, setScores] = useState(sprint.scores);
    const [startDate, setStartDate] = useState(sprint.startDate);
    const [endDate, setEndDate] = useState(sprint.endDate);
    const [resultComment, setResultComment] = useState(sprint.resultComment);

    function onChangesSubmit() {
        sprint.goalsDescription = goalsDescription;
        sprint.scores = scores;
        sprint.startDate = startDate;
        sprint.endDate = endDate;
        sprint.resultComment = resultComment;
        onSprintUpdate(sprint, presentationFile);
    }

    function onSetScore(index: number, value: string) {
        scores[index] = Number.parseInt(value);
        setScores(scores);
    }

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
                <TextField disabled={!editable} type='date' defaultValue={toDateString(sprint.endDate)}/>
                <br/>
                <Typography className={classes.label}>Окончание спринта</Typography>
                <TextField disabled={!editable} type='date' defaultValue={toDateString(sprint.endDate)}/>
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

    const [projectPlan, setProjectPlan] = useState(null as ProjectPlan | null);

    useEffect(() => {
        getProjectPlan(projectId, workspaceId).then(r => setProjectPlan(r.data));
    }, [projectId, workspaceId]);

    function addNewSprint() {
        addSprint(projectId, workspaceId)
            .then(r => {
                projectPlan?.plan.push(new Sprint(r.data));
                setProjectPlan(new ProjectPlan(projectPlan?.plan as Sprint[], projectPlan?.projectTitle as string));//TODO: rewrite for null-safe
            });
    }

    function onSprintUpdate(s: Sprint, pr?: File) {
        let promise: Promise<any>
        if (pr)
            promise = uploadPresentation(workspaceId, projectId, s.id, pr as File)
                .then(r => {
                    s.presentationUrl = r.data;
                    return updateSprint(workspaceId, projectId, s);
                })
        else
            promise = updateSprint(workspaceId, projectId, s);
        promise.then(() => {
            (projectPlan as ProjectPlan).plan = projectPlan?.plan.map(sp => s.id === sp.id ? s : sp) as Sprint[];
            setProjectPlan(projectPlan);
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
