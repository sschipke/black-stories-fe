import React, { useEffect, createRef, useMemo } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  setNavSubHeader,
  setBackgroundClass,
  updatePaginationPage
} from "../../actions";
import Pagination from "../../components/Pagination/Pagination";
import MovieCard from "../../components/MovieCard/MovieCard";
import loadingGif from "../../assets/gifs/loading_fist.gif";
import "./MovieList.scss";

const PAGE_SIZE = 10;

export const MovieList = ({
  areMoviesLoaded,
  genreId,
  genreTitle,
  type,
  previouslyWatched,
  watchList,
  currentMovie,
  setBackgroundClass,
  setNavSubHeader,
  memberName,
  currentPage,
  updatePaginationPage
}) => {
  const shouldRenderLoadingModal =
    !areMoviesLoaded && type === "Previously Watched";
  const moviesContainerRef = createRef("movieContainer");
  let specificMovies = useMemo(() => [], []);
  let className;
  if (genreId === 0) {
    className = "genre-page";
    specificMovies = watchList.map((movie) => (
      <MovieCard movie={movie} selectedGenreId={genreId} key={movie.id} />
    ));
  }
  if (genreTitle && genreId) {
    className = "genre-page";
    genreTitle = genreTitle.replace("_", " ").toUpperCase();
    specificMovies = watchList
      .filter((movie) => movie.genres.includes(genreId))
      .map((movie) => (
        <MovieCard movie={movie} selectedGenreId={genreId} key={movie.id} />
      ));
  } else if (type === "Previously Watched") {
    className = "previously-watched";
    specificMovies = previouslyWatched.map((movie) => (
      <MovieCard movie={movie} type="Previously Watched" key={movie.id} />
    ));
  } else if (memberName) {
    className = "previously-watched";
    genreTitle = `Chosen by: ${memberName}`;
    specificMovies = previouslyWatched
      .filter((movie) => (movie.chosen_by || "").toLowerCase() === memberName)
      .map((movie) => (
        <MovieCard movie={movie} type="Previously Watched" key={movie.id} />
      ));
  }

  const paginatedMovieList = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PAGE_SIZE;
    const lastPageIndex = firstPageIndex + PAGE_SIZE;
    return specificMovies.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, specificMovies]);

  useEffect(() => {
    setNavSubHeader(genreTitle || type);
    setBackgroundClass(className);
    if (type === "Previously Watched" && !currentMovie && !shouldRenderLoadingModal) {
      const currentMovieContainer = moviesContainerRef.current;
      currentMovieContainer.scrollTop = 0;
      if (
        window.innerWidth < 950 &&
        currentMovieContainer.parentNode.scrollTop !== 0
      ) {
        currentMovieContainer.parentNode.scrollTop = 0;
      }
    }
  });

  if (shouldRenderLoadingModal) {
    return (
      <div className="previously-watched-loading-container">
        <img className="previously-watched-modal-loading-gif" src={loadingGif} alt="loading gif" />
      </div>
    );
  }

  return (
    <div className="movies-container" ref={moviesContainerRef}>
      <div style={{ flexWrap: "wrap" }}>
        {!specificMovies.length && <h1>No movies in this genre</h1>}
        {specificMovies.length > 0 &&
          paginatedMovieList.length &&
          paginatedMovieList}
      </div>
      <Pagination
        className="pagination-bar"
        currentPage={currentPage}
        totalCount={specificMovies.length}
        pageSize={PAGE_SIZE}
        containerRef={moviesContainerRef}
        onPageChange={(page) => {
          moviesContainerRef.current.scrollTop = 0;
          updatePaginationPage(page);
        }}
      />
    </div>
  );
};

export const mapStateToProps = (state) => ({
  areMoviesLoaded: state.data.areMoviesLoaded,
  watchList: state.data.watchList,
  previouslyWatched: state.data.previouslySeen,
  currentMovie: state.data.currentMovie,
  currentPage: state.screen.pagination_page
});

export const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      setBackgroundClass,
      setNavSubHeader,
      updatePaginationPage
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(MovieList);
