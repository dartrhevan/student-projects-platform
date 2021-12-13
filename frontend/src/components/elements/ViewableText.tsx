import React, {useEffect, useState} from 'react';
import {Button, CardActionArea, Dialog, DialogActions, DialogContent, TextField} from "@mui/material";
import {getOnFieldChange} from "../../utils/utils";

interface ViewableTextProps {
    maxWidth: number
    editable?: boolean
    submit?: (value: string) => void
    label?: string
    multiline?: boolean
}

export default function ({
                             children,
                             maxWidth,
                             editable = false,
                             multiline = false,
                             submit,
                             label
                         }: React.PropsWithChildren<ViewableTextProps>) {
    const [openDialog, setOpenDialog] = useState(false);
    const [value, setValue] = useState(children?.toString() || '');

    useEffect(() => {
        setValue(children?.toString() || '');
    }, [children]);

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
                <DialogContent dividers sx={{minWidth: '300px'}}>
                    <TextField variant="outlined" fullWidth onChange={getOnFieldChange(setValue)} multiline={multiline}
                               value={value} disabled={!editable} label={label}/>
                </DialogContent>
                <DialogActions>
                    {editable ? <Button sx={{marginTop: '10px'}} onClick={onSubmit}>Сохранить</Button> : <></>}
                    <Button sx={{marginTop: '10px'}} onClick={close}>Закрыть</Button>
                </DialogActions>
            </Dialog>
        </>)
}
