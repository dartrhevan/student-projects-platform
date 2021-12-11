import {Avatar, Card, CardActionArea, CardContent, Paper, Typography} from '@mui/material';
import React from 'react';
import THEME, {ElementsStyle} from "../../theme";
import {makeStyles} from "@material-ui/core";

interface DescriptionProps {
    icon: React.ReactNode
    reversed?: boolean
    href?: string
    small?: boolean
}

const useStyles = makeStyles(theme => ({
    area: {
        width: '100%',
        height: '100%',
    }
}));

export default function ActiveDescriptionElement({href, small = false, reversed = false, children, icon
    }: React.PropsWithChildren<DescriptionProps>) {
    const classes = useStyles();
    const cursor = href === undefined ? 'default' : 'pointer';
    return (<Card sx={{
        margin: small ? '10px' : '20px',
        width: small ? 'fit-content' : '90%',
        alignItems: 'center', ...ElementsStyle
    }} onClick={() => {
        if (href) window.location.href = href as string;
    }}>
        <CardActionArea className={classes.area} sx={{cursor}}>
            <CardContent sx={{
                display: 'flex',
                width: small ? 'fit-content' : '90%',
                height: !small ? 'auto' : '100%',
                padding: small ? '5px' : '15px',
                flexDirection: (reversed ? 'row-reverse' : 'row')
            }}>
                <Avatar sx={{width: small ? '45px' : '75px', height: small ? '45px' : '75px'}}>
                    {icon}
                </Avatar>
                <Typography align='center' variant={small ? 'body1' : 'h5'} sx={{margin: '10px', flexGrow: 1}}>
                    {children}
                </Typography>
            </CardContent>
        </CardActionArea>
    </Card>)
}
