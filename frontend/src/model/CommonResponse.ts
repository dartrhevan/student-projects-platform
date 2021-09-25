export default class CommonResponse {
    /**
     * @param message - error message, can be omitted if success
     */
    constructor(public message?: string) {
    }

    public get success() {
        return this.message === null || this.message === undefined || this.message === '';
    }
}