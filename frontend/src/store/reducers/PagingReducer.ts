
import {ActionType} from "../ActionType";
import PagingState, {initState} from "../state/PagingState";
import Action from "../Action";

export default function (state: PagingState = initState, action: Action<number | PagingState>): PagingState {
    switch (action.type) {
        case ActionType.SetPage:
            return {...state, pageNumber: action.payload as number};
        case ActionType.InitPaging:
            return action.payload as PagingState; //{...state, mainMenuOpen: false};
        default:
            return state;
    }
}