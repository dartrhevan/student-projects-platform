import GenericResponse from "../model/dto/GenericResponse";
import Score from "../model/Score";
import CommonResponse from "../model/dto/CommonResponse";
import ScoreDTO from "../model/dto/ScoreDTO";

export function getScores(workspaceId: string) {
    //TODO; implement
    return new Promise<GenericResponse<ScoreDTO[]>>(res => res(new GenericResponse(
        [new ScoreDTO('Project Activities', "VT", [2, 3, 4])])));
}

export function getEvaluateTable(workspaceId: string) {
    //TODO: implement
    return new Promise<GenericResponse<Score[]>>(res => res(
        new GenericResponse<Score[]>([new Score('1', 'Team', 'Jack', 'https://ya.ru', 5, 'https://ya.ru', 3, '')])))
}

export function uploadScores(scores: Score[]) {
    console.log(scores)
    //TODO: implement
    return new Promise<CommonResponse>(res => res(new CommonResponse()));
}
