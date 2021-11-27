import React from 'react';
import {Button, IconButton, makeStyles, Paper, Tooltip} from "@material-ui/core";
import {Add} from "@material-ui/icons";
import WorkspaceSettings from "./WorkspaceSettings";
import TagsPanel from "../util/TagsPanel";
import clsx from "clsx";
import isMobile from "../../hooks/isMobile";
import Typography from "@material-ui/core/Typography";
import Tag from "../../model/Tag";
import THEME, {ElementsStyle} from "../../theme";

const useStyles = makeStyles(theme => ({
    queryPanel: {
        padding: '10px 15px',
        width: '100%',
        maxWidth: '80vw',
        display: 'flex',
        alignItems: 'center',
        ...ElementsStyle
    },
    mobilePanel: {
        // flexDirection: 'column',
        alignItems: 'center',
        flexWrap: "wrap"
    },
    addButton: {
        maxHeight: '70%',
        minHeight: '50px',
        width: '50px',
        flexShrink: 0
    },
    typ: {
        margin: '10px'
    }
}));

interface QueryProps {
    buttonTitle: string
    buttonOnClick: () => void
    showDialog: boolean
    showTags: boolean
    additionalButtons?: JSX.Element
    onSetTags?: (t: Tag[]) => void
    addButton?: boolean
}

export default function QueryPanel(
    {addButton = true, onSetTags = (s => {}), additionalButtons, buttonTitle, buttonOnClick, showDialog, showTags}: QueryProps) {
    const classes = useStyles();
    const mobile = isMobile();

    return (<Paper className={clsx({[classes.queryPanel]: true, [classes.mobilePanel]: mobile})}>
        {showTags ? <>
            <Typography className={classes.typ}>Введите тэги для поиска:</Typography>
            <TagsPanel onSetTag={onSetTags}/>
        </> : <div className={clsx({[classes.queryPanel]: true, [classes.mobilePanel]: mobile})}/>}
        {showDialog ? <WorkspaceSettings/> : <></>}
        {additionalButtons}

        {addButton ?
            (<Tooltip title={buttonTitle}>
                <IconButton className={classes.addButton} onClick={buttonOnClick}>
                    <Add/>
                </IconButton>
            </Tooltip>) : <></>}
    </Paper>)
}
