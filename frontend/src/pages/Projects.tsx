import React from 'react';
import {AppBar, Container, CssBaseline, makeStyles, Paper, Toolbar} from "@material-ui/core";
import Centered from "../components/util/Centered";
import ProjectBadge from "../components/elements/ProjectBadge";
import Drawer from "@material-ui/core/Drawer";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {getOpenedProjectId} from "../hooks/getMenuState";
import {closeProjectMenuAction} from "../store/actions/menu/projectMenu";

const drawerWidth = 450;

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
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        maxWidth: "80%",
        flexShrink: 0,
    },
    drawerContainer: {
        overflow: 'auto',
    },
    bar: {
        margin: '50px 0 0 0'
    }
}));

export default function Projects() {
    const classes = useStyles();

    const dispatch = useDispatch();
    const onClose = () => dispatch(closeProjectMenuAction());
    const openProjectId = useSelector(getOpenedProjectId, shallowEqual);
    console.log("render Projects")
    return (
        <>
            <Drawer
                onClose={onClose}
                className={classes.drawer}
                open={openProjectId !== undefined}
                anchor='right'
                classes={{
                    paper: classes.drawer,
                }}>
                <CssBaseline/>
                <CssBaseline/>
                <CssBaseline/>
                <CssBaseline/>
                <CssBaseline/>
                <CssBaseline/>
                QWERTYU
            </Drawer>
            {/*TODO: implement*/}
            <Container>
                <Paper className={classes.query}>
                QWERTYU
                </Paper>
                {/*<AppBar position="fixed" className={classes.bar} color={"default"}>*/}
                {/*    <Toolbar>*/}
                {/*            QWERTYU*/}
                {/*    </Toolbar>*/}
                {/*</AppBar>*/}
                <Centered row={true} additionalClasses={[classes.main]}>
                    {['A', 'B', 'C', 'D', 'E', 'F', 'A1', '1B', 'C1', 'D1', 'E1', '1F'].map(s =>
                        <ProjectBadge key={s} id={s} title={s}/>)}
                </Centered>
            </Container>
        </>);
}