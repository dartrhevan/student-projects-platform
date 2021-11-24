import Action from "../Action";
import {ActionType} from "../ActionType";
import LogState, {initState} from "../state/LogState";

export default function (state: LogState = initState, action: Action<LogState>) {
    switch (action.type) {
        case ActionType.ShowMessage:
            return action.payload;
        case ActionType.HideMessage:
            return initState;
        default:
            return state;
    }
}
