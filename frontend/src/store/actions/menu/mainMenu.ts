import Action from "../../Action";
import {ActionType} from "../../ActionType";

export function openMainMenu() : Action<null> {
    return {
        type: ActionType.OpenMainMenu,
        payload: null
    };
}

export function closeMainMenu() : Action<null> {
    return {
        type: ActionType.CloseMainMenu,
        payload: null
    };
}

