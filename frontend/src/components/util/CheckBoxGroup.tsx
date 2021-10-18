import React from 'react';
import Checkbox from '@mui/material/Checkbox';
import {FormControlLabel} from "@mui/material";
import {makeStyles} from "@material-ui/core";
import CheckBoxInfo from "../../model/CheckBoxInfo";

interface CheckBoxGroupProps {
    checkBoxes: CheckBoxInfo[]
}

const useStyles = makeStyles(theme => ({
    root: {
        display: "flex",
        flexWrap: "wrap",
        flexDirection: "row",
        justifyContent: "end",
        width: '100%',
        height: '50px'
    }
}));

export default function ({checkBoxes}: CheckBoxGroupProps) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            {checkBoxes.map(cb => (<FormControlLabel key={cb.title} control={
                <Checkbox onInput={e => {cb.onChange((e.target as HTMLInputElement).checked)}} />} label={cb.title} />))}
        </div>)
}
