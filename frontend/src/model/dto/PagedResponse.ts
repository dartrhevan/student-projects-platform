import GenericResponse from "./GenericResponse";

export default class PagedResponse<T> extends GenericResponse<T> {
    constructor(public data: T, public page: number, public totalCount: number, message?: string) {
        super(data, message);
    }
}
