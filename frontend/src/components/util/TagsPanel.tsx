import React, {ChangeEvent, EventHandler, KeyboardEvent, KeyboardEventHandler, useState} from 'react';
import {Chip, makeStyles, TextField} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    chips: {
        flexGrow: 1,
        display: 'flex',
        alignItems: "center",
        flexWrap: 'wrap',
        margin: "10px"
    },
    chip: {
        margin: '5px 10px'
    },
    input: {
        margin: "10px",
        flexShrink: 0
    }
}));

interface ITagsPanelProps {
    onSetTag: (t: string[]) => void
}

export default function TagsPanel({onSetTag}: ITagsPanelProps) {
    const classes = useStyles();
    const [tags, setTags] = useState([] as string[]);
    const [tag, setTag] = React.useState('');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => setTag(event.target.value);


    const addTag = (e: KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Enter' && tag !== '') {
            if (!tags.includes(tag)) {
                const newTags = [...tags, tag];
                onSetTag(newTags)
                setTags(newTags);
            }
            setTag('');
        }
    };

    const handleDelete = (toDelete: string) => setTags(tags.filter(t => t !== toDelete));
    return (<>
        <TextField className={classes.input} label='Type tag' value={tag} onChange={handleChange} onKeyPress={addTag}/>

        <div className={classes.chips}>
            {tags.map(t => (<Chip label={t} key={t} variant="outlined" className={classes.chip}
                                  onDelete={() => handleDelete(t)}/>))}
        </div>
    </>)
}