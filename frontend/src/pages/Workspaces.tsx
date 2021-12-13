import React, {useEffect, useState} from 'react';
import BadgePage from "../components/elements/BadgePage";
import {openDialog} from "../store/actions/dialog/dialog";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import Pageable from "../model/Pageable";
import {initPaging} from "../store/actions/paging/setPagingData";
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import getPaging from "../hooks/getPaging";
import Workspace from "../model/Workspace";
import {attachToWorkspace, getUsersWorkspaces} from "../api/workspaces";
import {Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography} from "@mui/material";
import {Button, IconButton, makeStyles, Tooltip} from "@material-ui/core";
import {allNotEmpty, getOnFieldChange} from "../utils/utils";
import {useError} from "../hooks/logging";
import SlideTransition from "../components/util/SlideTransition";


const useStyles = makeStyles(theme => ({
    main: {
        display: "flex",
        flexWrap: "wrap",
        flexDirection: "row",
        alignItems: "start",
    },
    query: {
        // margin: '2% 0 0 0'
        padding: '10px'
    },
    title: {
        margin: '45px 0 10px 0'
    },
    button: {
        maxHeight: '70%',
        minHeight: '50px',
        width: '50px',
        margin: '10px'
    }
}));

export default function Workspaces() {
    const classes = useStyles();
    const {totalCount, pageSize, pageNumber} = useSelector(getPaging, shallowEqual);

    const [data, setData] = useState([] as Workspace[]);

    const dispatch = useDispatch();

    const error = useError();


    useEffect(() => {
        getUsersWorkspaces(new Pageable(pageNumber, pageSize)).then(r => {
            if (r.message) {
                alert(r.message);
            } else {
                setData(r.data.workspaces)
                dispatch(initPaging(r.data.totalCount, pageSize, pageNumber))
            }
        }).catch(e => error(e))
    }, [totalCount, pageSize, pageNumber]);

    const [openAttachDialog, setOpenAttachDialog] = useState(false);
    const [workspaceCode, setWorkspaceCode] = useState('');

    function onDialogClose() {
        attachToWorkspace(workspaceCode)
            .then(r => window.location.reload())
            .catch(error);
    }

    return (<BadgePage
        showTags={false}
        showDialog={true}
        addTitle='Создать рабочее пространство'
        addOnClick={() => dispatch(openDialog())}
        title='Рабочие пространства'
        subTitle='На данной странице вы можете организовать обособленное пространство для взаимодействия участников
        определённой проектной деятельности, либо подключиться к существующему.'
        badgeData={data}
        additionalButtons={(
            <>
                <Dialog TransitionComponent={SlideTransition} open={openAttachDialog}
                        onClose={() => setOpenAttachDialog(false)}>
                    <DialogTitle>
                        <Typography>
                            Введите код рабочего пространства
                        </Typography>
                    </DialogTitle>
                    <DialogContent dividers>
                        <TextField value={workspaceCode} onChange={getOnFieldChange(setWorkspaceCode)}/>
                    </DialogContent>
                    <DialogActions>
                        <Button disabled={!allNotEmpty(workspaceCode)} onClick={onDialogClose}>Присоединиться</Button>
                        <Button onClick={() => setOpenAttachDialog(false)}>Отмена</Button>
                    </DialogActions>
                </Dialog>
                <Tooltip title='Присоединиться к рабочему пространству'>
                    <IconButton className={classes.button} onClick={() => setOpenAttachDialog(true)}>
                        <GroupAddIcon/>
                    </IconButton>
                </Tooltip>
            </>)}
        href={s => `/projects/${(s as Workspace).id}/${(s as Workspace).title}`}
        defaultMessage={(
            <div>На данной странице вы можете организовать рабочее для группы связанных проектов, например проектного
                практикума магистратуры Сбера.
                <br />
                Здесь будут отображаться доступные вам рабочие пространства.
                <br />
                Для начала работы создайте свое собственное рабочее пространство или присоединитесь к уже
                существующему.
            </div>)}/>);
}
