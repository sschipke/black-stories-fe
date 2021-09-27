import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { openVideoPlayer, closeVideoPlayer } from '../../actions';
import './VideoPlayer.scss';

export const VideoPlayer = ({currentMovie, isOpen, closeVideoPlayer}) => {
  if(!isOpen) {
    return '';
  }
  const {video_key} = currentMovie;
  return (
    <div className="modal-background" 
    onClick={() => closeVideoPlayer()}>
      <div className="modal-content">
        <div className="preview-container">
          <iframe
          allow="fullscreen"
            id="preview-container-iframe"
            title={video_key}
            src={`https://www.youtube-nocookie.com/embed/${video_key}?modestbranding=1&controls=1&autoplay=0&iv_load_policy=3&showinfo=0&frameBorder=0&allowFullScreen=1`}
          />
        </div>
      </div>
      <button 
            className="video-close-button"
            title="close video player"
            type="button"
            onClick={() => closeVideoPlayer()}
            />
    </div>
  )

}

export const mapStateToProps = state => ({
  currentMovie: state.data.currentMovie,
  isOpen: state.screen.video_player_open
})

export const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ openVideoPlayer, closeVideoPlayer }, dispatch);

  export default connect(mapStateToProps, mapDispatchToProps)(VideoPlayer);