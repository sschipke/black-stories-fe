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

export const setBackgroundClass = (backgroundClass) => ({
  type: "SET_BACKGROUND_CLASS",
  backgroundClass
})

export const setNavSubHeader = (subHeader) => ({
  type: "SET_NAV_SUBHEADER",
  subHeader
})

export const setSearchText = (searchText) => ({
  type: "SET_SEARCH_TEXT",
  searchText
})

export const toggleSearchBar = () => ({
  type: "TOGGLE_SEARCH_BAR"
})

export const loadCredits = (credits) => ({
  type: "LOAD_MOVIE_CREDITS",
  credits
})