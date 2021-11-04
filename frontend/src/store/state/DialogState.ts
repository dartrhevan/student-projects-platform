export default class DialogState {
    public constructor(public open: boolean) {
    }
}

export const initState = new DialogState(false);