import { createSelector } from 'reselect';
import MenuState from "../store/state/MenuState";

interface IMenuState {
    menu: MenuState
}

// export default createSelector((state: IMenuState) => state.menu, menu => menu);

export const getMainMenuOpen = createSelector((state: IMenuState) => state.menu, menu => menu.mainMenuOpen);

// export const getOpenedProjectId = createSelector((state: IMenuState) => state.menu, menu => menu.projectId);
