import {createSelector} from "reselect";
import PagingState from "../store/state/PagingState";

interface IPageState {
    paging: PagingState
}

export default createSelector(
    ({paging}: IPageState) => paging,
    state => state
);
