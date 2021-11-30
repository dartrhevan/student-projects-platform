import {Avatar, Card, CardActionArea, CardContent, Paper, Typography} from '@mui/material';
import React from 'react';
import {ElementsStyle} from "../../theme";
import {makeStyles} from "@material-ui/core";

interface DescriptionProps {
    icon: React.ReactNode
    reversed?: boolean
    href?: string
}
const useStyles = makeStyles(theme => ({
    area: {
        width: '100%',
        height: '100%',
    }
}));

export default function DescriptionElement({href, reversed = false, children, icon}: React.PropsWithChildren<DescriptionProps>) {
    const classes = useStyles();
    const cursor = href === undefined ? 'default' : 'pointer';
    return (<Card sx={{
        margin: '20px',
        width: '90%',
        alignItems: 'center', ...ElementsStyle
    }}  onClick={() => {if (href) window.location.href = href as string;}}>
        <CardActionArea className={classes.area} sx={{cursor}}>
            <CardContent sx={{
                display: 'flex',
                width: '90%',
                height: '100%',
                padding: '15px',
                flexDirection: (reversed ? 'row-reverse' : 'row')}}>
                <Avatar sx={{width: '75px', height: '75px'}}>
                    {icon}
                </Avatar>
                <Typography align='center' variant='h5' sx={{margin: '10px', flexGrow: 1}}>
                    {children}
                </Typography>
            </CardContent>
        </CardActionArea>
    </Card>)
}
