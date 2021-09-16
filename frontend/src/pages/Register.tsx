import React, {useState} from 'react';
import {Button, CssBaseline, makeStyles, TextField, Typography} from "@material-ui/core";
import {login, register} from "../api/auth";
import Centered from "../components/util/Centered";
import {allNotEmpty, getOnFieldChange} from "../utils/utils";
import Aligned from "../components/util/Aligned";
import ErrorMessage from "../components/elements/ErrorMessage";
import User from "../model/User";
import UserLogin from "../model/UserLogin";
import setLoginAction from "../store/actions/auth/setLoginAction";
import {useDispatch} from "react-redux";

const useStyles = makeStyles(theme => ({
    def: {
        margin: "15px"
    },
    container: {
        maxWidth: '500px'
    }
}));

export default function Register() {
    const classes = useStyles();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const passwordConfirmed = password === passwordConfirm;

    const dispatch = useDispatch();
    const onRegister = () => register(new User(username, password)).then(r => {//TODO: extract common part from login
        dispatch(setLoginAction(r));
        window.location.href = '/';
    }).catch(alert); //TODO: implement correct catch;
    const allFilled = allNotEmpty(username, password, passwordConfirm);

    return (
        <Centered additionalClasses={[classes.container]}>
            <Typography variant="h5">
                Register
            </Typography>
            <CssBaseline/>
            <TextField label="Login" className={classes.def} onChange={getOnFieldChange(setUsername)} fullWidth={true}/>
            <CssBaseline/>
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
        </Centered>);
}