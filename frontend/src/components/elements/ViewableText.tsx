import React, {useState} from 'react';
import {Button, Card, CardActionArea, Dialog, Typography} from "@mui/material";

interface ViewableTextProps {
    // text: string
    maxWidth: number
}

export default function ({children, maxWidth}: React.PropsWithChildren<ViewableTextProps>) {
    const [openDialog, setOpenDialog] = useState(false);

    function close() {
        setOpenDialog(false);
    }

    function open() {
        setOpenDialog(true);
    }


    return (
        <>
            <CardActionArea component='div' onClick={open}
                  style={{maxWidth: maxWidth, maxHeight: '30px',
                      padding: '1px 4px', overflow: 'hidden', cursor: 'pointer'}}>
                {children}
            </CardActionArea>
            <Dialog open={openDialog} onClose={close}>
                <Typography style={{padding: '20px'}} variant='body1'>{children}</Typography>
                <Button sx={{marginTop: '10px'}} onClick={close}>Закрыть</Button>
            </Dialog>
        </>)
}
