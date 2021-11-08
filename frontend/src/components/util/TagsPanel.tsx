import React, {KeyboardEvent, useEffect, useState} from 'react';
import {makeStyles, TextField} from "@material-ui/core";
import clsx from 'clsx';
import {Chip} from "@mui/material";
import Tag from "../../model/Tag";
import {getTagsReference} from "../../api/tags";

const useStyles = makeStyles(theme => ({
    chips: {
        flexGrow: 1,
        display: 'flex',
        alignItems: "center",
        flexWrap: 'wrap',
        margin: "10px",
        minWidth: '100px'
    },
    input: {
        margin: "10px",
        flexShrink: 0
    }
}));

interface ITagsPanelProps {
    onSetTag: (t: Tag[]) => void,
    label?: string,
    tagInputClasses?: string[]
    editable?: boolean
    values?: Tag[]
}

// const stub = () => {
// };

export default function TagsPanel({onSetTag, label = 'тэг', tagInputClasses = [], editable = true, values = []}: ITagsPanelProps) {
    const classes = useStyles();
    const [tagsReference, setTagsReference] = useState(values);
    const [tags, setTags] = useState(values);
    const [tag, setTag] = React.useState('');

    // useEffect(() => {
    //     setTags(values);
    // }, [values]);

    const v = values.map(t => t.text)[0]; //TODO: rewrite
    useEffect(() => {
        setTags(values);
        getTagsReference().then(r => setTagsReference(r.data));
    }, [v]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => setTag(event.target.value);
    console.log(values);
    const addTag = (e: KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Enter' && tag !== '') {
            if (!tags?.find(t => t.text === tag)) {
                let newTag = tagsReference?.find(t => t.text === tag);
                if (newTag === undefined) {
                    newTag = new Tag(tag);
                }
                const newTags = [...tags, newTag];
                onSetTag(newTags)
                setTags(newTags);
            }
            setTag('');
        }
    };

    const handleDelete = (toDelete: string) => setTags(tags?.filter(t => t.text !== toDelete));

    return (
        <>
            {editable ? (<TextField className={clsx(classes.input, ...tagInputClasses)} label={`Введите ${label}`}
                                    value={tag} onChange={handleChange} onKeyPress={addTag}/>) : (<></>)}

            <div className={classes.chips}>
                {tags.map(t => (<Chip label={t.text} key={t.text} variant="outlined"
                                      sx={{backgroundColor: t.backgroundColor, color: t.fontColor, margin: '5px 10px'}}
                                      onDelete={editable ? () => handleDelete(t.text) : undefined}/>))}
            </div>
        </>)
}
