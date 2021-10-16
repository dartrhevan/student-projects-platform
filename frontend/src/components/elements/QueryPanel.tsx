import React, {useState} from 'react';
import {Button, makeStyles, Paper} from "@material-ui/core";
import {Add} from "@material-ui/icons";
import AddProject from "./AddProject";
import TagsPanel from "../util/TagsPanel";
import clsx from "clsx";
import isMobile from "../../hooks/isMobile";
import {useDispatch, useSelector} from "react-redux";
import {openDialog} from "../../store/actions/dialog/dialog";
import Typography from "@material-ui/core/Typography";

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
    },
    typ: {
        margin: '10px'
    }
}));

export default function QueryPanel() {
    const classes = useStyles();
    const mobile = isMobile();
    const dispatch = useDispatch();
    const [fromDate, setFromDate] = useState(null as Date | null);

    return (<Paper className={clsx({[classes.queryPanel]: true, [classes.mobilePanel]: mobile})}>
        {/*<DatePicker*/}
        {/*label="From"*/}
        {/*value={fromDate}*/}
        {/*onChange={(newValue: Date | null) => setFromDate(newValue)}*/}
        {/*renderInput={(params: object) => <TextField {...params} />}/>*/}

        <Typography className={classes.typ}>Введите тэги для поиска:</Typography>
        <AddProject onSubmit={(ti, d, t, p) =>
            console.log(`title: ${ti} description: ${d} tags: ${t} participants: ${p}`)} title='Добавление нового проекта' />
        <TagsPanel onSetTag={s => {}} />
        <Button className={classes.addButton} variant='outlined' onClick={() => dispatch(openDialog())}> <Add/> Добавить проект</Button>
    </Paper>)
}
