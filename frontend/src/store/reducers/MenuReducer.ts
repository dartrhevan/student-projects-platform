import {ActionType} from "../ActionType";
import Action from "../Action";
import MenuState, {initState} from "../state/MenuState";

export default function (state: MenuState = initState, action: Action<string | undefined>): MenuState {
    switch (action.type) {
        case ActionType.OpenMainMenu:
            return {...state, mainMenuOpen: true};
        case ActionType.CloseMainMenu:
            return {...state, mainMenuOpen: false};
        case ActionType.OpenProjectMenu:
            return {...state, projectId: action.payload};
        case ActionType.CloseProjectMenu:
            return {...state, projectId: undefined};
        default:
            return state;
    }
}