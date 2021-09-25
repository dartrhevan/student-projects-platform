import Pageable from "./Pageable";
import Query from "./Query";

export default class ProjectQuery extends Query {
    constructor(public tags: string[], pageable: Pageable, public workspaceId: string, public dateFrom?: Date, public dateTo?: Date) {
        super(tags, pageable, dateFrom, dateTo);
    }
}