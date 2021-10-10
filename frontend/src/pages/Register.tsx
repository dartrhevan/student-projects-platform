import React, {useState} from 'react';
import {
    Button,
    Checkbox,
    CssBaseline,
    IconButton,
    ListItemIcon,
    makeStyles,
    TextField,
    Typography
} from "@material-ui/core";
import {login, register} from "../api/auth";
import Centered from "../components/util/Centered";
import {allNotEmpty, getOnFieldChange} from "../utils/utils";
import Aligned from "../components/util/Aligned";
import ErrorMessage from "../components/elements/ErrorMessage";
import User from "../model/User";
import setLoginAction from "../store/actions/auth/setLoginAction";
import {useDispatch} from "react-redux";
import Paper from "@material-ui/core/Paper";
import TagsPanel from "../components/util/TagsPanel";
import clsx from 'clsx';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
// import IconButton from "@material-ui/core/IconButton";
import {ListItemButton} from "@mui/material";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import Card from "@material-ui/core/Card";

const useStyles = makeStyles(theme => ({
    def: {
        margin: "15px",
    },
    container: {
        maxWidth: '500px'
    },
    skills: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
    },
    tagInput: {
        width: '80%',
    },
    card: {
        margin: '40px 0',
        padding: '15px'
    }
}));

export default function Register() {
    const classes = useStyles();
    const [username, setUsername] = useState('');
    const [surname, setSurname] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const passwordConfirmed = password === passwordConfirm;
    const roles = ['front', 'back', 'devops', 'test', 'analytic']; //TODO: get from backend

    const dispatch = useDispatch();
    const onRegister = () => register(new User(name, surname, username, password)).then(r => {//TODO: extract common part from login
        dispatch(setLoginAction(r));
        window.location.href = '/';
    }).catch(alert); //TODO: implement correct catch;
    const allFilled = allNotEmpty(username, password, passwordConfirm);

    return (
        <Centered additionalClasses={[classes.container]}>
            <Card className={clsx(classes.card, classes.skills)}>
                <Typography variant="h5">
                    Register
                </Typography>
                <CssBaseline/>

                <TextField label="Name" className={classes.def} onChange={getOnFieldChange(setName)} fullWidth={true}/>
                <TextField label="SurName" className={classes.def} onChange={getOnFieldChange(setSurname)}
                           fullWidth={true}/>
                <TextField label="Login" className={classes.def} onChange={getOnFieldChange(setUsername)}
                           fullWidth={true}/>
                <CssBaseline/>
                <div className={clsx(classes.def, classes.skills)}>
                    <Typography className={classes.def} align='center'>Add your skills</Typography>
                    <TagsPanel label='skill' tagInputClasses={[classes.tagInput]} onSetTag={console.log}/>
                </div>
                <List subheader={
                    <ListSubheader component="div" id="nested-list-subheader">
                        Choose your project roles
                    </ListSubheader>
                } className={clsx(classes.def, classes.skills)}>
                    {roles.map(value =>
                        (<ListItem key={value}>
                                <ListItemButton role={undefined} dense>
                                    <ListItemIcon>
                                        <Checkbox
                                            edge="start"
                                            tabIndex={-1}
                                            disableRipple />
                                    </ListItemIcon>
                                    <ListItemText id={value} primary={value}/>
                                </ListItemButton>
                            </ListItem>
                        ))}
                </List>
                <TextField label="Password" className={classes.def} onChange={getOnFieldChange(setPassword)}
                           type="password" fullWidth={true}/>
                <CssBaseline/>
                <TextField label="Password confirmation" className={classes.def} type="password"
                           onChange={getOnFieldChange(setPasswordConfirm)} fullWidth={true}/>
                <CssBaseline/>
                <ErrorMessage message='*Password and its confirmation do not match' condition={!passwordConfirmed}/>
                <ErrorMessage message='*Not all required fields present' condition={!(passwordConfirmed && allFilled)}/>

                <Aligned endAlign={true}>
                    <Button disabled={!(passwordConfirmed && allFilled)} className={classes.def}
                            onClick={onRegister}>Apply</Button>
                </Aligned>
            </Card>
        </Centered>);
}
