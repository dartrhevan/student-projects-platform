import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {getProjectInfo} from "../api/projects";
import {DetailedProject, ProjectRole} from "../model/Project";
import {Button, makeStyles, Paper} from "@material-ui/core";
import {Divider, ListItemButton, TextField, Typography, ListItemText, ListSubheader, List} from "@mui/material";
import TagsPanel from "../components/util/TagsPanel";

import Centered from "../components/util/Centered";

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
    inner: {
        width: '100%',
        padding: '10px'
        // height: '100%',
    },
    descr: {
        margin: '30px 15px'
    },
    butGr: {
        margin: '10px',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'end',
        width: '100%',
    }
}));

interface ProjectParams {
    workspaceId: string,
    projectId: string
}

const RoleSpecificButton = ({project}: { project?: DetailedProject }) => {
    switch (project?.role) {
        case ProjectRole.OWNER:
            return (
                <>
                    <Button href={`/users?projectId=${project.id}&workspaceId=${project.workSpaceId}`}>
                        Найти участника
                    </Button>
                    <Button href={`/project_plan?projectId=${project.id}&workspaceId=${project.workSpaceId}`}>
                        Просмотр плана
                    </Button>
                </>);
        case ProjectRole.PARTICIPANT:
            return (
                <Button href={`/project_plan?projectId=${project.id}&workspaceId=${project.workSpaceId}`}>
                    Просмотр плана
                </Button>);
        case ProjectRole.MENTOR:
            return (
                <Button href={`/project_plan?projectId=${project.id}&workspaceId=${project.workSpaceId}`}>
                    Просмотр плана
                </Button>);
        case ProjectRole.STRANGER:
            return (<Button>Присоединиться</Button>);
        default:
            return <></>
    }
}

interface EditableFieldProps {
    field: (project?: DetailedProject) => string | undefined,
    props: object,
    prefix?: string
    project?: DetailedProject
    multiline?: boolean
    label: string
}

const EditableField = ({project, props, field, prefix = '', label, multiline = false}: EditableFieldProps) =>
    project?.role === ProjectRole.OWNER
        ? (
            <div style={{width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
                <Typography {...props}>{prefix}</Typography>
                <TextField label={label} sx={{margin: '10px'}} fullWidth={multiline} minRows={5}
                           variant={multiline ? 'outlined' : 'standard'} multiline={multiline}
                           defaultValue={field(project)}/>
            </div>)
        : <Typography {...props}>{prefix + field(project)}</Typography>;

export default function ProjectDetailedPage() {
    const {workspaceId, projectId} = useParams<ProjectParams>();
    const classes = useStyles();
    const [project, setProject] = useState(undefined as DetailedProject | undefined);

    useEffect(() => {
            getProjectInfo(workspaceId, projectId).then(r => setProject(r.payload)).catch(console.log)
        }, //TODO: catch
        [workspaceId, projectId]);
    console.log('render with')
    console.log(project)
    return (
        <Paper className={classes.paper}>
            <Centered additionalClasses={[classes.inner]}>
                <EditableField label='' props={{variant: 'h4'}} project={project} prefix={'Проект '}
                               field={p => `${p?.title}`}/>
                <div style={{width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'center', flexWrap: 'wrap' }}>
                    <TagsPanel onSetTag={() => {}} editable={project?.role === ProjectRole.OWNER} values={project?.tags}/>
                </div>
                <Divider flexItem/>
                <EditableField label='Описание' multiline props={{className: classes.descr}} project={project}
                               field={p => p?.fullDescription}/>
                <Divider flexItem/>
                <List
                    sx={{ width: '100%' }}
                    component="nav"
                    aria-labelledby="nested-list-subheader"
                    subheader={
                        <ListSubheader component="div" id="nested-list-subheader">
                            Список участников
                        </ListSubheader>
                    }>
                    {project?.participantLogins.map(p => (
                        <ListItemButton key={p}>
                            <ListItemText primary={p}/>
                        </ListItemButton>))}
                </List>
                <div className={classes.butGr}>
                    <RoleSpecificButton project={project}/>
                </div>
            </Centered>
        </Paper>
    );
}
