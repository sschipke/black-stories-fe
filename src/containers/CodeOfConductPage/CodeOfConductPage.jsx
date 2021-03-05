import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setNavSubHeader, setBackgroundClass } from '../../actions';
import './CodeOfConductPage.scss';

const CodeOfConductPage = ({ setNavSubHeader, setBackgroundClass }) => {
  useEffect(() => {
    setNavSubHeader("Ground Rules & Conduct");
    setBackgroundClass("code-of-conduct-page");
  })
  return (
    <div className="ground-rules-div">
      <p>
        Welcome! This is a space not only for learning and growth, but for celebration and joy of the art of filmmaking, and the stories of and contributions by black artists from all over the world. </p>
        
      <p>It is important to acknowledge upfront that non-black members are responsible to do their own work and research regarding racial justice and the themes presented in these films. Black members of the group are not responsible for the education of anyone else. Every member of the group is expected to do their own work to learn about histories that might have been denied or privileges they haven’t addressed. We are all here to have a good time, but also come out the other side a little fuller. </p>

      <p>Each week a different member of the group will select a film to watch, and lead the discussion, communicated through the group’s Discord channel. Each member is responsible for learning about, and watching the film on their own before we discuss it as a group. Anyone is always welcome to sit a week out if the film is not one they’d care to watch or it is a discussion that they do not want to be a part of. </p>
      
      <p>Before watching a film, learn more about the production if you can. If it was based on a book play, or real-life story, research these things ahead of time to get a better understanding of the source material. After watching, follow up and see if there are any articles written about it that offer a different perspective. </p>
      
      <p>Trauma porn and films centered on a white savior will not be added to the list or discussed. To learn more about these common media tropes see the resources below.</p>
      <h3>What is a Trauma Porn Film?</h3>
      <a 
      className="conduct-article-links"
      href="https://medium.com/@smartbrainiac101/getting-off-what-black-trauma-porn-is-and-why-we-hate-it-e2dc12b5b0e"
      target="_blank" 
      rel="noreferrer">Getting Off: What Black Trauma Porn Is and Why We Hate It</a>
      <a 
      className="conduct-article-links"
      href=" https://zora.medium.com/the-problems-with-black-suffering-on-screen-7ff6e68e1c97"
      target="_blank" 
      rel="noreferrer">The Problems With Black Suffering On-Screen</a>

        <h3>What is the White Savior Complex?</h3>
        <a 
      className="conduct-article-links"
      href="https://www.youtube.com/watch?v=T_RTnuJvg6U"
      target="_blank" 
      rel="noreferrer">White Savior: The Movie Trailer</a>
      <a 
      className="conduct-article-links"
      href="https://medium.com/@OnlyBlackGirl/top-5-most-cringeworthy-white-savior-films-e5215ed71a4"
      target="_blank" 
      rel="noreferrer">Top 5 Most Cringeworthy White Savior Films</a>
      <a 
      className="conduct-article-links"
      href="https://www.businessinsider.com/white-savior-films-green-book-hollywood-racism-people-of-color-film-2019-3"
      target="_blank" 
      rel="noreferrer">How 'white savior' films like 'The Help' and 'Green Book' hurt Hollywood</a>
    </div>
  )
}

export const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ setBackgroundClass, setNavSubHeader  }, dispatch);

export default connect(null, mapDispatchToProps)(CodeOfConductPage)
