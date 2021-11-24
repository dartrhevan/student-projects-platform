import React from 'react';
import {Dialog, DialogActions, DialogContent, DialogTitle, TextField} from "@mui/material";
import Centered from "./Centered";
import {Button} from "@material-ui/core";

interface ConfirmProps {
    onSubmit: () => void
    open: boolean
    onClose: () => void
    label: string
}

export default function ({onSubmit, open, onClose, label}: ConfirmProps) {
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Вы уверены, что хотите {label}?</DialogTitle>
            <DialogActions>
                <Button onClick={onSubmit}>
                    Подтвердить
                </Button>
                <Button onClick={onClose}>
                    Отмена
                </Button>
            </DialogActions>
        </Dialog>)
}
