import React, {useEffect, useState} from 'react';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import {Button, makeStyles, Typography} from "@material-ui/core";
import Sprint, {ProjectPlan} from "../model/Sprint";
import {addSprint, getProjectPlan, removeSprint, updateSprint, uploadPresentation} from "../api/projectPlan";
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
import {ElementsStyle} from "../theme";
import {useError, useSuccess} from "../hooks/logging";
import queryString from "query-string";
import GenericResponse from "../model/dto/GenericResponse";

const useStyles = makeStyles(theme => ({
    root: ElementsStyle,
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
        // '&:only-child': {
        //     width: '100%'
        // },
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
    onSprintRemove: (s: Sprint) => void
}

const SprintComponent = ({sprint, number, role, onSprintUpdate, onSprintRemove}: SprintProps) => {
    const classes = useStyles();
    const editable = true;

    const [presentationFile, setPresentationFile] = useState(undefined as File | undefined);
    const [goalsDescription, setGoalsDescription] = useState(sprint.goals);
    const [startDate, setStartDate] = useState(sprint.startDate);
    const [endDate, setEndDate] = useState(sprint.endDate);

    function onChangesSubmit() {
        sprint.goals = goalsDescription;
        sprint.startDate = startDate;
        sprint.endDate = endDate;
        onSprintUpdate(sprint, presentationFile);
    }

    const [showConfirmDialog, setShowConfirmDialog] = useState(false);

    function onDelete() {
        onSprintRemove(sprint);
    }

    return (<>
        <Dialog open={showConfirmDialog} onClose={() => setShowConfirmDialog(false)}>
            <DialogTitle>
                Вы уверены?
            </DialogTitle>
            <DialogActions>
                <Button color='inherit' variant='outlined' onClick={onDelete}>Да</Button>
                <Button color='inherit' variant='outlined' onClick={() => setShowConfirmDialog(false)}>Нет</Button>
            </DialogActions>
        </Dialog>
        <Accordion elevation={8} sx={ElementsStyle}>
            {/*<div style={{*/}
            {/*    display: 'flex',*/}
            {/*    justifyContent: 'end',*/}
            {/*    flexDirection: 'row',*/}
            {/*    marginTop: '15px'*/}
            {/*}}>*/}
            {/*    <Button color='inherit' variant='outlined'>Сбросить график</Button>*/}
            {/*</div>*/}
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
                    flexDirection: 'row',
                    marginTop: '15px'
                }}>
                    <Typography className={classes.label}>Начало спринта</Typography>
                    <TextField disabled={!editable} type='date' defaultValue={sprint.startDate}
                               onChange={getOnFieldChange(setStartDate)}/>
                    <Typography className={classes.label}>Окончание спринта</Typography>
                    <TextField disabled={!editable} type='date' defaultValue={sprint.endDate}
                               onChange={getOnFieldChange(setEndDate)}/>
                </div>
                <div style={{margin: '15px 5px 0 5px'}}>
                    <Link href={sprint.presentationUrl} className={classes.label} variant='body1'
                          sx={{margin: '10px', fontSize: '18px'}}>
                        Презентация
                    </Link>
                    <Button className={classes.dropzone} variant='outlined' color='inherit'>
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
                    <Card sx={{padding: '5px', ...ElementsStyle}}>
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
                        <Button color='inherit' onClick={onChangesSubmit}>Подтвердить изменения</Button> : <></>}
                    <Button color='inherit' onClick={() => setShowConfirmDialog(true)}>Удалить</Button>
                </div>
            </AccordionDetails>
        </Accordion>
    </>);
};

export default function ProjectPlanComponent() {
    const classes = useStyles();

    const params = queryString.parse(window.location.search);
    const projectId = params?.projectId as string;

    const [projectPlan, setProjectPlan] = useState(undefined as ProjectPlan | undefined);

    const error = useError();
    const success = useSuccess();

    useEffect(() => {
        getProjectPlan(projectId)
            .then(r => setProjectPlan(r.data))
            .catch(error);
    }, []);

    function addNewSprint() {
        const sprint = new Sprint();
        addSprint(projectId, projectPlan?.plan.length.toString() as string, sprint)
            .then((r: GenericResponse<string>) => {
                sprint.id = r.data;
                projectPlan?.plan.push(sprint);
                setProjectPlan(new ProjectPlan(projectPlan?.plan as Sprint[], projectPlan?.projectTitle as string));//TODO: rewrite for null-safe
                success("Изменения успешно применены");
            }).catch(error);
    }

    function onSprintRemove(s: Sprint) {
        removeSprint(s.id).then(r => {
            success("Изменения успешно применены");
            setProjectPlan(new ProjectPlan(projectPlan?.plan.filter(sp => sp.id !== s.id) as Sprint[], projectPlan?.projectTitle as string));//TODO: rewrite for null-safe
        }).catch(error);
    }

    function onSprintUpdate(s: Sprint, pr?: File) {
        updateSprint(s).then(() => {
            (projectPlan as ProjectPlan).plan = projectPlan?.plan.map(sp => s.id === sp.id ? s : sp) as Sprint[];
            setProjectPlan(projectPlan);
        }).then(r => success("Изменения успешно применены")).catch(error);
    }

    return (
        <Paper className={classes.paper} sx={{minHeight: '100px', ...ElementsStyle}} color='inherit' elevation={8}>
            <Typography align='center' paragraph variant='h4'>План проекта {projectPlan?.projectTitle}</Typography>
            <br/>
            {projectPlan?.plan.map((s, i) =>
                <SprintComponent role={projectPlan.role} sprint={s} number={i} onSprintRemove={onSprintRemove}
                                 key={s.id} onSprintUpdate={onSprintUpdate}/>)}
            <Card sx={{margin: '30px 0', ...ElementsStyle}} onClick={addNewSprint} elevation={8}>
                <CardActionArea>
                    <CardContent sx={{padding: '5px'}} className={classes.card}>
                        <AddIcon fontSize='large' color='action'/>
                    </CardContent>
                </CardActionArea>
            </Card>
        </Paper>);
}
