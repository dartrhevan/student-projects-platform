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
    // const [endDate, setEndDate] = useState(new Date());

    useEffect(() => {
        if (workspaceId !== '') {
            getWorkspaceById(workspaceId).then(r => {//TODO: refactor
                setTitle(r.data.title);
                setStartDate(r.data.startDate);
                // setEndDate(r.data.endDate);
                setSprintsLength(r.data.sprintsLength);
                setSprintsCount(r.data.sprintsCount);
            });
        }
    }, [workspaceId]);

    function onCloseDialog() {
        dispatch(closeDialog());
    }


    function submit() {
        const match = (/[^\w\s]/).exec(title);
        if (match && match.length > 0) {
            alert('incorrect title');
            return;
        }
        (workspaceId !== '' ? updateWorkspace(workspaceId, title, sprintsCount, sprintsLength, startDate)
            : addNewWorkspace(title, sprintsCount, sprintsLength, startDate))
            .then(r => onCloseDialog());
    }

    // const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => setTitle(event.target.value);

    const allFilled = allNotEmpty(title/*sprintsCount, sprintsLength, startDate*/);

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
                {/*<TextField defaultValue={toDateString(endDate)} className={classes.but} type='date'*/}
                {/*           onChange={getOnFieldChange(s => setEndDate(new Date(s)))}/>*/}
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
