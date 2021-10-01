
import Action from "../Action";
import {ActionType} from "../ActionType";
import DialogState, {initState} from "../state/DialogState";

export default function (state: DialogState = initState, action: Action<undefined>): DialogState {//TODO: add different state for many dialogs
    switch (action.type) {
        case ActionType.CloseDialog:
            return {open: false};
        case ActionType.OpenDialog:
            return {open: true};
        default:
            return state;
    }
}