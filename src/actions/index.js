export const openVideoPlayer = () => ({
  type: "OPEN_VIDEO_PLAYER"
});

export const closeVideoPlayer = () => ({
  type: "CLOSE_VIDEO_PLAYER"
});

export const setCurrentMovie = (currentMovie) => ({
  type: "SET_CURRENT_MOVIE",
  currentMovie
});

export const openMobileMenu = () => ({
  type: "OPEN_MOBILE_MENU"
});

export const closeMobileMenu = () => ({
  type: "CLOSE_MOBILE_MENU"
});

export const toggleMobileMenu = () => ({
  type: "TOGGLE_MOBILE_MENU"
});