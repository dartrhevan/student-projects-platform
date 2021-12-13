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
import {allNotEmpty, getOnFieldChange, isValid, toDateString} from "../../utils/utils";
import ErrorMessage from "./ErrorMessage";
import {useError, useSuccess, useWarn} from "../../hooks/logging";
import SlideTransition from "../util/SlideTransition";

const useStyles = makeStyles(theme => ({
    main: {
        padding: '20px',
        margin: '10px',
        display: 'flex',
        flexDirection: 'column',
        minWidth: '20vw'
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

const today = new Date().getDate();

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
            }).catch(console.log); //TODO: не отправлять если пользователь не владелец
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

    const endDate = new Date();
    endDate.setDate(startDate.getDate() + sprintsCount * 7 * sprintsLength);

    const titleCorrect = isValid(title);

    // @ts-ignore
    return (
        <Dialog TransitionComponent={SlideTransition} open={open} onClose={onCloseDialog}>
            <DialogTitle>
                <Typography variant='h6'>
                    {workspaceId === '' ? 'Новое рабочее пространство' : `Рабочее пространство ${title}`}
                </Typography>
            </DialogTitle>
            <DialogContent dividers className={classes.main}>
                <TextField className={classes.but} value={title} label='Название' required
                           onChange={getOnFieldChange(setTitle)}/>
                <Typography variant='h6' paragraph>Настройки стандартного плана проектов</Typography>
                <Divider flexItem/>
                <br/>
                <Typography>Дата начала</Typography>
                <TextField defaultValue={toDateString(startDate)} className={classes.but} type='date'
                           onChange={getOnFieldChange(s => setStartDate(new Date(s)))} required/>
                <Typography>Дата окончания</Typography>
                <TextField value={endDate.toLocaleDateString()} className={classes.but} disabled />
                <br/>
                <Typography>Колличество спринтов</Typography>
                <TextField defaultValue={sprintsCount} className={classes.but} type='number' required
                           onChange={getOnFieldChange(s => setSprintsCount(Number.parseInt(s)))}/>
                <br/>
                <Typography>Длительность спринта (в неделях)</Typography>
                <TextField defaultValue={sprintsLength} className={classes.but} type='number' required
                           onChange={getOnFieldChange(s => setSprintsLength(Number.parseInt(s)))}/>
                <ErrorMessage message='*Не все обязательные поля заполнены' condition={!allFilled}/>
                <ErrorMessage message="*Название может содержать только цифры, буквы, пробел и '-'" condition={!titleCorrect}/>
                <ErrorMessage message="*Выбрана прошедшая дата начала" condition={startDate.getDate() < today}/>
            </DialogContent>
            <DialogActions className={classes.buts}>
                <Button disabled={!allFilled} onClick={submit}>Подтвердить</Button>
                <Button onClick={onCloseDialog}>Отменить</Button>
            </DialogActions>
        </Dialog>
    );
}
