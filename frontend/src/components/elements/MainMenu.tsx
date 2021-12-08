import React, {useEffect, useState} from 'react';
import clsx from 'clsx';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Apps from '@material-ui/icons/Apps';
import {shallowEqual, useSelector} from "react-redux";
import {getMainMenuOpen} from "../../hooks/getMenuState";
import {Person} from "@material-ui/icons";
import isMobile from "../../hooks/isMobile";
import FormatAlignJustifyIcon from '@mui/icons-material/FormatAlignJustify';
import EmailIcon from '@mui/icons-material/Email';
import getUsername from "../../hooks/getUsername";
import AutoAwesomeMosaicIcon from '@mui/icons-material/AutoAwesomeMosaic';
import THEME, {HeaderStyle} from "../../theme";
import {Badge, Tooltip} from "@mui/material";
import {hasNewNotifications} from "../../api/notifications";

const drawerWidth = 270;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
        },
        hide: {
            display: 'none',
        },
        drawer: {
            width: drawerWidth,
            flexShrink: 0,
            whiteSpace: 'nowrap',
        },
        paper: HeaderStyle,
        drawerOpen: {
            width: drawerWidth,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
        },
        drawerClose: {
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
            overflowX: 'hidden',
            width: theme.spacing(5) + 1,
            [theme.breakpoints.up('sm')]: {
                width: theme.spacing(7) + 1,
            },
        },
        drawerHidden: {
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
            width: 0
        },
        toolbar: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            padding: theme.spacing(0, 1),
            // necessary for content to be below app bar
            ...theme.mixins.toolbar,
        },
        content: {
            flexGrow: 1,
            padding: theme.spacing(3),
        },
        list: {
            marginTop: theme.spacing(8),
        },
        icon: {
            color: THEME.HEADER_TEXT_COLOUR
        }
    }),
);

export default function MiniDrawer() {
    const classes = useStyles();
    const mobile = isMobile();
    const open = useSelector(getMainMenuOpen, shallowEqual);
    const [hasNewNotifs, setNewNotifs] = useState(false);
    const drawerClasses = {
        [classes.drawerOpen]: open,
        [classes.drawerHidden]: !open && mobile,
        [classes.drawerClose]: !(open || mobile),
    };

    const login = useSelector(getUsername);

    useEffect(() => {
        if (login) {
            hasNewNotifications().then(r => setNewNotifs(r.data));
        }
    }, [login]);

    return login && (<Drawer
        variant="permanent"
        className={clsx(classes.drawer, drawerClasses)}
        classes={{
            paper: clsx(drawerClasses, classes.paper)
        }}>

        <List className={classes.list}>
            <Tooltip title='Рабочие пространства'>
                <ListItem button key='Рабочие пространства' onClick={() => window.location.href = '/workspaces'}>
                    <ListItemIcon>
                        <AutoAwesomeMosaicIcon className={classes.icon}/>
                    </ListItemIcon>
                    <ListItemText primary='Рабочие пространства'/>
                </ListItem>
            </Tooltip>
            <Tooltip title='Мои проекты'>
                <ListItem button key='Мои проекты' onClick={() => window.location.href ='/projects'}>
                    <ListItemIcon>
                        <Apps className={classes.icon}/>
                    </ListItemIcon>
                    <ListItemText primary='Мои проекты'/>
                </ListItem>
            </Tooltip>
            <Tooltip title='Моё портфолио'>
                <ListItem button key='Моё портфолио'
                          onClick={() => window.location.href =`/portfolio/${login?.user.username}`}>
                    <ListItemIcon>
                        <FormatAlignJustifyIcon className={classes.icon}/>
                    </ListItemIcon>
                    <ListItemText primary='Моё портфолио'/>
                </ListItem>
            </Tooltip>
            <Tooltip title='Мой профиль'>
                <ListItem button key='Мой профиль' onClick={() => window.location.href ='/profile'}>
                    <ListItemIcon>
                        <Person className={classes.icon}/>
                    </ListItemIcon>
                    <ListItemText primary='Мой профиль'/>
                </ListItem>
            </Tooltip>
            <Tooltip title='Уведомления'>
                <ListItem button key='Уведомления' onClick={() => window.location.href ='/notifications'}>
                    <ListItemIcon>
                        <Badge color="secondary" variant="dot" invisible={!hasNewNotifs}>
                            <EmailIcon className={classes.icon}/>
                        </Badge>
                    </ListItemIcon>
                    <ListItemText primary='Уведомления'/>
                </ListItem>
            </Tooltip>
        </List>
    </Drawer>);
}
