import React, {useEffect, useRef, useState} from 'react';
import {
    Button,
    Dialog,
    ListItemText,
    ListSubheader,
    makeStyles,
    Paper,
    TextField,
    Typography
} from "@material-ui/core";
import TagsPanel from "../util/TagsPanel";
import clsx from "clsx";
import {closeDialog, openDialog} from "../../store/actions/dialog/dialog";
import {useDispatch, useSelector} from "react-redux";
import isOpenDialog from "../../hooks/isOpenDialog";
import List from "@material-ui/core/List";
import {ListItemButton} from "@mui/material";

const useStyles = makeStyles(theme => ({
    main: {
        padding: '20px',
        margin: '10px',
        display: 'flex',
        flexDirection: 'column',
        minWidth: '25vw'
    },
    but: {
        // margin: '2% 0 0 0'
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
        // maxHeight: '20vh'
    }
}));

interface DialogProps {
    // open: boolean
    title: string

    onSubmit: ((title:string, description: string, t: string[], p: string[]) => void)
}

export default function AddProject({onSubmit, title}: DialogProps) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const open = useSelector(isOpenDialog);

    function onCloseDialog() {
        dispatch(closeDialog());
    }

    const [participants, setParticipants] = useState(['Vladimir', 'Rail', 'Nikita', 'Nikolay', 'Renat'] as string[]);
    const [newParticipant, setNewParticipant] = useState('');
    // const tagsRef = React.useRef<TagsPanel>(null);
    const [tags, setTags] = useState([] as string[]);
    const [ptTitle, setTitle] = useState('');
    const [description, setDescription] = useState('');

    function onAddNewParticipant() {
        if (!participants.includes(newParticipant)) //TODO: check new participant
            setParticipants([...participants, newParticipant]);
        setNewParticipant('');
    }

    function submit() {
        onSubmit(ptTitle, description, tags, participants);
        onCloseDialog();
    }

    const handleNewPartChange = (event: React.ChangeEvent<HTMLInputElement>) => setNewParticipant(event.target.value);
    const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => setTitle(event.target.value);
    const handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => setDescription(event.target.value);

    return (
        <Dialog open={open} onClose={onCloseDialog}>
            <div className={classes.main}>
                <Typography className={classes.but} variant='h6'>{title}</Typography>
                <TextField className={classes.but} variant='outlined' label='Enter title' onChange={handleTitleChange}/>
                <TextField className={classes.but} minRows={3} variant='outlined' label='Enter description'
                           multiline={true} onChange={handleDescriptionChange}/>

                <Paper className={clsx(classes.but, classes.paper)}>
                    <Typography className={classes.but}>Тэги</Typography>
                    <TagsPanel onSetTag={setTags} />
                </Paper>
                <Paper className={clsx(classes.but, classes.paper)}>
                    <List
                        // sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                        component="nav"
                        aria-labelledby="nested-list-subheader"
                        subheader={
                            <ListSubheader component="div" id="nested-list-subheader">
                                Список участников
                            </ListSubheader>
                        }>
                        {participants.map(p => (
                            <ListItemButton>
                                {/*<ListItemIcon>*/}
                                {/*    <SendIcon />*/}
                                {/*</ListItemIcon>*/}
                                <ListItemText primary={p}/>
                            </ListItemButton>))}
                    </List>
                    <div className={classes.panel}>
                        <TextField label='Логин участниа' className={classes.but} onChange={handleNewPartChange}/>
                        <Button onClick={onAddNewParticipant}>Добавить участника</Button>
                    </div>
                </Paper>

                <div className={classes.buts}>
                    <Button className={classes.but} onClick={submit}>Submit</Button>
                    <Button className={classes.but} onClick={onCloseDialog}>Cancel</Button>
                </div>
            </div>
        </Dialog>
    );
}