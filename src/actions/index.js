export const openVideoPlayer = () => ({
  type: "OPEN_VIDEO_PLAYER"
});

export const closeVideoPlayer = () => ({
  type: "CLOSE_VIDEO_PLAYER"
});

export const setCurrentMovie = (currentMovie) => ({
  type: "SET_CURRENT_MOVIE",
  currentMovie
})