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
import {Divider} from "@mui/material";
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
    const [endDate, setEndDate] = useState(new Date());

    useEffect(() => {
        if (workspaceId !== '') {
            getWorkspaceById(workspaceId).then(r => {//TODO: refactor
                setTitle(r.payload.title);
                setStartDate(r.payload.startDate);
                setEndDate(r.payload.endDate);
                setSprintsLength(r.payload.sprintsLength);
                setSprintsCount(r.payload.sprintsCount);
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
        (workspaceId !== '' ? updateWorkspace(workspaceId, title, sprintsCount, sprintsLength, startDate, endDate)
            : addNewWorkspace(title, sprintsCount, sprintsLength, startDate, endDate))
            .then(r => onCloseDialog());
    }

    // const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => setTitle(event.target.value);

    const allFilled = allNotEmpty(title/*sprintsCount, sprintsLength, startDate*/);

    return (
        <Dialog open={open} onClose={onCloseDialog}>
            <div className={classes.main}>
                <Typography className={classes.but} variant='h6'>
                    {workspaceId === '' ? 'Новое рабочее пространство' : `Рабочее пространство ${title}`}
                </Typography>
                <TextField className={classes.but} value={title} label='Название' onChange={getOnFieldChange(setTitle)}/>
                <Typography variant='h6' paragraph>Настройки стандартного плана</Typography>
                <Divider flexItem/>
                <br/>
                <Typography>Дата начала</Typography>
                <TextField defaultValue={toDateString(startDate)} className={classes.but} type='date'
                           onChange={getOnFieldChange(s => setStartDate(new Date(s)))}/>
                <Typography>Дата окончания</Typography>
                <TextField defaultValue={toDateString(endDate)} className={classes.but} type='date'
                           onChange={getOnFieldChange(s => setEndDate(new Date(s)))}/>
                <br/>
                <Typography>Колличество спринтов</Typography>
                <TextField defaultValue={sprintsCount} className={classes.but} type='number'
                           onChange={getOnFieldChange(s => setSprintsCount(Number.parseInt(s)))}/>
                <br/>
                <Typography>Длительность спринта (в неделях)</Typography>
                <TextField defaultValue={sprintsLength} className={classes.but} type='number'
                           onChange={getOnFieldChange(s => setSprintsLength(Number.parseInt(s)))}/>
                <ErrorMessage message='*Не все обязательные поля заполнены' condition={!allFilled}/>

                <div className={classes.buts}>
                    <Button disabled={!allFilled} className={classes.but} onClick={submit}>Подтвердить</Button>
                    <Button className={classes.but} onClick={onCloseDialog}>Отменить</Button>
                </div>
            </div>
        </Dialog>
    );
}
