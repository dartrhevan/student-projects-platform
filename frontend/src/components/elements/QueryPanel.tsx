import React from 'react';
import {Button, makeStyles, Paper} from "@material-ui/core";
import {Add} from "@material-ui/icons";
import AddWorkspace from "./AddWorkspace";
import TagsPanel from "../util/TagsPanel";
import clsx from "clsx";
import isMobile from "../../hooks/isMobile";
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
        flexDirection: 'column',
        alignItems: 'center'
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

interface QueryProps {
    buttonTitle: string
    buttonOnClick: () => void
}

export default function QueryPanel({buttonTitle, buttonOnClick}: QueryProps) {
    const classes = useStyles();
    const mobile = isMobile();

    return (<Paper className={clsx({[classes.queryPanel]: true, [classes.mobilePanel]: mobile})}>
        <Typography className={classes.typ}>Введите тэги для поиска:</Typography>
        <AddWorkspace onSubmit={(ti, d, t, p) =>
            console.log(`title: ${ti} description: ${d} tags: ${t} participants: ${p}`)} title={buttonTitle} />
        <TagsPanel onSetTag={s => {}} />
        <Button className={classes.addButton} variant='outlined'
            onClick={buttonOnClick}>
            <Add/> {buttonTitle}
        </Button>
    </Paper>)
}
