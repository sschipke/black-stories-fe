let initialState = {
  video_player_open: false,
  mobile_menu_open: false
}

const screen = (state = initialState, action) => {
  let new_state = state;
  switch(action.type) {
    case "OPEN_VIDEO_PLAYER":
      new_state.video_player_open = true;
      return { ...new_state };
    case "CLOSE_VIDEO_PLAYER":
      new_state.video_player_open = false;
      return { ...new_state }
    case "OPEN_MOBILE_MENU":
      new_state.mobile_menu_open = true;
      return { ...new_state };
    case "TOGGLE_MOBILE_MENU":
        new_state.mobile_menu_open = !state.mobile_menu_open
        return { ...new_state }
    case "CLOSE_MOBILE_MENU":
      new_state.mobile_menu_open = false;
      return { ...new_state }
    default:
      return state;
  }
};

export default screen;