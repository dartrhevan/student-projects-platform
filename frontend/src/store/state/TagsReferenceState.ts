import Tag from "../../model/Tag";

export default class TagsReferenceState {
    public constructor(public tags: Tag[] = []) {
    }
}

export const initState = new TagsReferenceState();
