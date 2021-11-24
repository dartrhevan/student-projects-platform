
import Action from "../Action";
import {ActionType} from "../ActionType";
import TagsReferenceState, { initState } from "../state/TagsReferenceState";
import Tag from "../../model/Tag";

export default function (state: TagsReferenceState = initState, action: Action<Tag[]>): TagsReferenceState {
    switch (action.type) {
        case ActionType.SetTagsRef:
            return {tags: action.payload as Tag[]};
        default:
            return state;
    }
}
