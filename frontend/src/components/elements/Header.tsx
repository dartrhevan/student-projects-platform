import React from 'react';
import {AppBar, IconButton, Link, makeStyles, Toolbar, Typography} from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import LoginButton from "./LoginButton";
import {getMainMenuOpen} from "../../hooks/getMenuState";
import {closeMainMenuAction, openMainMenuAction} from "../../store/actions/menu/mainMenu";
import isMobile from "../../hooks/isMobile";
import getUsername from "../../hooks/getUsername";
import THEME, {ElementsStyle, HeaderStyle} from "../../theme";

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
        zIndex: theme.zIndex.drawer + 1,
        ...HeaderStyle
    }
}));

export default function Header() {
    const dispatch = useDispatch();
    const classes = useStyles();

    const mobile = isMobile();
    const mainMenuOpen = useSelector(getMainMenuOpen, shallowEqual);

    const onMenuButtonClicked = () => dispatch(mainMenuOpen ? closeMainMenuAction() : openMainMenuAction());

    const login = useSelector(getUsername);

    return (
        <AppBar position="fixed" className={classes.bar}>
            <Toolbar>
                {!login ? (<></>) :
                    (<IconButton className={classes.menuButton} onClick={onMenuButtonClicked}
                                 color="inherit" aria-label="menu" edge="start">
                        {mainMenuOpen ? <ArrowBackIcon/> : <MenuIcon/>}
                    </IconButton>)}
                <Typography variant="h6" align="center" className={classes.title}>
                    <Link underline='none' color='inherit' href='/'>
                        Project Activities{mobile ? '' :
                        ': Платформа для организации проектной деятельности'}
                    </Link>
                </Typography>
                <LoginButton/>
            </Toolbar>
        </AppBar>
    );
}
