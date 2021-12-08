import React, {KeyboardEvent, useEffect, useState} from 'react';
import {makeStyles, TextField} from "@material-ui/core";
import clsx from 'clsx';
import {Chip} from "@mui/material";
import Tag from "../../model/Tag";
import {addTagToReference, getTagsReference} from "../../api/reference";
import {useDispatch, useSelector} from "react-redux";
import getTagsRef from "../../hooks/getTagsRef";
import {setTagsRef} from "../../store/actions/tags/tags";

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

export default function TagsPanel(
    {
        onSetTag,
        label = 'тэг',
        tagInputClasses = [],
        editable = true,
        values = []
    }: ITagsPanelProps) {
    const classes = useStyles();

    const tagsReference = useSelector(getTagsRef);
    const dispatch = useDispatch();

    const [tags, setTags] = useState(values);
    const [tag, setTag] = React.useState('');

    const v = values.map(t => t.name)[0];

    function setTagsReference(r: Tag[]) {
        dispatch(setTagsRef(r));
    }

    useEffect(() => {
        setTags(values);
    }, [v]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => setTag(event.target.value);
    console.log(values);
    const addTag = (e: KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Enter' && tag !== '') {
            if (!tags?.find(t => t.name === tag)) {
                let newTag = tagsReference?.find(t => t.name === tag);
                if (newTag === undefined) {
                    newTag = new Tag(-1, tag);
                    addTagToReference(newTag.name, newTag.color)
                        .then(r => {
                            (newTag as Tag).id = r.data;
                            const newTags = [...tags, newTag as Tag];
                            onSetTag(newTags);
                            setTags(newTags);
                            setTagsReference([...tagsReference, newTag as Tag])
                        }).catch(console.log);//TODO: catch
                } else {
                    const newTags = [...tags, newTag as Tag];
                    onSetTag(newTags);
                    setTags(newTags);
                }
            } else {
            }
            setTag('');
        }
    };

    const handleDelete = (toDelete: string) => {
        const newTags = tags?.filter(t => t.name !== toDelete);
        setTags(newTags);
        onSetTag(newTags);
    };

    return (
        <>
            {editable ? (<TextField className={clsx(classes.input, ...tagInputClasses)} label={`Введите ${label}`}
                                    value={tag} onChange={handleChange} onKeyPress={addTag}/>) : (<></>)}

            <div className={classes.chips}>
                {tags.map(t => (<Chip label={t.name} key={t.name} variant="outlined"
                                      sx={{backgroundColor: t.backgroundColor, color: t.fontColor, margin: '5px 10px'}}
                                      onDelete={editable ? () => handleDelete(t.name) : undefined}/>))}
            </div>
        </>);
}
