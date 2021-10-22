export default class Sprint {
    constructor(public id?: string, public startDate: Date = new Date(), public endDate: Date = new Date(),
                public goalsDescription: string = '', public resultComment: string = '') {
    }
}

export class ProjectPlan {
    constructor(public plan: Sprint[], public projectTitle?: string,
                public belongToWorkSpace: boolean = false, public owner: boolean = false) {
    }
}
