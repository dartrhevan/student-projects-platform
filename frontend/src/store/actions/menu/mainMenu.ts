import Action from "../../Action";
import {ActionType} from "../../ActionType";

export function openMainMenuAction() : Action<null> {
    return {
        type: ActionType.OpenMainMenu,
        payload: null
    };
}

export function closeMainMenuAction() : Action<null> {
    return {
        type: ActionType.CloseMainMenu,
        payload: null
    };
}

