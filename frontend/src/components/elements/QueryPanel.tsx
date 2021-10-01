import React, {ChangeEvent, EventHandler, KeyboardEvent, KeyboardEventHandler, useState} from 'react';
import {Button, Chip, Input, List, ListItem, makeStyles, Paper, TextField, useMediaQuery} from "@material-ui/core";
import DatePicker from '@mui/lab/DatePicker';
import {Add, PlusOne} from "@material-ui/icons";
import AddProject from "./AddProject";
import TagsPanel from "../util/TagsPanel";
import clsx from "clsx";

const useStyles = makeStyles(theme => ({
    queryPanel: {
        padding: '10px 15px',
        width: '100%',
        maxWidth: '80vw',
        display: 'flex',
        alignItems: 'baseline'
    },
    mobilePanel: {
        flexDirection: 'column'
    },
    addButton: {
        maxHeight: '70%',
        width: '200px',
        flexShrink: 0
    }
}));

export default function QueryPanel() {
    const classes = useStyles();
    const matches = useMediaQuery('(max-width: 800px)', {noSsr: true}); //TODO: extract hook

    const [openAddProjDialog, setOpenAddProjDialog] = useState(false);
    const [fromDate, setFromDate] = useState(null as Date | null);

    return (<Paper className={clsx({[classes.queryPanel]: true, [classes.mobilePanel]: matches})}>
        {/*<DatePicker*/}
        {/*label="From"*/}
        {/*value={fromDate}*/}
        {/*onChange={(newValue: Date | null) => setFromDate(newValue)}*/}
        {/*renderInput={(params: object) => <TextField {...params} />}/>*/}

        <AddProject open={openAddProjDialog} title='Добавление нового проекта' />
        <TagsPanel />
        <Button className={classes.addButton} variant='outlined' onClick={() => setOpenAddProjDialog(true)}> <Add/> Добавить проект</Button>
    </Paper>)
}