import React from 'react';
import {useSelector} from "react-redux";
import getUsername from "../../hooks/getUsername";
import {Button, makeStyles, Typography} from "@material-ui/core";

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
        flexShrink: 2
    },
    bar: {
        // colorPrimary: "#cbcbcb",
        // colorSecondary: "#cbcbcb",
        colorDefault: "#cbcbcb"
    }
}));

export default function LoginButton() {
    const classes = useStyles();
    const username = useSelector(getUsername);
    return (
        <>
            {username ?
                (<>
                    <Typography variant="h6" className={classes.login}> {username}</Typography>
                    <Button>Log out</Button>
                </>) :
                (<>
                    <Button href='/registration'>Sign up</Button>
                    <Button color="inherit" href='/authentication'>Login</Button>
                </>)}
        </>
    );
}