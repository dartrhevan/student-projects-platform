import {Avatar, Card, CardActionArea, CardContent, CssBaseline, Divider, Paper, Typography} from '@mui/material';
import React from 'react';
import {ElementsStyle} from "../../theme";
import {makeStyles} from "@material-ui/core";

interface DescriptionProps {
    icon: React.ReactNode
}


export default function DescriptionElement({children, icon}: React.PropsWithChildren<DescriptionProps>) {
    return (
        <div style={{
            margin: '5px',
            padding: '5px 5px 5px 30px',
            width: '90%',
            alignItems: 'center',
            display: 'flex',
            ...ElementsStyle
        }}>
            <Avatar sx={{width: '75px', height: '75px'}}>
                {icon}
            </Avatar>
            <Typography align='center' variant='h5' sx={{margin: '10px 0', flexGrow: 1}}>
                {children}
            </Typography>
        </div>)
}
