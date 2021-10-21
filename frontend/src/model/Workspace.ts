import {ProjectPlan} from "./Sprint";

export default class Workspace {
    constructor(public id: string, public title: string/*, public stPlan: ProjectPlan, public isPrivate: boolean = false*/) {
    }
}
