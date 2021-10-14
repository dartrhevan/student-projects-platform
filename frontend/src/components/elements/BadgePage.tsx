import React from 'react';
import {Container, makeStyles, Typography} from "@material-ui/core";
import QueryPanel from "./QueryPanel";
import Centered from "../util/Centered";
import DefaultBadge from "./DefaultBadge";
import PagingPanel from "./PagingPanel";

const useStyles = makeStyles(theme => ({
    main: {
        display: "flex",
        flexWrap: "wrap",
        flexDirection: "row",
        alignItems: "start",
    },
    query: {
        padding: '10px'
    },
    title: {
        margin: '45px 0 10px 0'
    }
}));

interface IBadge {
    id: string
}

interface BadgePageProps<T extends IBadge> {
    badgeData: T[]
    onBadgeClick?: ((badge: T) => void)
    href?: ((id: string) => string)
    title: string
}

export default function BadgePage<T extends  IBadge>({badgeData, onBadgeClick, title, href}: BadgePageProps<T>) {
    const classes = useStyles();

    console.log("render Projects")

    return (
        <>
            <Typography className={classes.title} variant='h3'>{title}</Typography>
            <QueryPanel />
            <Container>
                <Centered row={true} additionalClasses={[classes.main]}>
                    {badgeData.map(s => <DefaultBadge key={s.id} id={s.id} title={s.id} href={href ? href(s.id) : undefined} />)}
                </Centered>
            </Container>
            <PagingPanel />
        </>);
}
