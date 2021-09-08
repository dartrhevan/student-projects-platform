import {ActionType} from "./ActionType";

// export default class Action<T> {
//     constructor(public type: ActionType, public payload: T) {
//     }
// }
export default interface Action<T> {
    type: ActionType
    payload: T
}