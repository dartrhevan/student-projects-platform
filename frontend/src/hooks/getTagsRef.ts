import {createSelector} from "reselect";
import TagsReferenceState from "../store/state/TagsReferenceState";

interface ITagsState {
    tags: TagsReferenceState
}

export default createSelector(
    ({tags}: ITagsState) => tags,
    tags => tags.tags
);


export const getTagsReferenceMap = createSelector(
    ({tags}: ITagsState) => tags,
    tags => tags.tags.reduce((m: any ,t, i) => {
        m[t.id.toString()] = t;
        return m;
    }, {})
);
