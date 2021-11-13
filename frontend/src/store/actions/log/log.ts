import LogState, {initState, LogLevel} from "../../state/LogState";
import Action from "../../Action";
import {ActionType} from "../../ActionType";

export function info(text: string): Action<LogState> {
    return {
        type: ActionType.ShowMessage,
        payload: new LogState(text, LogLevel.INFO)
    };
}

export function warn(text: string): Action<LogState> {
    return {
        type: ActionType.ShowMessage,
        payload: new LogState(text, LogLevel.WARNING)
    };
}

export function error(text: string): Action<LogState> {
    return {
        type: ActionType.ShowMessage,
        payload: new LogState(text, LogLevel.ERROR)
    };
}

export function success(text: string): Action<LogState> {
    return {
        type: ActionType.ShowMessage,
        payload: new LogState(text, LogLevel.SUCCESS)
    };
}

export function hide(): Action<LogState> {
    return {
        type: ActionType.HideMessage,
        payload: initState
    };
}
