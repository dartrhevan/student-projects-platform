import React, {useEffect} from 'react';
import {Container, makeStyles, Paper, Typography} from "@material-ui/core";
import QueryPanel from "./QueryPanel";
import Centered from "../util/Centered";
import DefaultBadge from "./DefaultBadge";
import PagingPanel from "./PagingPanel";
import PagingState from "../../store/state/PagingState";
import {useDispatch} from "react-redux";
import {initPaging, setPage} from "../../store/actions/paging/setPagingData";


const useStyles = makeStyles(theme => ({
    main: {
        display: "flex",
        flexWrap: "wrap",
        flexDirection: "row",
        alignItems: "start",
    },
    query: {
        // margin: '2% 0 0 0'
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
            {/*<ProjectMenu />*/}
            <QueryPanel />
            <Container>
                <Centered row={true} additionalClasses={[classes.main]}>
                    {badgeData.map(s => <DefaultBadge key={s.id} id={s.id} title={s.id} href={href ? href(s.id) : undefined} />)}
                </Centered>
            </Container>
            <PagingPanel />
        </>);
}