export default class MenuState {
    constructor(public mainMenuOpen: boolean) {}
}

export const initState = new MenuState(false);
