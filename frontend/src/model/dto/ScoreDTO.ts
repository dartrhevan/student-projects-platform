export default class ScoreDTO {
    constructor(public projectId: string, public projectTitle: string, public mentor: string,
                public scores: number[]) {
    }
}

// export class Score {
//     constructor(public value: number, public comment?: string) {
//     }
// }
