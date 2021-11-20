import {ActionType} from "./ActionType";

export default interface Action<T> {
    type: ActionType
    payload: T
}
