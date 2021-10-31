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
import {Dialog, TextField} from "@mui/material";
import WorkspaceSettings from "../components/elements/WorkspaceSettings";
import isOpenDialog from "../hooks/isOpenDialog";
import {closeDialog, openDialog} from "../store/actions/dialog/dialog";
import Invite from "../model/dto/Invite";
import {getInviteForWorkspace} from "../api/workspaces";


interface ProjectsParams {//TODO: remove
    workspaceId: string,
    workspaceTitle: string
}

interface ProjectProps {
    user?: boolean
}

export default function Projects() {
    const classes = useStyles();
    const {workspaceId, workspaceTitle} = useParams<ProjectsParams>();
    const {totalCount, pageSize, pageNumber} = useSelector(getPaging, shallowEqual);
    const [owner, setOwner] = useState(false);
    const [activeOnly, setActiveOnly] = useState(false);

    const [data, setData] = useState([] as Project[]);
    console.log("render Projects")

    const dispatch = useDispatch();

    useEffect(() => {
        getProjectsForWorkspace(new ProjectQuery([], new Pageable(pageNumber, pageSize), workspaceId, activeOnly))
            .then(r => {
                setData(r.projects);
                setOwner(r.owner);
                dispatch(initPaging(r.totalCount, pageSize, pageNumber));
            });
    }, [workspaceId, pageNumber, pageSize]);//TODO: call back here

    // const open = useSelector(isOpenDialog);

    // function onCloseDialog() {
    //     dispatch(closeDialog());
    // }

    const [openInvite, setOpenInvite] = useState(false);
    const [invite, setInvite] = useState(null as Invite | null);

    function onInviteOpen() {
        if (invite)
            setOpenInvite(true);
        else
            getInviteForWorkspace(workspaceId).then(r => {
                setInvite(r.payload);
                setOpenInvite(true);
            })
    }

    function closeInvite() {
        setOpenInvite(false);
    }

    return (<BadgePage checkBoxes={[new CheckBoxInfo('Показать только активные', setActiveOnly)]}
                       additionalButtons={(<>
                           <WorkspaceSettings workspaceId={workspaceId}/>
                           {owner ?
                               <>
                                   <Dialog open={openInvite} onClose={closeInvite}>
                                       <Centered>
                                           <TextField label='Приглашение участника' value={invite?.userInvite}
                                                      margin='normal' disabled={true}/>
                                           <TextField label='Приглашение ментора' value={invite?.mentorInvite}
                                                      margin='normal' disabled={true}/>
                                           <Button onClick={closeInvite}>
                                               Закрыть
                                           </Button>
                                       </Centered>
                                   </Dialog>
                                   <Button href={`/scores/${workspaceId}`} variant='outlined'
                                           className={classes.button}>
                                       Оценки
                                   </Button>
                                   <Button onClick={onInviteOpen} variant='outlined'
                                           className={classes.button}>
                                       Пригласить
                                   </Button>
                                   <Button onClick={() => dispatch(openDialog())} variant='outlined'
                                           className={classes.button}>
                                       Настройки
                                   </Button>
                               </> : <></>}
                       </>)}
                       title={`Проекты из "${workspaceTitle}"`} badgeData={data} squared={false}
                       href={i => `/project?projectId=${i.id}&workspaceId=${workspaceId}`}
                       addTitle='Создать'
                       addOnClick={() => window.location.href = `/project?isNew&workspaceId=${workspaceId}`}/>);
}
