import React from 'react';
import {Container, makeStyles, Typography} from "@material-ui/core";
import QueryPanel from "./QueryPanel";
import Centered from "../util/Centered";
import DefaultBadge from "./DefaultBadge";
import PagingPanel from "./PagingPanel";
import {IBadge} from "../../props.common/ListItemProps";
import CheckBoxGroup from "../util/CheckBoxGroup";
import CheckBoxInfo from "../../model/CheckBoxInfo";
import Tag from "../../model/Tag";

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
    href?: ((id: IBadge) => string)
    title: string
    squared?: boolean
    checkBoxes?: CheckBoxInfo[]
    addTitle: string
    addOnClick: () => void
    // onDialogSubmitted?: (ti: string, d: string, t: Tag[], p: string[]) => void
    showDialog?: boolean
    showTags?: boolean
}

export default function BadgePage<T extends IBadge>(
    {checkBoxes, badgeData, title, href, addTitle, addOnClick, squared = true, showDialog = false, showTags = true}: BadgePageProps<T>) {
    const classes = useStyles();

    return (
        <>
            <Typography className={classes.title} variant='h3'>{title}</Typography>
            <QueryPanel buttonTitle={addTitle} buttonOnClick={addOnClick} showTags={showTags} showDialog={showDialog}/>
            {checkBoxes ? <CheckBoxGroup checkBoxes={checkBoxes}/> : <></>}
            <Container>
                <Centered row={true} additionalClasses={[classes.main]}>
                    {badgeData.map(s => <DefaultBadge key={s.id} description={s.description} squared={squared}
                                                      tags={s.tags} id={s.id} title={s.title}
                                                      label={s.label} labelColor={s.labelColor}
                                                      href={href ? href(s) : undefined}/>)}
                </Centered>
            </Container>
            <PagingPanel/>
        </>);
}
