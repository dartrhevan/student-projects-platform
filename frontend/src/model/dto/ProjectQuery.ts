import Pageable from "../Pageable";
import Query from "./Query";

export default class ProjectQuery extends Query {
    constructor(public tags: any[], public pageable: Pageable, public workspaceId: string,
                public showOnlyActive: boolean) {
        super(tags, pageable);
    }
}
