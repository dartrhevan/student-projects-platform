import React from 'react';
import {Container, makeStyles, Typography} from "@material-ui/core";
import QueryPanel from "./QueryPanel";
import Centered from "../util/Centered";
import DefaultBadge from "./DefaultBadge";
import PagingPanel from "./PagingPanel";
import {IBadge} from "../../props.common/ListItemProps";
import CheckBoxGroup from "../util/CheckBoxGroup";
import CheckBoxInfo from "../../model/CheckBoxInfo";

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

interface BadgePageProps<T extends IBadge> {
    badgeData: T[]
    onBadgeClick?: ((badge: T) => void)
    href?: ((id: string) => string)
    title: string
    squared?: boolean
    checkBoxes?: CheckBoxInfo[]
}

export default function BadgePage<T extends IBadge>({checkBoxes, badgeData, title, href, squared = true}: BadgePageProps<T>) {
    const classes = useStyles();

    console.log("render Projects")
//[{title: 'LALA', onChange: b => {}}]
    return (
        <>
            <Typography className={classes.title} variant='h3'>{title}</Typography>
            <QueryPanel/>
            {checkBoxes ? <CheckBoxGroup checkBoxes={checkBoxes}/> : <></>}
            <Container>
                <Centered row={true} additionalClasses={[classes.main]}>
                    {badgeData.map(s => <DefaultBadge key={s.id} description={s.description} squared={squared}
                                                      tags={s.tags} id={s.id} title={s.title}
                                                      href={href ? href(s.id) : undefined}/>)}
                </Centered>
            </Container>
            <PagingPanel/>
        </>);
}
