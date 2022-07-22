import React, { useEffect, useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setNavSubHeader, setBackgroundClass } from '../../actions';
import { determineMainImage } from '../../util/helpers';
import './Main.scss';
import "react-lazy-load-image-component/src/effects/blur.css";

const Main = ({setBackgroundClass, setNavSubHeader }) => {
  const [imageSrc] = useState(determineMainImage())

  useEffect(() => {
    setNavSubHeader(null);
    setBackgroundClass("landing-page");
  })
return (
    <div className="main-image-div">
      <LazyLoadImage
        alt={"movie backdrop"}
        src={imageSrc || determineMainImage()}
        className="main-image"
        effect="blur"
      />
    </div>
  )
}

export const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ setBackgroundClass, setNavSubHeader  }, dispatch);

export default connect(null, mapDispatchToProps)(Main)