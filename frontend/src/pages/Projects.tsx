import React from 'react';
import {makeStyles} from "@material-ui/core";
import Centered from "../components/util/Centered";
import ProjectBadge from "../components/elements/ProjectBadge";

const useStyles = makeStyles(theme => ({
    main: {
        display: "flex",
        flexWrap: "wrap"
    }
}));

export default function Projects() {
    const classes = useStyles();
    console.log("render Projects")
    return (
        <Centered additionalClasses={[classes.main]}>
            {['A', 'B', 'C'].map(s => <ProjectBadge key={s}>{s}</ProjectBadge>)}
        </Centered>);
}