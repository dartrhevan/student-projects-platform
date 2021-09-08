import Action from "../../Action";
import {ActionType} from "../../ActionType";


export function openProjectMenu(projectId: string) : Action<string> {
    return {
        type: ActionType.OpenProjectMenu,
        payload: projectId
    };
}

export function closeProjectMenu() : Action<null> {
    return {
        type: ActionType.CloseProjectMenu,
        payload: null
    };
}