export default class Sprint {
    constructor(public startDate: Date, public endDate: Date, public goalsDescription: string = '',
                public resultComment: string = '') {
    }
}

export class ProjectPlan {
    constructor(public projectTitle: string, public plan: Sprint[]) {
    }
}
