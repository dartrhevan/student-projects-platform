import Action from "../../Action";
import {ActionType} from "../../ActionType";


export function openProjectMenuAction(projectId: string) : Action<string> {
    return {
        type: ActionType.OpenProjectMenu,
        payload: projectId
    };
}

export function closeProjectMenuAction() : Action<null> {
    return {
        type: ActionType.CloseProjectMenu,
        payload: null
    };
}