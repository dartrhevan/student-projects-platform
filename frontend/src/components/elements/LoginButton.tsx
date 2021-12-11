import React from 'react';
// import {logout} from '../../api/auth';
import {useDispatch, useSelector} from "react-redux";
import getUsername from "../../hooks/getUsername";
import {Button, makeStyles, Typography} from "@material-ui/core";
import logoutAction from "../../store/actions/auth/logoutAction";
import {Link} from "@mui/material";

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
        margin: '0 15px',
        cursor: 'pointer'
    },
    bar: {
        colorDefault: "#cbcbcb"
    },
    button: {
        wordBreak: 'break-word'
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
                    <Link href='/profile' underline="hover" color='inherit' variant="h6" TypographyClasses={classes.login}>
                        {username?.user?.name + ' ' + username?.user?.surname}
                    </Link>
                    <Button color="inherit" onClick={onLogout}>Выйти</Button>
                </>) :
                (<>
                    <Button className={classes.button} color="inherit" href='/registration'>Регистрация</Button>
                    <Button className={classes.button} color="inherit" href='/authentication'>Вход</Button>
                </>)}
        </>
    );
}
