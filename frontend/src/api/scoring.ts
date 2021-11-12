import GenericResponse from "../model/dto/GenericResponse";
import Score from "../model/Score";

export function getScores(workspaceId: string) {
    //TODO: implement
    return new Promise<GenericResponse<Score[]>>(res => res(
        new GenericResponse<Score[]>([new Score('Team', 'Jack', 'https://ya.ru', 5, 'https://ya.ru', 3, '')])))
}
