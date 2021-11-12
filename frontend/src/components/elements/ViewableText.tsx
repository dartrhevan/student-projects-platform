import React, {useState} from 'react';
import {Button, Card, CardActionArea, Dialog, DialogActions, DialogContent, TextField, Typography} from "@mui/material";
import {getOnFieldChange} from "../../utils/utils";

interface ViewableTextProps {
    // text: string
    maxWidth: number
    editable?: boolean
    submit?: (value: string) => void
    label?: string
}

export default function ({children, maxWidth, editable = false, submit, label}: React.PropsWithChildren<ViewableTextProps>) {
    const [openDialog, setOpenDialog] = useState(false);
    const [value, setValue] = useState(children?.toString());

    function close() {
        setOpenDialog(false);
    }

    function open() {
        setOpenDialog(true);
    }


    function onSubmit() {
        if (submit && value) {
            submit(value.toString());
            close();
        }
    }

    return (
        <>
            <CardActionArea component='div' onClick={open}
                            style={{
                                width: maxWidth, height: '30px',
                                padding: '1px 4px', overflow: 'hidden', cursor: 'pointer'
                            }}>
                {children}
            </CardActionArea>
            <Dialog open={openDialog} onClose={close}>
                <DialogContent dividers>
                    <TextField variant="outlined" onChange={getOnFieldChange(setValue)}
                               value={value} disabled={!editable} label={label}/>
                         {/*<Typography style={{padding: '20px'}} variant='body1'>{children}</Typography>}*/}
                </DialogContent>
                <DialogActions>
                    {editable ? <Button sx={{marginTop: '10px'}} onClick={onSubmit}>Сохранить</Button> : <></>}
                    <Button sx={{marginTop: '10px'}} onClick={close}>Закрыть</Button>
                </DialogActions>
            </Dialog>
        </>)
}
