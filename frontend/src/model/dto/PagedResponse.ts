import GenericResponse from "./GenericResponse";
import {QueryResult} from "material-table";

export default class PagedResponse<T extends object> extends GenericResponse<T[]> implements QueryResult<T> {
    constructor(public data: T[], public page: number, public totalCount: number, message?: string) {
        super(data, message);
    }
}
