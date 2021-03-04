import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setNavSubHeader, setBackgroundClass } from '../../actions';
import { determineMainImage } from '../../util/helpers';
import './Main.scss';

const Main = ({setBackgroundClass, setNavSubHeader }) => {
  useEffect(() => {
    setNavSubHeader(null);
    setBackgroundClass("landing-page");
  })
return (
    <div className="main-image-div">
      <img className="main-image" src={determineMainImage()} loading="eager" alt="movie backdrop" />
    </div>
  )
}

export const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ setBackgroundClass, setNavSubHeader  }, dispatch);

export default connect(null, mapDispatchToProps)(Main)