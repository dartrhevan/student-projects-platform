import Score from "../model/Score";
import CommonResponse from "../model/dto/CommonResponse";
import ScoreDTO from "../model/dto/ScoreDTO";
import {getTokenHeader} from "../store/state/LoginState";
import {defErrorHandler, getDefaultDownloadHandler, getDefaultUploadHandler} from "../utils/utils";

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
    return fetch(`/api/scores/evaluate?workspaceId=${workspaceId}&sprintNumber=${sprintNumber - 1}`, {
        headers: getTokenHeader()
    }).then(getDefaultDownloadHandler());
}

export function uploadScores(scores: Score[]) {
    return fetch(`/api/scores/evaluate`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            ...getTokenHeader()
        },
        body: JSON.stringify(scores.map(s => {
            return {
                sprintId: s.sprintId,
                mentor: s.mentorTeam,
                presentationScore: s.presentationScore,
                trackerLinkScore: s.trackerScore,
                comment: s.comment,
            }
        }))
    }).then(getDefaultUploadHandler());
}