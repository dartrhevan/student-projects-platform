import React, {useEffect, useState} from 'react';
import {addProject, editProject, getProjectInfo} from "../api/projects";
import {DetailedProject, ProjectRole} from "../model/Project";
import {Button, makeStyles, Paper} from "@material-ui/core";
import queryString from 'query-string';
import {
    Divider,
    ListItemButton,
    TextField,
    Typography,
    ListItemText,
    ListSubheader,
    List, IconButton
} from "@mui/material";
import TagsPanel from "../components/util/TagsPanel";
import Centered from "../components/util/Centered";
import ErrorMessage from "../components/elements/ErrorMessage";
import {Clear} from "@material-ui/icons";

const useStyles = makeStyles(theme => ({
    paper: {
        padding: '10px 20px',
        width: '70%',
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
    workspaceId: string
    projectId?: string
    isNew?: string
}

const RoleSpecificButton = ({project, onSubmit, enabled, isNew}:
                                { isNew: boolean, enabled?: boolean, project?: DetailedProject, onSubmit: () => void }) => {
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
                    <Button variant='contained' disabled={!enabled} onClick={onSubmit}>
                        Подтвердить изменения
                    </Button>
                </>);
        case ProjectRole.PARTICIPANT:
        case ProjectRole.MENTOR:
            return (
                <Button href={`/project_plan?projectId=${project.id}&workspaceId=${project.workSpaceId}`}>
                    Просмотр плана
                </Button>);
        // case ProjectRole.MENTOR:
        //     return (
        //         <Button href={`/project_plan?projectId=${project.id}&workspaceId=${project.workSpaceId}`}>
        //             Просмотр плана
        //         </Button>);
        case ProjectRole.STRANGER:
            return (<Button>Присоединиться</Button>);
        default:
            return isNew ?
                <Button variant='contained' disabled={!enabled} onClick={onSubmit}>
                    Подтвердить изменения
                </Button>
                : <></>
    }
}

interface EditableFieldProps {
    field: (project?: DetailedProject) => string | undefined,
    props?: object,
    prefix?: string
    project?: DetailedProject
    multiline?: boolean
    left?: boolean
    label: string
    isNew?: boolean
    onChange: (s: string) => void
}

const EditableField = ({
                           project, props = {}, left = false, field, prefix = '', onChange,
                           label, multiline = false, isNew = false
                       }: EditableFieldProps) =>
    project?.role === ProjectRole.OWNER || isNew
        ? (
            <div style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: left ? 'start' : 'center'
            }}>
                <Typography {...props}>{prefix}</Typography>
                <TextField label={label} sx={{margin: '10px'}} fullWidth={multiline} minRows={5}
                           variant={multiline ? 'outlined' : 'standard'} multiline={multiline}
                           defaultValue={field(project)} onChange={e => onChange((e.target as HTMLInputElement).value)}/>
            </div>)
        : <Typography {...props}>{prefix + field(project)}</Typography>;

export default function ProjectDetailedPage() {
    // const params = useLocation<ProjectParams>().state;
    const params = queryString.parse(window.location.search);
    const workspaceId = params?.workspaceId, projectId = params?.projectId;
    const isNew = params?.isNew !== undefined;

    const classes = useStyles();
    const [project, setProject] = useState(isNew ? new DetailedProject(workspaceId as string) : undefined);

    useEffect(() => {
            if (!isNew) {
                getProjectInfo(projectId as string, workspaceId as string)
                    .then(r => setProject(r.data)).catch(console.log)
            }
        }, //TODO: catch
        [workspaceId, projectId, isNew]);

    console.log('render with')
    console.log(project)
    const allFilled = project?.isNewFilled;//allNotEmpty(username, password);

    function onSubmit() {
        if (isNew) {
            addProject(project as DetailedProject);
        } else {
            editProject(project as DetailedProject);
        }
    }

    function removeParticipant(participant: string) {
        const newProj = project?.removeParticipant(participant);
        setProject(newProj as unknown as DetailedProject)
    }

    return (
        <Paper className={classes.paper}>
            <Centered additionalClasses={[classes.inner]}>
                <EditableField isNew={isNew} label='' props={{variant: 'h4'}} project={project}
                               prefix={'Проект '} field={p => p?.title}
                               onChange={t => setProject((project as DetailedProject).withTitle(t))}/>
                <EditableField isNew={isNew} left label='Краткое описание'
                               project={project} field={p => p?.shortDescription}
                               onChange={t => setProject((project as DetailedProject).withShortDescription(t))}/>
                <div style={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    flexWrap: 'wrap'
                }}>
                    <TagsPanel onSetTag={tags => setProject(project?.withTags(tags))}
                               editable={project?.role === ProjectRole.OWNER} values={project?.tags}/>
                </div>
                <Divider flexItem/>
                <EditableField label='Описание' multiline
                               props={{className: classes.descr, sx: {width: '100%', padding: '15px'}}}
                               project={project} field={p => p?.fullDescription} isNew={isNew}
                               onChange={t => setProject((project as DetailedProject).withFullDescription(t))}/>
                <Divider flexItem/>
                <List
                    sx={{width: '100%'}}
                    component="nav"
                    aria-labelledby="nested-list-subheader"
                    subheader={
                        <ListSubheader component="div" id="nested-list-subheader">
                            Список участников
                        </ListSubheader>
                    }>
                    {project?.participants.map(p => (
                        <ListItemButton disableRipple sx={{cursor: 'default'}} key={p.login}>
                            <ListItemText primary={`${p.login} (${p.role})`}/>
                            {project?.role === ProjectRole.OWNER ?
                                <IconButton onClick={() => removeParticipant(p.login)}>
                                    <Clear/>
                                </IconButton> : <></>}
                        </ListItemButton>))}
                </List>
                <div className={classes.butGr} style={{justifyContent: 'start'}}>
                    <Typography sx={{margin: '10px'}}>Максимальное кол-во участников</Typography>
                    <TextField sx={{width: '40px'}} type='number' variant='standard'/>
                </div>
                <ErrorMessage message='*Не все обязательные поля заполнены' condition={!allFilled}/>
                <div className={classes.butGr}>
                    <RoleSpecificButton isNew={isNew} enabled={allFilled} onSubmit={onSubmit} project={project}/>
                </div>
            </Centered>
        </Paper>
    );
}
