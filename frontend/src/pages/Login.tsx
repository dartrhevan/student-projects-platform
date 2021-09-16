import React, {ChangeEvent, useState} from 'react';
import {Button, CssBaseline, makeStyles, TextField, Typography} from "@material-ui/core";
import Centered from "../components/util/Centered";
import Aligned from "../components/util/Aligned";
import {allNotEmpty, getOnFieldChange} from "../utils/utils";
import {login} from "../api/auth";
import UserLogin from "../model/UserLogin";
import {useDispatch} from "react-redux";
import setLoginAction from "../store/actions/auth/setLoginAction";

const useStyles = makeStyles(theme => ({
    def: {
        margin: "15px"
    },
    container: {
        maxWidth: '500px'
    }
}));

export default function Login() {
    console.log("render Login")
    const classes = useStyles();
    const dispatch = useDispatch();
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const onLogin = () => login(new UserLogin(username, password)).then(r => {
        dispatch(setLoginAction(r));
        window.location.href = '/';
    }).catch(alert); //TODO: implement correct catch

    const allFilled = allNotEmpty(username, password);

    return (
        <Centered additionalClasses={[classes.container]}>
            <Typography variant="h5">
                Login
            </Typography>
            <CssBaseline/>
            <TextField label="Login" className={classes.def} onChange={getOnFieldChange(setUsername)} fullWidth={true}/>
            <CssBaseline/>
            <TextField label="Password" className={classes.def} onChange={getOnFieldChange(setPassword)}
                       type="password" fullWidth={true}/>
            <CssBaseline/>
            <Aligned endAlign={true}>
                <Button href='/registration' className={classes.def}>Sign up</Button>
                <Button disabled={!allFilled} onClick={onLogin} className={classes.def}>Sign in</Button>
            </Aligned>
        </Centered>);
}