import React, {useEffect, useState} from 'react';
import BadgePage from "../components/elements/BadgePage";
import {openDialog} from "../store/actions/dialog/dialog";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import Pageable from "../model/Pageable";
import {initPaging} from "../store/actions/paging/setPagingData";
import {useParams} from "react-router-dom";
import getPaging from "../hooks/getPaging";
import Workspace from "../model/Workspace";
import {attachToWorkspace, getUsersWorkspaces} from "../api/workspaces";
import {Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography} from "@mui/material";
import {Button, makeStyles} from "@material-ui/core";
import {allNotEmpty, getOnFieldChange} from "../utils/utils";
import {useError} from "../hooks/logging";


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
        width: '170px',
        margin: '10px'
    }
}));

interface WorkspacesParams {
    workspaceId: string,
    workspaceTitle: string
}

export default function Workspaces() {
    const classes = useStyles();
    // const {workspaceId, workspaceTitle} = useParams<WorkspacesParams>();
    const {totalCount, pageSize, pageNumber} = useSelector(getPaging, shallowEqual);

    const [data, setData] = useState([] as Workspace[]);
    // console.log("render Projects")

    const dispatch = useDispatch();

    const error = useError();


    useEffect(() => {
        getUsersWorkspaces(new Pageable(pageNumber, pageSize)).then(r => {
            if (r.message) {
                alert(r.message);
                // setData([]);
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
            .then(r => window.location.reload());
    }

    return (<BadgePage
        showTags={false}
        showDialog={true}
        addTitle='Создать'
        addOnClick={() => dispatch(openDialog())}
        title='Просмотр рабочих пространств'
        badgeData={data}
        additionalButtons={(
            <>
                <Dialog open={openAttachDialog} onClose={() => setOpenAttachDialog(false)}>
                    <DialogTitle>
                        <Typography>
                            Введите код рабочего пространства
                        </Typography>
                    </DialogTitle>
                    <DialogContent dividers>
                        <TextField value={workspaceCode} onChange={getOnFieldChange(setWorkspaceCode)}/>
                    </DialogContent>
                    <DialogActions>
                        <Button disabled={!allNotEmpty(workspaceCode)} onClick={onDialogClose}>Подтвердить</Button>
                    </DialogActions>
                </Dialog>
                <Button variant='outlined' className={classes.button}
                        onClick={() => setOpenAttachDialog(true)}>
                    Присоединиться
                </Button>
            </>)}
        href={s => `/projects/${(s as Workspace).id}/${(s as Workspace).title}`}/>);
}
