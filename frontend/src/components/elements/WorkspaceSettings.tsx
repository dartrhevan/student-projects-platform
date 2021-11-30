import React, {useEffect, useState} from 'react';
import {
    Button,
    Dialog,
    makeStyles,
    TextField,
    Typography
} from "@material-ui/core";
import {closeDialog} from "../../store/actions/dialog/dialog";
import {useDispatch, useSelector} from "react-redux";
import isOpenDialog from "../../hooks/isOpenDialog";
import {DialogActions, DialogContent, DialogTitle, Divider} from "@mui/material";
import {addNewWorkspace, getWorkspaceById, updateWorkspace} from "../../api/workspaces";
import {allNotEmpty, getOnFieldChange, toDateString} from "../../utils/utils";
import ErrorMessage from "./ErrorMessage";
import Workspace from "../../model/Workspace";
import {useError, useSuccess, useWarn} from "../../hooks/logging";

const useStyles = makeStyles(theme => ({
    main: {
        padding: '20px',
        margin: '10px',
        display: 'flex',
        flexDirection: 'column',
        minWidth: '25vw'
    },
    but: {
        margin: '15px'
    },
    buts: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    paper: {
        padding: '10px 20px'
    },
    panel: {
        display: 'flex',
        flexDirection: "row",
        alignItems: 'baseline',
    }
}));

interface WorkspaceProps {
    workspaceId?: string
}

export default function WorkspaceSettings({workspaceId = ''}: WorkspaceProps) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const open = useSelector(isOpenDialog);

    const [title, setTitle] = useState('');
    const [sprintsCount, setSprintsCount] = useState(5);
    const [sprintsLength, setSprintsLength] = useState(2);
    const [startDate, setStartDate] = useState(new Date());

    const existed = workspaceId !== '';

    useEffect(() => {
        if (existed) {
            getWorkspaceById(workspaceId).then(r => {
                setTitle(r.data.title);
                setStartDate(new Date(r.data.startDate));
                setSprintsLength(r.data.sprintsLength);
                setSprintsCount(r.data.sprintsCount);
            });
        }
    }, [workspaceId]);

    function onCloseDialog() {
        dispatch(closeDialog());
    }

    const warn = useWarn();
    const error = useError();
    const success = useSuccess();

    function submit() {
        (existed ? updateWorkspace(workspaceId, title, sprintsCount, sprintsLength, startDate)
            : addNewWorkspace(title, sprintsCount, sprintsLength, startDate))
            .then(r => {
                if (r.message)
                    warn(r.message)
                else {
                    window.location.reload();
                }
            }).catch(r => error(r));
    }

    const allFilled = allNotEmpty(title);

    return (
        <Dialog open={open} onClose={onCloseDialog}>
            <DialogTitle>
                <Typography variant='h6'>
                    {workspaceId === '' ? 'Новое рабочее пространство' : `Рабочее пространство ${title}`}
                </Typography>
            </DialogTitle>
            <DialogContent dividers className={classes.main}>
                <TextField className={classes.but} value={title} label='Название' required
                           onChange={getOnFieldChange(setTitle)}/>
                <Typography variant='h6' paragraph>Настройки стандартного плана</Typography>
                <Divider flexItem/>
                <br/>
                <Typography>Дата начала</Typography>
                <TextField defaultValue={toDateString(startDate)} className={classes.but} type='date'
                           onChange={getOnFieldChange(s => setStartDate(new Date(s)))} required/>
                <Typography>Дата окончания</Typography>
                <br/>
                <Typography>Колличество спринтов</Typography>
                <TextField defaultValue={sprintsCount} className={classes.but} type='number' required
                           onChange={getOnFieldChange(s => setSprintsCount(Number.parseInt(s)))}/>
                <br/>
                <Typography>Длительность спринта (в неделях)</Typography>
                <TextField defaultValue={sprintsLength} className={classes.but} type='number' required
                           onChange={getOnFieldChange(s => setSprintsLength(Number.parseInt(s)))}/>
                <ErrorMessage message='*Не все обязательные поля заполнены' condition={!allFilled}/>
            </DialogContent>
            <DialogActions className={classes.buts}>
                <Button disabled={!allFilled} onClick={submit}>Подтвердить</Button>
                <Button onClick={onCloseDialog}>Отменить</Button>
            </DialogActions>
        </Dialog>
    );
}
