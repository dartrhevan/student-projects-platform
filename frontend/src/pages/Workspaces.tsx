import React from 'react';
import {makeStyles} from "@material-ui/core";
import BadgePage from "../components/elements/BadgePage";


const useStyles = makeStyles(theme => ({
    main: {
        display: "flex",
        flexWrap: "wrap",
        flexDirection: "row",
        alignItems: "start",
    },
    query: {
        // margin: '2% 0 0 0'
        padding: '10px'
    },
    title: {
        margin: '45px 0 10px 0'
    }
}));

export default function Projects() {
    const classes = useStyles();

    console.log("render Projects")

    return (<BadgePage title='Просмотр публичных рабочих пространств'
                       badgeData={['A', 'B', 'C', 'D', 'E', 'F', 'A1', '1B', 'C1', 'D1', 'E1', '1F'].map(s => ({id: s}))}
                       href={s => `/projects/${s}/${s}`} />);
}
