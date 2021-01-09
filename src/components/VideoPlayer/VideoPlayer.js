import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { openVideoPlayer, closeVideoPlayer } from '../../actions';
import closeIcon from '../../assets/icons/video_player_close.svg';
import './VideoPlayer.scss';

export const VideoPlayer = ({currentMovie, isOpen, closeVideoPlayer}) => {
  console.log({isOpen}, {currentMovie})
  if(!isOpen) {
    return '';
  }
  const {video_key} = currentMovie;
  return (
    <div className="modal-background" >
      <button 
      className="video-close-button"
      type="button"
      onClick={() => closeVideoPlayer()}
      >
        <img src={closeIcon} alt="close video" />
      </button>
      <iframe
        className="preview-container"
        title={video_key}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '70%',
          height: '80%'
        }}
        src={`https://www.youtube-nocookie.com/embed/${video_key}?modestbranding=1&controls=1&autoplay=0&iv_load_policy=3&showinfo=0&frameBorder=0&allowFullScreen=1`}
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