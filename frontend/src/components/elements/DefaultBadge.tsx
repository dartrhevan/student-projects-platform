import React from 'react';
import {Card, CardActionArea, CardContent, makeStyles} from "@material-ui/core";
import ListItemProps, {IBadge} from "../../props.common/ListItemProps";
import Centered from "../util/Centered";
import {useDispatch} from "react-redux";
import {Typography} from "@mui/material";
import Dot from "../util/Dot";
import clsx from 'clsx';

const useStyles = makeStyles(theme => ({
    root: {
        margin: "30px",
        cursor: "pointer",
        boxShadow: "0 0 5px 5px rgba(50, 50, 50, 0.15)",
    },
    area: {
        width: '100%',
        height: '100%'
    },
    squared: {
        width: '150px',
        height: '150px',
    },
    rectangle: {
        width: '300px',
        height: '200px',
    },
    description: {
        flexGrow: 1
    },
    card: {
        display: 'flex',
        height: '80%',
        flexGrow: 1,
        flexDirection: 'column'
    }
}));

interface ProjectBadgeProp extends ListItemProps, IBadge {
    href?: string,
    squared?: boolean,
}

export default function DefaultBadge({id, title, href, description, tags, label, labelColor, squared = true}: ProjectBadgeProp) {
    const classes = useStyles();
    const dispatch = useDispatch();
    // const onClick = () => {
    //     dispatch(openProjectMenuAction(id)); //TODO: change
    // };
    return (
        <Card className={clsx({[classes.root]: true, [classes.squared]: squared, [classes.rectangle]: !squared})}>
            <CardActionArea className={classes.area} href={href as string}>
                <CardContent className={classes.card}>
                    <Centered className={classes.description}>
                        <Typography variant='h6'>{title}</Typography>
                        <br/>
                        <Typography className={classes.description} variant='subtitle2'>{description}</Typography>
                        <br/>
                    </Centered>
                    {tags?.map(t => <Dot key={t.name} color={t.backgroundColor}/>)}
                    <Typography sx={{color: labelColor}} variant='subtitle2' align='right'>{label}</Typography>
                </CardContent>
            </CardActionArea>
        </Card>);
}
