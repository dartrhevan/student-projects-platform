import React from 'react';
import clsx from 'clsx';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import {shallowEqual, useSelector} from "react-redux";
import {getMainMenuOpen} from "../../hooks/getMenuState";
import {Accordion, AccordionSummary, useMediaQuery} from "@material-ui/core";
import {ArrowDownward} from "@material-ui/icons";
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const drawerWidth = 240;

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
            width: theme.spacing(7) + 1,
            [theme.breakpoints.up('sm')]: {
                width: theme.spacing(9) + 1,
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
            marginTop: theme.spacing(8) //TODO: refactor
        }
    }),
);

export default function MiniDrawer() {
    const classes = useStyles();
    const matches = useMediaQuery('(max-width: 800px)', {noSsr: true}); //TODO: extract hook
    const open = useSelector(getMainMenuOpen, shallowEqual);
    const drawerClasses = {
        [classes.drawerOpen]: open,
        [classes.drawerHidden]: !open && matches,
        [classes.drawerClose]: !(open || matches),
    };
    return (
        <Drawer
            variant="permanent"
            className={clsx(classes.drawer, drawerClasses)}
            classes={{
                paper: clsx(drawerClasses)
            }}>

            <List className={classes.list}>
                <ListItem button key={'Workspaces public'}>
                    <ListItemIcon><InboxIcon/></ListItemIcon>
                    <ListItemText primary={'Workspaces public'}
                                  onClick={() => window.location.href = '/workspaces/public'}/>
                </ListItem>

                <ListItem button key={'Workspaces private'}>
                    <ListItemIcon><InboxIcon/></ListItemIcon>
                    <ListItemText primary={'Workspaces private'}
                                  onClick={() => window.location.href = '/workspaces/private'}/>
                </ListItem>
            </List>
            <Divider/>
            <List>
                {/*{[''Users, 'Trash', 'Spam'].map((text, index) => (*/}
                <ListItem button key={'Users'}>
                    <ListItemIcon><MailIcon/></ListItemIcon>
                    <ListItemText primary={'Users'} onClick={() => window.location.href = '/users'}/>
                </ListItem>
                <ListItem button key={'Notifications'}>
                    <ListItemIcon><MailIcon/></ListItemIcon>
                    <ListItemText primary={'Notifications'} onClick={() => window.location.href = '/notifications'}/>
                </ListItem>
                {/*))}*/}
            </List>
        </Drawer>);
}