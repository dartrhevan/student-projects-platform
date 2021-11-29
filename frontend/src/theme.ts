
const THEME = {
    HEADER_COLOUR: '#217CA3',
    ELEMENTS_COLOUR: '#F1F1F2',
    BACKGROUND_COLOUR: '#D4DDE1',
    MAIN_TEXT_COLOUR: '#2F4F4F',
    HEADER_TEXT_COLOUR: '#FFFFFF', //'#192c2c',
    FONT_FAMILY: 'system-ui',
    FONT_WEIGHT: 500
};

export default THEME;

export const HeaderStyle = {
    background: THEME.HEADER_COLOUR,
    fontFamily: THEME.FONT_FAMILY,
    color: THEME.HEADER_TEXT_COLOUR,
    fontWeight: THEME.FONT_WEIGHT,
};

export const ElementsStyle = {
    background: THEME.ELEMENTS_COLOUR,
    fontFamily: THEME.FONT_FAMILY,
    color: THEME.MAIN_TEXT_COLOUR,
    fontWeight: THEME.FONT_WEIGHT,
};

export const BackgroundStyle = {
    background: THEME.BACKGROUND_COLOUR,
    fontFamily: THEME.FONT_FAMILY,
    color: THEME.MAIN_TEXT_COLOUR,
    fontWeight: THEME.FONT_WEIGHT,
};
