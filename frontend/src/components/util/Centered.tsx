import React from 'react';
import {Container, makeStyles} from "@material-ui/core";
import clsx from "clsx";

const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '5%',
        flexDirection: 'column',
        flexGrow: 1
    }
}));

interface CenteredProps extends React.PropsWithChildren<any> {
    additionalClasses?: string[]
}

export default function Centered({children, additionalClasses}: CenteredProps) {
    const classes = useStyles();
    return (
        <Container className={clsx(classes.container, additionalClasses)}>
            {children}
        </Container>
    );
}