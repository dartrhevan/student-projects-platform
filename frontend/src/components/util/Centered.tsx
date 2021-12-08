import React from 'react';
import {Container, makeStyles} from "@material-ui/core";
import clsx from "clsx";

const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        // padding: '1%',
        flexGrow: 1
    },
    row: {
        flexDirection: 'row'
    },
    column: {
        flexDirection: 'column'
    }
}));

interface CenteredProps extends React.PropsWithChildren<any> {
    additionalClasses?: string[],
    row?: boolean
}

export default function Centered({children, row, additionalClasses}: CenteredProps) {
    const classes = useStyles();
    return (
        <Container className={clsx({
            [clsx(classes.container, additionalClasses)]: true,
            [classes.row]: row,
            [classes.column]: !row
        })}>
            {children}
        </Container>
    );
}
