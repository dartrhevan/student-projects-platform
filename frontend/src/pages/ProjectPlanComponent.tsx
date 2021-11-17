import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import {Button, makeStyles, Typography} from "@material-ui/core";
import Sprint, {ProjectPlan} from "../model/Sprint";
import {addSprint, dropPlan, getProjectPlan, updateSprint, uploadPresentation} from "../api/projectPlan";
import AddIcon from '@mui/icons-material/Add';
import ListItemProps from "../props.common/ListItemProps";
import FileUploadIcon from '@mui/icons-material/FileUpload';
import Dropzone from 'react-dropzone'
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Card,
    CardActionArea,
    CardContent, Dialog, DialogActions, DialogTitle, Link,
    Paper,
    TextField
} from "@mui/material";
import {getOnFieldChange, toDateString} from "../utils/utils";
import {ProjectRole} from "../model/Project";

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
        margin: '10px',
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
    role: ProjectRole
    onSprintUpdate: (s: Sprint, pr?: File) => void
}

const SprintComponent = ({sprint, number, role, onSprintUpdate}: SprintProps) => {
    const classes = useStyles();
    const editable = true;//role === ProjectRole.OWNER;

    const [presentationFile, setPresentationFile] = useState(undefined as File | undefined);
    const [goalsDescription, setGoalsDescription] = useState(sprint.goalsDescription);
    // const [scores, setScores] = useState(sprint.scores);
    const [startDate, setStartDate] = useState(sprint.startDate);
    const [endDate, setEndDate] = useState(sprint.endDate);

    // const [resultComment, setResultComment] = useState(sprint.comments);

    function onChangesSubmit() {
        sprint.goalsDescription = goalsDescription;
        // sprint.scores = scores;
        sprint.startDate = startDate;
        sprint.endDate = endDate;
        // sprint.comments = resultComment;
        onSprintUpdate(sprint, presentationFile);
    }

    // function onSetScore(index: number, value: string) {
    //     scores[index] = Number.parseInt(value);
    //     setScores(scores);
    // }

    return (
        <Accordion>
            <AccordionSummary
                expandIcon={<ArrowForwardIosSharpIcon sx={{fontSize: '0.9rem', transform: 'rotate(90deg)'}}/>}>
                <Typography>Спринт {number}</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Typography paragraph variant='h6'>Цели спринта</Typography>
                <TextField disabled={!editable} multiline minRows={5} variant='outlined' fullWidth
                           value={goalsDescription} onChange={getOnFieldChange(setGoalsDescription)}
                           className={classes.label}/>
                <div style={{
                    display: 'flex',
                    justifyContent: 'start',
                    // alignItems: 'vaseline',
                    flexDirection: 'row',
                    marginTop: '15px'
                }}>
                    <Typography className={classes.label}>Начало спринта</Typography>
                    <TextField disabled={!editable} type='date' defaultValue={toDateString(sprint.startDate)}
                               onChange={getOnFieldChange(s => setStartDate(new Date(s)))}/>
                    <Typography className={classes.label}>Окончание спринта</Typography>
                    <TextField disabled={!editable} type='date' defaultValue={toDateString(sprint.endDate)}
                               onChange={getOnFieldChange(s => setEndDate(new Date(s)))}/>
                </div>
                <div style={{margin: '15px 5px 0 5px'}}>
                    <Link href={sprint.presentationUrl} className={classes.label} variant='body1'
                          sx={{margin: '10px', fontSize: '18px'}}>
                        Презентация
                    </Link>
                    <Button className={classes.dropzone} variant='outlined'>
                        <Dropzone maxFiles={1} onDrop={(acceptedFiles: File[]) =>
                            setPresentationFile(acceptedFiles[acceptedFiles.length - 1])}>
                            {({getRootProps, getInputProps}) => (
                                <section {...getRootProps()} style={{width: '100%'}}>
                                    <input {...getInputProps()} />
                                    <FileUploadIcon fontSize='large'/>
                                    Для загрузки нажмите и перетащите сюда
                                    <FileUploadIcon fontSize='large'/>
                                </section>
                            )}
                        </Dropzone>
                    </Button>
                    <Typography className={classes.label}>
                        {presentationFile ? `Загружен файл: ${presentationFile.name}` : ''}
                    </Typography>
                </div>
                <br/>
                <Typography paragraph variant='h6'>Комментарии результатов</Typography>
                {sprint.comments.map((c, i) => (
                    <Card sx={{padding: '5px'}}>
                        <Typography variant='body2'>
                            {c.mentorName}
                        </Typography>
                        <Typography variant='body1'>
                            {c.comment}
                        </Typography>
                    </Card>))}
                <div style={{
                    display: 'flex',
                    justifyContent: 'end'
                }} className={classes.label}>
                    {editable ?
                        <Button onClick={onChangesSubmit}>Подтвердить изменения</Button> : <></>}
                    <Button>Удалить</Button>
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

    const [showConfirmDialog, setShowConfirmDialog] = useState(false);

    function onDropPlan() {
        dropPlan(workspaceId, projectId).then(r => {
            setShowConfirmDialog(false);
            window.location.reload();
        }).catch(console.log);
    }

    return (
        <Paper className={classes.paper}>
            <Typography align='center' paragraph variant='h4'>План проекта {}</Typography>
            <br/>
            {projectPlan?.plan.map((s, i) =>
                <SprintComponent role={projectPlan.role} sprint={s} number={i}
                                 key={s.goalsDescription} onSprintUpdate={onSprintUpdate}/>)}
            <Card sx={{margin: '30px 0'}} onClick={addNewSprint}>
                <CardActionArea>
                    <CardContent sx={{padding: '5px'}} className={classes.card}>
                        <AddIcon fontSize='large' color='action'/>
                    </CardContent>
                </CardActionArea>
            </Card>
            <div style={{
                display: 'flex',
                justifyContent: 'end',
                flexDirection: 'row',
                marginTop: '15px'
            }}>
                <Button variant='outlined'>Сбросить график</Button>
            </div>
            <Dialog open={showConfirmDialog} onClose={() => setShowConfirmDialog(false)}>
                <DialogTitle>
                    Вы уверены?
                </DialogTitle>
                <DialogActions>
                    <Button variant='outlined' onClick={onDropPlan}>Да</Button>
                    <Button variant='outlined' onClick={() => setShowConfirmDialog(false)}>Нет</Button>
                </DialogActions>
            </Dialog>
        </Paper>);
}
