import React from 'react';
import {makeStyles} from "@material-ui/core";
import ListItemProps from "../../props.common/ListItemProps";

const useStyles = makeStyles(theme => ({
    badge: {
        display: 'block',
        borderColor: "black",
        borderWidth: "2px"
    }
}));


export default function ProjectBadge({children}: React.PropsWithChildren<ListItemProps>) {
    const classes = useStyles();
    return (
        <div className={classes.badge}>
            {children}
        </div>);
}