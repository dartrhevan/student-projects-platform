import Action from "../../Action";
import {ActionType} from "../../ActionType";

export function openDialog(): Action<undefined> {
    return {
        type: ActionType.OpenDialog,
        payload: undefined
    }
}

export function closeDialog(): Action<undefined> {
    return {
        type: ActionType.CloseDialog,
        payload: undefined
    }
}