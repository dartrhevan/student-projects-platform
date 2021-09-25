import Pageable from "./Pageable";

export default class Query {
    constructor(public tags: string[], pageable: Pageable, public dateFrom?: Date, public dateTo?: Date) {
    }
}