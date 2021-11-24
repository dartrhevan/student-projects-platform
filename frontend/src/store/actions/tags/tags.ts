import Tag from "../../../model/Tag";
import Action from "../../Action";
import {ActionType} from "../../ActionType";

export function setTagsRef(tags: Tag[]): Action<Tag[]> {
    return {
        type: ActionType.SetTagsRef,
        payload: tags
    }
}
