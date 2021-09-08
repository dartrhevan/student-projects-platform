export default class MenuState {
    constructor(public mainMenuOpen: boolean, public projectId?: string) {}
}

export const initState = new MenuState(false);