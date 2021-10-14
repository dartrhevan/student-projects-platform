import React from 'react';
import {Card, CardActionArea, CardContent, makeStyles} from "@material-ui/core";
import ListItemProps from "../../props.common/ListItemProps";
import Centered from "../util/Centered";
import {useDispatch} from "react-redux";

const useStyles = makeStyles(theme => ({
    root: {
        width: '150px',
        height: '150px',
        margin: "30px",
        cursor: "pointer",
        boxShadow: "0 0 5px 5px rgba(50, 50, 50, 0.15)",
    },
    area: {
        width: '100%',
        height: '100%'
    }
}));

interface ProjectBadgeProp extends ListItemProps {
    id: string,
    title: string
    href?: string
}

export default function DefaultBadge({id, title, href}: ProjectBadgeProp) {
    const classes = useStyles();
    const dispatch = useDispatch();
    // const onClick = () => {
    //     dispatch(openProjectMenuAction(id)); //TODO: change
    // };
    return (
        <Card className={classes.root}>
            <CardActionArea className={classes.area} href={href as string}>
                <CardContent>
                    <Centered>
                        {title}
                    </Centered>
                </CardContent>
            </CardActionArea>
        </Card>);
}
