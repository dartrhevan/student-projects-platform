import React from 'react';
import {makeStyles, Typography} from "@material-ui/core";
import Conditional from "../util/Conditional";

interface ErrorMessageProps {
    message: string
    condition: boolean
}

const useStyles = makeStyles(theme => ({
    errorMessage: {
        fontSize: '0.9rem'
    }
}));

export default function ErrorMessage({message, condition}: ErrorMessageProps) {
    const classes = useStyles();
    return (
        <Conditional condition={condition}>
            <Typography className={classes.errorMessage} color='error' align='center'>
                {message}
            </Typography>
        </Conditional>);
}