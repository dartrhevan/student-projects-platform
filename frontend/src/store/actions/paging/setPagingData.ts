import Action from "../../Action";
import {ActionType} from "../../ActionType";
import PagingState from "../../state/PagingState";

export function setPage(page: number) : Action<number> {
    return {
        type: ActionType.SetPage,
        payload: page
    };
}

export function setPageSize(pageSize: number) : Action<number> {
    return {
        type: ActionType.SetPageSize,
        payload: pageSize
    };
}

export function initPaging(totalCount: number, pageSize: number, pageNumber: number = 0) : Action<PagingState> {
    return {
        type: ActionType.InitPaging,
        payload: new PagingState(totalCount, pageSize, pageNumber)
    };
}
