let initialState = {
  video_player_open: false,
  mobile_menu_open: false,
  nav_subheader: null,
  isLoading: false,
  background_class: "landing-page",
  search_bar_open: false,
  errors: null
}

const screen = (state = initialState, action) => {
  let new_state = { ...state };
  switch(action.type) {
    case "OPEN_VIDEO_PLAYER":
      new_state.video_player_open = true;
      return new_state;
    case "CLOSE_VIDEO_PLAYER":
      new_state.video_player_open = false;
      return new_state;
    case "OPEN_MOBILE_MENU":
      new_state.mobile_menu_open = true;
      return new_state;
    case "TOGGLE_MOBILE_MENU":
        if(state.search_bar_open) {
          new_state.search_bar_open = false;
        }
        new_state.mobile_menu_open = !state.mobile_menu_open;
        return new_state;
    case "CLOSE_MOBILE_MENU":
      new_state.mobile_menu_open = false;
      return new_state;
    case "SET_BACKGROUND_CLASS":
      new_state.background_class = action.backgroundClass;
      return new_state;
    case "SET_NAV_SUBHEADER":
      new_state.nav_subheader = action.subHeader;
      return new_state;
    case "TOGGLE_SEARCH_BAR":
      new_state.search_bar_open = !state.search_bar_open;
      return new_state;
    case "SET_ERRORS":
      new_state.errors = action.errors;
      return new_state;
    default:
      return state;
  }
};

export default screen;