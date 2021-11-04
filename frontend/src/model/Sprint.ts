import {ProjectRole} from "./Project";

export default class Sprint {
    constructor(public id: string, public scores: number[] = [], public startDate: Date = new Date(), public endDate: Date = new Date(),
                public goalsDescription: string = '', public presentationUrl = '', public resultComment: string = '') {
    }
}

export class ProjectPlan {
    constructor(public plan: Sprint[], public projectTitle?: string, public role = ProjectRole.OWNER,
                public belongToWorkSpace: boolean = false) {
    }
}
