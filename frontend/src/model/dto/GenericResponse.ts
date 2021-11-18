import CommonResponse from "./CommonResponse";

export default class GenericResponse<T> extends CommonResponse {
    public constructor(public data: T, message?: string) {
        super(message);
    }

    public get success() {
        return this.message === null || this.message === undefined || this.message === '';
    }
}
