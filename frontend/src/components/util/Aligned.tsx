import React, {ReactChildren} from 'react';
import clsx from 'clsx';
import {Container, makeStyles} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    main: {
        display: 'flex',
        flexDirection: "row",
        alignItems: 'center',
    },
    startAlign: {
        justifyContent: 'start'
    },
    endAlign: {
        justifyContent: 'flex-end'
    }
}));

interface Props {
    endAlign?: boolean
}

export default function Aligned({children, endAlign}: React.PropsWithChildren<Props>) {
    const styles = useStyles();
    return (
        <Container className={clsx({
            [styles.main]: true,
            [styles.startAlign]: !endAlign,
            [styles.endAlign]: endAlign
        })}>{children as ReactChildren}</Container>
    );
};