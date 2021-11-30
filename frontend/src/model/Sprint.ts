import {ProjectRole} from "./Project";
import {toDateString} from "../utils/utils";

export default class Sprint {
    constructor(public id: string = '', public startDate: string = toDateString(new Date()), public endDate: string = toDateString(new Date()),
                public goals: string = '', public presentationUrl = '', public comments: ResultComment[] = []) {
    }
}

export class ResultComment {
    constructor(public comment: string, public mentorName: string) {
    }
}

export class ProjectPlan {
    constructor(public plan: Sprint[], public projectTitle?: string, public role = ProjectRole.OWNER) {
    }
}
