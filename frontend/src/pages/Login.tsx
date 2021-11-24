import React, {ChangeEvent, useState} from 'react';
import {Button, CssBaseline, makeStyles, TextField, Typography} from "@material-ui/core";
import Centered from "../components/util/Centered";
import Aligned from "../components/util/Aligned";
import {allNotEmpty, getOnFieldChange} from "../utils/utils";
import {login} from "../api/auth";
import {useDispatch} from "react-redux";
import setLoginAction from "../store/actions/auth/setLoginAction";
import {LoginState} from "../store/state/LoginState";
import {useWarn} from "../hooks/logging";

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

    const warn = useWarn();

    const onLogin = () => login(username, password).then(r => {
        if (r !== null) {
            dispatch(setLoginAction(r as LoginState));
            window.location.href = '/';
        }
    }).catch(e => {
        warn(e.toString());
    });

    const allFilled = allNotEmpty(username, password);

    return (
        <Centered additionalClasses={[classes.container]}>
            <Typography variant="h5">
                Вход
            </Typography>
            <CssBaseline/>
            <TextField required label="Логин" className={classes.def} onChange={getOnFieldChange(setUsername)}
                       fullWidth={true}/>
            <CssBaseline/>
            <TextField label="Пароль" className={classes.def} onChange={getOnFieldChange(setPassword)}
                       type="password" fullWidth={true} required/>
            <CssBaseline/>
            <Aligned endAlign={true}>
                <Button href='/registration' className={classes.def}>Регистрация</Button>
                <Button disabled={!allFilled} onClick={onLogin} className={classes.def}>Подтвердить</Button>
            </Aligned>
        </Centered>);
}
