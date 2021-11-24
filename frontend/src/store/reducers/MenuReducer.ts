import {ActionType} from "../ActionType";
import Action from "../Action";
import MenuState, {initState} from "../state/MenuState";

export default function (state: MenuState = initState, action: Action<string | undefined>): MenuState {
    switch (action.type) {
        case ActionType.OpenMainMenu:
            return {...state, mainMenuOpen: true};
        case ActionType.CloseMainMenu:
            return {...state, mainMenuOpen: false};
        default:
            return state;
    }
}
