import React from 'react';
// import {logout} from '../../api/auth';
import {useDispatch, useSelector} from "react-redux";
import getUsername from "../../hooks/getUsername";
import {Button, makeStyles, Typography} from "@material-ui/core";
import logoutAction from "../../store/actions/auth/logoutAction";

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
    login: {
        flexShrink: 2,
        margin: '0 10px'
    },
    bar: {
        colorDefault: "#cbcbcb"
    }
}));

export default function LoginButton() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const username = useSelector(getUsername);
    const onLogout = () =>
        // logout().then(() => {
    {
        dispatch(logoutAction());
        window.location.href = '/';
    };
    // });

    return (
        <>
            {username ?
                (<>
                    <Typography variant="h6" className={classes.login}>
                        {username.user.name + ' ' + username.user.surname}
                    </Typography>
                    <Button onClick={onLogout}>Выйти</Button>
                </>) :
                (<>
                    <Button href='/registration'>Регистрация</Button>
                    <Button color="inherit" href='/authentication'>Войти</Button>
                </>)}
        </>
    );
}
