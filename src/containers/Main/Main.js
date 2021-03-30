import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setNavSubHeader, setBackgroundClass } from '../../actions';
import { determineMainImage } from '../../util/helpers';
import './Main.scss';

const Main = ({setBackgroundClass, setNavSubHeader }) => {
  const [imageSrc] = useState(determineMainImage())

  useEffect(() => {
    setNavSubHeader(null);
    setBackgroundClass("landing-page");
  })
return (
    <div className="main-image-div">
      <img className="main-image" src={imageSrc || determineMainImage()} loading="eager" alt="movie backdrop" />
    </div>
  )
}

export const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ setBackgroundClass, setNavSubHeader  }, dispatch);

export default connect(null, mapDispatchToProps)(Main)