import {ProjectPlan} from "./Sprint";

export default class Workspace {
    constructor(public id: string, public title: string/*, public stPlan: ProjectPlan, public isPrivate: boolean = false*/) {
    }
}

export class WorkspaceSettings {
    constructor(public id: string, public title: string, public sprintsCount: number,
                public sprintsLength: number, public startDate: Date, public endDate: Date) {
    }
}
