import LogState, {initState, LogLevel} from "../../state/LogState";
import Action from "../../Action";
import {ActionType} from "../../ActionType";

export function info(text: any): Action<LogState> {
    return {
        type: ActionType.ShowMessage,
        payload: new LogState(text.toString(), LogLevel.INFO)
    };
}

export function warn(text: any): Action<LogState> {
    return {
        type: ActionType.ShowMessage,
        payload: new LogState(text.toString(), LogLevel.WARNING)
    };
}

export function error(text: any): Action<LogState> {
    return {
        type: ActionType.ShowMessage,
        payload: new LogState(text.toString(), LogLevel.ERROR)
    };
}

export function success(text: any): Action<LogState> {
    return {
        type: ActionType.ShowMessage,
        payload: new LogState(text.toString(), LogLevel.SUCCESS)
    };
}

export function hide(): Action<LogState> {
    return {
        type: ActionType.HideMessage,
        payload: initState
    };
}
