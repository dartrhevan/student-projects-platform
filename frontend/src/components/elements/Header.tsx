import React from 'react';
import {AppBar, Button, IconButton, Link, makeStyles, Toolbar, Typography} from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import getUsername from "../../hooks/getUsername";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import LoginButton from "./LoginButton";
import {getMainMenuOpen} from "../../hooks/getMenuState";
import {closeMainMenu, openMainMenu} from "../../store/actions/menu/mainMenu";

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 2,
    },
    bar: {
        // colorPrimary: "#cbcbcb",
        // colorSecondary: "#cbcbcb",
        colorDefault: "#cbcbcb",
        zIndex: theme.zIndex.drawer + 1
    }
}));

export default function Header() {
    const dispatch = useDispatch();
    const classes = useStyles();

    const mainMenuOpen = useSelector(getMainMenuOpen, shallowEqual);

    const onMenuButtonClicked = () => dispatch(mainMenuOpen ? closeMainMenu() : openMainMenu());

    return (
        <AppBar position="static" className={classes.bar} color={"default"}>
            <Toolbar>
                <IconButton className={classes.menuButton} onClick={onMenuButtonClicked}
                            color="inherit" aria-label="menu" edge="start">
                    {mainMenuOpen ? <ArrowBackIcon/> : <MenuIcon/>}
                </IconButton>
                <Typography variant="h6" align="center" className={classes.title}>
                    <Link underline='none' color='inherit' href='/'>Проектный практикум</Link>
                </Typography>
                <LoginButton/>
            </Toolbar>
        </AppBar>
    );
}