import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import BadgePage from "../components/elements/BadgePage";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {initPaging} from "../store/actions/paging/setPagingData";
import {getProjectsForWorkspace} from "../api/projects";
import ProjectQuery from "../model/dto/ProjectQuery";
import Pageable from "../model/Pageable";
import Project from "../model/Project";
import getPaging from "../hooks/getPaging";
import CheckBoxInfo from "../model/CheckBoxInfo";
import {Button, makeStyles} from "@material-ui/core";
import Centered from "../components/util/Centered";
import SettingsIcon from '@mui/icons-material/Settings';
import {Dialog, DialogActions, DialogContent, DialogTitle, IconButton, TextField, Tooltip} from "@mui/material";
import WorkspaceSettings from "../components/elements/WorkspaceSettings";
import {openDialog} from "../store/actions/dialog/dialog";
import Invite from "../model/dto/Invite";
import {deleteWorkspace, getInviteForWorkspace} from "../api/workspaces";
import {WorkspaceAssociation} from "../model/dto/ProjectsResponse";
import getUsername from "../hooks/getUsername";
import Tag from "../model/Tag";
import {useError} from "../hooks/logging";
import GroupIcon from '@mui/icons-material/Group';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import Filter5Icon from '@mui/icons-material/Filter5';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import DeleteIcon from '@mui/icons-material/Delete';
import ConfirmationDialog from "../components/util/ConfirmationDialog";


interface ProjectsParams {//TODO: remove
    workspaceId: string,
    workspaceTitle: string
}

const useStyles = makeStyles(theme => ({
    button: {
        width: '50px',
        height: '50px',
        margin: '10px'
    }
}));

export default function Projects() {
    const classes = useStyles();
    const {workspaceId, workspaceTitle} = useParams<ProjectsParams>();
    const {totalCount, pageSize, pageNumber} = useSelector(getPaging, shallowEqual);
    const [role, setRole] = useState(WorkspaceAssociation.STUDENT);
    const [activeOnly, setActiveOnly] = useState(false);
    const [tags, setTags] = useState([] as Tag[]);
    const [deleteDialog, setDeleteDialog] = useState(false);

    const user = useSelector(getUsername);

    const [data, setData] = useState([] as Project[]);
    console.log("render Projects")

    const dispatch = useDispatch();

    const error = useError();

    function updateData(tags: Tag[] = [], active = false) {
        getProjectsForWorkspace(new ProjectQuery(tags.map(t => t.id), new Pageable(pageNumber, pageSize), workspaceId, active))
            .then(r => {
                setData(r.data.projects.map(p => new Project(p.id, p.workSpaceId, p.title, p.description, p.tags, p.status)));
                setRole(r.data.role);
                dispatch(initPaging(r.data.totalCount, pageSize, pageNumber));
            }).catch(error);
    }

    useEffect(() => {
        if (workspaceId)
            updateData();
    }, [workspaceId, pageNumber, pageSize]);//TODO: call back here

    const [openInvite, setOpenInvite] = useState(false);
    const [invite, setInvite] = useState(null as Invite | null);

    function onInviteOpen() {
        if (invite)
            setOpenInvite(true);
        else
            getInviteForWorkspace(workspaceId).then(r => {
                setInvite(r.data);
                setOpenInvite(true);
            })
    }

    function closeInvite() {
        setOpenInvite(false);
    }

    const tagsUpdate = (t: Tag[]) => {
        setTags(t);
        updateData(t, activeOnly);
    }

    const activeUpdate = (a: boolean) => {
        setActiveOnly(a);
        updateData(tags, a);
    }

    function onDelete() {
        deleteWorkspace(workspaceId)
            .then(r => window.location.href = '/workspaces')
            .catch(error);

    }

    return (<BadgePage checkBoxes={[new CheckBoxInfo('Показать только активные', activeUpdate)]}
                       titleAlign='left'
                       additionalButtons={(<>
                           <WorkspaceSettings workspaceId={workspaceId}/>
                           {role === WorkspaceAssociation.ORGANIZER ?
                               <>
                                   <Dialog open={openInvite} onClose={closeInvite}>
                                       <DialogTitle>Добавить в рабочее пространство</DialogTitle>
                                       <DialogContent dividers>
                                           <Centered>
                                               <TextField label='Добавить участника' value={invite?.userInvite}
                                                          margin='normal' disabled={true}/>
                                               <TextField label='Добавить ментора' value={invite?.mentorInvite}
                                                          margin='normal' disabled={true}/>
                                           </Centered>
                                       </DialogContent>
                                       <DialogActions>
                                           <Button onClick={closeInvite}>
                                               Закрыть
                                           </Button>
                                       </DialogActions>
                                   </Dialog>
                                   <ConfirmationDialog open={deleteDialog} onClose={() => setDeleteDialog(false)}
                                                       label="удалить рабочее пространство" onSubmit={onDelete}/>
                                   <Tooltip title='Оценки'>
                                       <IconButton href={`/scores/${workspaceId}`} className={classes.button}>
                                           <MenuBookIcon/>
                                       </IconButton>
                                   </Tooltip>
                                   <Tooltip title='Участники'>
                                       <IconButton href={`/users?workspaceId=${workspaceId}`}
                                                   className={classes.button}>
                                           <GroupIcon/>
                                       </IconButton>
                                   </Tooltip>
                                   <Tooltip title='Пригласить'>
                                       <IconButton onClick={onInviteOpen} className={classes.button}>
                                           <GroupAddIcon/>
                                       </IconButton>
                                   </Tooltip>
                                   <Tooltip title='Настройки'>
                                       <IconButton onClick={() => dispatch(openDialog())}
                                                   className={classes.button}>
                                           <SettingsIcon/>
                                       </IconButton>
                                   </Tooltip>
                                   <Tooltip title='Удалить'>
                                       <IconButton onClick={() => setDeleteDialog(true)}
                                                   className={classes.button}>
                                           <DeleteIcon/>
                                       </IconButton>
                                   </Tooltip>
                               </> : <>
                                   <Tooltip title='Оценки'>
                                       <IconButton href={`/scores/${workspaceId}`} className={classes.button}>
                                           <MenuBookIcon/>
                                       </IconButton>
                                   </Tooltip>
                                   {role === WorkspaceAssociation.MENTOR ?
                                       <Tooltip title='Оценить'>
                                           <IconButton href={`/scoring/${workspaceId}`} className={classes.button}>
                                               <Filter5Icon/>
                                           </IconButton>
                                       </Tooltip> : <></>}
                               </>}
                       </>)}
                       title={workspaceTitle ? `Проекты из "${workspaceTitle}"` : `Проекты "${user?.user.username}"`}
                       badgeData={data} squared={false}
                       href={i => `/project?projectId=${i.id}&workspaceId=${workspaceId}`}
                       addTitle='Создать' onSetTags={tagsUpdate}
                       addButton={workspaceId !== undefined}
                       addOnClick={() => window.location.href = `/project?isNew&workspaceId=${workspaceId}`}/>);
}
