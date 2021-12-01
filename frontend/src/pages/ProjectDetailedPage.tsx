import React, {useEffect, useState} from 'react';
import {addProject, deleteProject, editProject, getProjectInfo} from "../api/projects";
import {DetailedProject, ProjectRole, ProjectStatus} from "../model/Project";
import {Button, makeStyles, Paper} from "@material-ui/core";
import queryString from 'query-string';
import {
    Divider,
    IconButton, InputLabel, Link,
    List,
    ListItemButton,
    ListItemText,
    ListSubheader, MenuItem, Select,
    TextField,
    Typography
} from "@mui/material";
import TagsPanel from "../components/util/TagsPanel";
import Centered from "../components/util/Centered";
import ErrorMessage from "../components/elements/ErrorMessage";
import {Clear} from "@material-ui/icons";
import {useError, useSuccess, useWarn} from "../hooks/logging";
import {useSelector} from "react-redux";
import getTagsRef, {getTagsReferenceMap} from "../hooks/getTagsRef";
import ConfirmationDialog from "../components/util/ConfirmationDialog";
import THEME, {ElementsStyle} from "../theme";

const useStyles = makeStyles(theme => ({
    paper: {
        padding: '10px 20px',
        width: '70%',
        minHeight: '70vh',
        marginTop: '70px',
        // '&:only-child': {
        //     width: '100%'
        // }
        ...ElementsStyle
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

// interface ProjectParams {
//     workspaceId: string
//     projectId?: string
//     isNew?: string
// }

const RoleSpecificButton = ({project, onSubmit, enabled, isNew}:
                                { isNew: boolean, enabled?: boolean, project?: DetailedProject, onSubmit: () => void }) => {

    const [deleteDialog, setDeleteDialog] = useState(false);
    const error = useError();

    function onDelete() {
        deleteProject(project?.id as string)
            .then(r => window.location.href = '/workspaces')
            .catch(error);

    }

    switch (project?.projectRole) {
        case ProjectRole.OWNER:
            return (
                <>
                    <ConfirmationDialog open={deleteDialog} onClose={() => setDeleteDialog(false)}
                                        label="удалить проект" onSubmit={onDelete}/>

                    {!isNew ? (
                        <>
                            <Button color='inherit'
                                    href={`/users?projectId=${project.id}&workspaceId=${project.workspaceId}`}>
                                Найти участника
                            </Button>
                            <Button color='inherit'
                                    href={`/project_plan?projectId=${project.id}&workspaceId=${project.workspaceId}`}>
                                Просмотр плана
                            </Button>
                            <Button color='inherit' onClick={() => setDeleteDialog(true)}>
                                Удалить
                            </Button>
                        </>) : (<></>)}
                    <Button color='inherit' variant='contained' disabled={!enabled} onClick={onSubmit}>
                        Подтвердить изменения
                    </Button>
                </>);
        case ProjectRole.PARTICIPANT:
        case ProjectRole.MENTOR:
            return (
                <Button color='inherit'
                        href={`/project_plan?projectId=${project.id}&workspaceId=${project.workspaceId}`}>
                    Просмотр плана
                </Button>);
        case ProjectRole.STRANGER:
            return (<Button color='inherit'>Присоединиться</Button>);
        default:
            return isNew ?
                <Button variant='contained' color='inherit' disabled={!enabled} onClick={onSubmit}>
                    Подтвердить изменения
                </Button>
                : <></>
    }
}

interface EditableFieldProps {
    field: (project?: DetailedProject) => string | undefined,
    props?: object,
    inputProps?: object,
    prefix?: string
    project?: DetailedProject
    multiline?: boolean
    left?: boolean
    label: string
    isNew?: boolean
    onChange: (s: string) => void
    // inputComponent?: (props: EditableFieldProps) => JSX.Element
}

const EditableField = ({
                           project, props = {}, left = false, field, prefix = '', onChange,
                           label, multiline = false, isNew = false, inputProps
                       }: EditableFieldProps) =>
    project?.projectRole === ProjectRole.OWNER || isNew
        ? (<div style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: left ? 'start' : 'center'
        }}>
            {prefix ? <Typography {...props}>{prefix}</Typography> : <></>}
            <TextField label={label} sx={{margin: '10px'}} fullWidth={multiline} minRows={5}
                       variant={multiline ? 'outlined' : 'standard'} multiline={multiline}
                       onChange={e => onChange((e.target as HTMLInputElement).value)}
                       value={field(project)} {...inputProps}/>
        </div>)
        : <Typography {...props}>{prefix + field(project)}</Typography>;

export default function ProjectDetailedPage() {
    // const params = useLocation<ProjectParams>().state;
    const params = queryString.parse(window.location.search);
    const workspaceId = params?.workspaceId, projectId = params?.projectId;
    const isNew = params?.isNew !== undefined;
    const classes = useStyles();
    const [project, setProject] = useState(new DetailedProject(workspaceId as string));

    const tagsReference = useSelector(getTagsReferenceMap);
    useEffect(() => {
            if (!isNew) {
                getProjectInfo(projectId as string)
                    .then(r => {
                        const proj: DetailedProject = DetailedProject.fromObject(r.data);
                        proj.tags = r.data.tags.map(t => tagsReference[t.toString()]).filter(t => t !== undefined);
                        setProject(proj);
                    }).catch(console.log)
            }
        }, //TODO: catch
        [workspaceId, projectId, isNew, tagsReference]);

    console.log('render with')
    console.log(project)
    const allFilled = !isNew || project?.isNewFilled;//allNotEmpty(username, password);

    const success = useSuccess();
    const warn = useWarn();
    const error = useError();

    function onSubmit() {
        (isNew ? addProject(project as DetailedProject) : editProject(project as DetailedProject))
            .then(r => success('Success'))
            .catch(r => error(`Error ${r}`));
    }

    function removeParticipant(participant: string) {
        const newProj = project?.removeParticipant(participant);
        setProject(newProj as unknown as DetailedProject);
    }

    return (
        <Paper className={classes.paper}>
            <Centered additionalClasses={[classes.inner]}>
                <EditableField isNew={isNew} label='(название)' props={{variant: 'h4'}} project={project}
                               prefix={'Проект '} field={p => p?.title} inputProps={{required: true}}
                               onChange={t => setProject((project as DetailedProject).withTitle(t))}/>
                <EditableField isNew={isNew} left label='Краткое описание' inputProps={{required: true}}
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
                               editable={project?.projectRole === ProjectRole.OWNER} values={project?.tags}/>
                </div>
                <Divider flexItem/>
                <EditableField label='Описание' multiline inputProps={{required: true}}
                               props={{className: classes.descr, sx: {width: '100%', padding: '15px'}}}
                               project={project} field={p => p?.fullDescription} isNew={isNew}
                               onChange={t => setProject((project as DetailedProject).withFullDescription(t))}/>
                <Divider flexItem/>
                {project?.projectRole !== ProjectRole.STRANGER ?
                    <EditableField label='Ссылка на трекер' field={p => p?.trackerUrl} project={project}
                                   inputProps={{variant: 'outlined', fullWidth: true}}
                                   props={{
                                       sx: {width: '100%', padding: '10px 5px'},
                                       component(p: { children: string, className: string }) {
                                           return <Link className={p.className} href={p.children}>Ссылка на
                                               трекер</Link>;
                                       }
                                   }}
                                   onChange={t => setProject((project as DetailedProject).withTrackerUrl(t))}/> : <></>}

                <List
                    sx={{width: '100%'}}
                    component="nav"
                    aria-labelledby="nested-list-subheader"
                    subheader={
                        <ListSubheader component="div" sx={{
                            background: THEME.ELEMENTS_COLOUR,
                        }} color='inherit'>
                            Список участников
                        </ListSubheader>
                    }>
                    {project?.participants.map(p => (
                        <ListItemButton disableRipple sx={{cursor: 'default'}} key={p.username}>
                            <ListItemText primary={`${p.name} (${p.role})`}/>
                            {project?.projectRole === ProjectRole.OWNER ?
                                <IconButton onClick={() => removeParticipant(p.username)}>
                                    <Clear/>
                                </IconButton> : <></>}
                        </ListItemButton>))}
                </List>
                <div className={classes.butGr} style={{justifyContent: 'start'}}>
                    <Typography sx={{margin: '10px'}} color='inherit'>Максимальное кол-во участников</Typography>
                    <TextField sx={{width: '40px'}} type='number' variant='standard'/>
                </div>

                {!isNew ? (<div className={classes.butGr} style={{justifyContent: 'start'}}>
                    <Typography sx={{margin: '10px'}}>Статус проекта</Typography>
                    <Select
                        value={project?.status}
                        onChange={s => setProject(project?.withStatus(s.target.value as ProjectStatus))}>
                        <MenuItem color='inherit' value={ProjectStatus.NEW}>Новый</MenuItem>
                        <MenuItem color='inherit' value={ProjectStatus.IN_PROGRESS}>В разработке</MenuItem>
                        <MenuItem color='inherit' value={ProjectStatus.ENDED}>Завершён</MenuItem>
                        <MenuItem color='inherit' value={ProjectStatus.CANCELLED}>Отклонён</MenuItem>
                        <MenuItem color='inherit' value={ProjectStatus.MODIFYING}>На доработке</MenuItem>
                    </Select>
                </div>) : (<></>)}
                <ErrorMessage message='*Не все обязательные поля заполнены' condition={!allFilled}/>
                <div className={classes.butGr}>
                    <RoleSpecificButton isNew={isNew} enabled={allFilled} onSubmit={onSubmit} project={project}/>
                </div>
            </Centered>
        </Paper>
    );
}
