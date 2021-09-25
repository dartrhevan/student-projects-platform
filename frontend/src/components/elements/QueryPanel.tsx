import React, {ChangeEvent, EventHandler, KeyboardEvent, KeyboardEventHandler, useState} from 'react';
import {Button, Chip, Input, List, ListItem, makeStyles, Paper, TextField} from "@material-ui/core";
import DatePicker from '@mui/lab/DatePicker';
import {Add, PlusOne} from "@material-ui/icons";

const useStyles = makeStyles(theme => ({
    queryPanel: {
        padding: '10px 15px',
        width: '100%',
        maxWidth: '80vw',
        display: 'flex'
    },
    chips: {
        flexGrow: 1,
        display: 'flex',
        alignItems: "center",
        flexWrap: 'wrap'
    },
    chip: {
        margin: '5px 10px'
    }
}));

export default function QueryPanel() {
    const classes = useStyles();
    const [tags, setTags] = useState([] as string[]);
    const [tag, setTag] = React.useState('');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => setTag(event.target.value);


    const addTag = (e: KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Enter' && tag !== '') {
            if (!tags.includes(tag))
                setTags([...tags, tag]);
            setTag('');
        }
    };

    const handleDelete = (toDelete: string) => setTags(tags.filter(t => t !== toDelete));

    const [fromDate, setFromDate] = useState(null as Date | null);

    return (<Paper className={classes.queryPanel}>
        {/*<DatePicker*/}
        {/*label="From"*/}
        {/*value={fromDate}*/}
        {/*onChange={(newValue: Date | null) => setFromDate(newValue)}*/}
        {/*renderInput={(params: object) => <TextField {...params} />}/>*/}

        <TextField label='Type tag' value={tag} onChange={handleChange} onKeyPress={addTag}/>

        <div className={classes.chips}>
            {tags.map(t => (<Chip label={t} key={t} variant="outlined" className={classes.chip}
                                  onDelete={() => handleDelete(t)}/>))}
        </div>
        <Button variant='outlined'> <Add/> Добавить проект</Button>
    </Paper>)
}