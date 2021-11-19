
export default class LogState {
    constructor(public text?: string, public level?: LogLevel) {
    }
}

export const initState = new LogState();

export enum LogLevel {
    INFO = 'info',
    WARNING = 'warning',
    SUCCESS = 'success',
    ERROR = 'error'
}

