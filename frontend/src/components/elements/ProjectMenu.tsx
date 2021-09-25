import React from 'react';
import {CssBaseline, makeStyles} from "@material-ui/core";
import Drawer from "@material-ui/core/Drawer";
import {closeProjectMenuAction} from "../../store/actions/menu/projectMenu";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {getOpenedProjectId} from "../../hooks/getMenuState";

const drawerWidth = 450;

const useStyles = makeStyles(theme => ({
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

export default function ProjectMenu() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const onClose = () => dispatch(closeProjectMenuAction());
    const openProjectId = useSelector(getOpenedProjectId, shallowEqual);
    return (<Drawer
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
    </Drawer>)
}