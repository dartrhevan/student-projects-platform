import Score from "../model/Score";
import CommonResponse from "../model/dto/CommonResponse";
import ScoreDTO from "../model/dto/ScoreDTO";
import {getTokenHeader} from "../store/state/LoginState";
import {defErrorHandler, getDefaultDownloadHandler} from "../utils/utils";

export function getScores(workspaceId: string) {
    return fetch(`/api/scores?workspaceId=${workspaceId}`, {
        headers: getTokenHeader()
    }).then((r: Response) => {
        if (!r.ok) {
            return defErrorHandler(r, 'Ошибка получения данных');
        }
        return r.json().then(res => {
                return {
                    sprintsCount: res.data.sprintsCount,
                    projects: res.data.projects.sort((a: any, b: any) => a.projectId > b.projectId ? 1 : -1)
                        .map((p: any) =>
                            new ScoreDTO(p.projectId, p.projectTitle, p.mentor,
                                p.scores.sort((a: any, b: any) => a.numberSprint > b.numberSprint ? 1 : -1)
                                    .map((s: any) => s.sprintScore)))
                }
            }
        );
    });
}

export function getEvaluateTable(workspaceId: string, sprintNumber: number) {
    return fetch(`/api/scores/evaluate?workspaceId=${workspaceId}&sprintNumber=${sprintNumber}`, {
        headers: getTokenHeader()
    }).then(getDefaultDownloadHandler());
    // TODO: implement
    // return new Promise<GenericResponse<Score[]>>(res => res(
    //     new GenericResponse<Score[]>([new Score('1', 'Team', 'Jack', 'https://ya.ru', 5, 'https://ya.ru', 3, '')])))
}

export function uploadScores(scores: Score[]) {
    console.log(scores)
    //TODO: implement
    return new Promise<CommonResponse>(res => res(new CommonResponse()));
}
