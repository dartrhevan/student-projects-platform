import React, {useState} from 'react';
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
import {addNewWorkspace} from "../../api/workspaces";
import {allNotEmpty, toDateString} from "../../utils/utils";
import ErrorMessage from "./ErrorMessage";

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

export default function AddWorkspace() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const open = useSelector(isOpenDialog);

    function onCloseDialog() {
        dispatch(closeDialog());
    }

    const [title, setTitle] = useState('');
    const [sprintsCount, setSprintsCount] = useState(5);
    const [sprintsLength, setSprintsLength] = useState(2);
    const [startDate, setStartDate] = useState(new Date());

    function submit() {
        const match = (/[^\w\s]/).exec(title);
        if (match && match.length > 0) {
            alert('incorrect title');
            return;
        }
        addNewWorkspace(title, sprintsCount, sprintsLength, startDate)
        onCloseDialog();
    }

    const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => setTitle(event.target.value);

    const allFilled = allNotEmpty(title/*sprintsCount, sprintsLength, startDate*/);

    return (
        <Dialog open={open} onClose={onCloseDialog}>
            <div className={classes.main}>
                <Typography className={classes.but} variant='h6'>Новое рабочее пространство</Typography>
                <TextField className={classes.but} label='Название' onChange={handleTitleChange}/>
                <Typography variant='h6' paragraph>Настройки стандартного плана</Typography>
                <Divider flexItem/>
                <br/>
                <Typography>Дата начала</Typography>
                <TextField defaultValue={toDateString(startDate)} className={classes.but} type='date'/>
                <br/>
                <Typography>Колличество спринтов</Typography>
                <TextField defaultValue={sprintsCount} className={classes.but} type='number'/>
                <br/>
                <Typography>Длительность спринта (в неделях)</Typography>
                <TextField defaultValue={sprintsLength} className={classes.but} type='number'/>
                <ErrorMessage message='*Не все обязательные поля заполнены' condition={!allFilled}/>

                <div className={classes.buts}>
                    <Button disabled={!allFilled} className={classes.but} onClick={submit}>Подтвердить</Button>
                    <Button className={classes.but} onClick={onCloseDialog}>Отменить</Button>
                </div>
            </div>
        </Dialog>
    );
}
