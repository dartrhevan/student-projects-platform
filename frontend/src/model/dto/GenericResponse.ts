import CommonResponse from "./CommonResponse";

export default class GenericResponse<T> extends CommonResponse {
    public constructor(public payload: T, message?: string) {
        super(message);
    }
}
