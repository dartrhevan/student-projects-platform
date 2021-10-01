import React, {useEffect} from 'react';
import {Button, Dialog, makeStyles, Paper, TextField, Typography} from "@material-ui/core";
import TagsPanel from "../util/TagsPanel";
import clsx from "clsx";

const useStyles = makeStyles(theme => ({
    main: {
        padding: '20px',
        margin: '10px',
        display: 'flex',
        flexDirection: 'column',
        minWidth: '450px'
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
    }
}));

interface DialogProps {
    open: boolean
    title: string
}

export default function AddProject({open, title}: DialogProps) {
    const classes = useStyles();
    return (
        <Dialog open={open}>
            <div className={classes.main}>
                <Typography className={classes.but} variant='h6'>{title}</Typography>
                <TextField className={classes.but} variant='outlined' label='Enter title'/>
                <TextField className={classes.but} minRows={3} variant='outlined' label='Enter description' multiline={true}/>

                <Paper className={clsx(classes.but, classes.paper)}><TagsPanel /></Paper>
                <div className={classes.buts}>
                    <Button className={classes.but}>Submit</Button>
                    <Button className={classes.but}>Cancel</Button>
                </div>

            </div>
        </Dialog>
    );
}