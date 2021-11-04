import DialogState from "../store/state/DialogState";
import {createSelector} from "reselect";

interface IDialogState {
    dialog: DialogState
}

export default createSelector(
    (state: IDialogState) => state.dialog,
    dialog => dialog.open
);