export default class PagingState {
    public constructor(public totalCount: number, public pageSize: number, public pageNumber: number/*, public pageData: object[]*/) { //TODO: rename and change page data
    }
}

export const initState = new PagingState(0, 0, 0);