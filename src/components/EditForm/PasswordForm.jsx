import React, { useState, useEffect } from 'react';
import { authenticatePassword } from '../../util/apiCalls';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setPassword, setRemainingAttempts } from '../../actions';
import './PasswordForm.scss';

const PasswordForm = ({ setAuth, setPassword, setRemainingAttempts, isAuthenticated, remainingAttempts }) => {
  const [errors, setErrors] = useState({error: null, attempts: ''});
  const [inputValue, setInput] = useState("");

  useEffect(() => {
    if (isAuthenticated) {
      setAuth(true);
    }
  }, [isAuthenticated, setAuth])

  const handleSubmit = (e) => {
    e.preventDefault();
    const password = inputValue;
    authenticatePassword(password)
    .then(res => {
      setPassword(inputValue);
      setAuth(true);
    })
    .catch(error => {
      setErrors(error);
      if (error["remaining"] !== undefined) {
        setRemainingAttempts(error.remaining);
      }
      setInput("");
    })
  }

  const { error } = errors;


  const gifSrc = error ? "https://media.giphy.com/media/ZeGosPpNe4gP6/giphy.gif" : "https://media.giphy.com/media/YkeO0lyOCIDNeD0d9y/giphy.gif";

  const header = error ? "That's Trash. Try again..." : "You got a Password?"; 

  if (remainingAttempts === 0) {
    return (
      <div className="password-form">
        <h2 style={{fontSize: "2.5rem", marginBottom: "25px"}}>Locked out!</h2>
        <img 
          className="password-img"
          src="https://media.giphy.com/media/2wW4T7W638MD20McEt/giphy.gif"
          alt="Yellow cabs drive off, leaving Dorothy behind."
        />
      </div>
    );
  }

  return (
    <form
    onSubmit={handleSubmit}
    className="password-form"
    >
      <h2>{header}</h2>
      <div
      className="password-input-container"
      >
        <label
        id="password-input-label"
        htmlFor="password-input"
        hidden
        >
        Enter the password
        </label>
        <input 
        type="password"
        name="password"
        id="password-iput"
        autoComplete="new-password"
        minLength="6"
        value={inputValue}
        onChange={e => setInput(e.target.value)}
        placeholder="Password"
        required
        />
        <button 
        className="password-button"
        aria-labelledby="search-button-label"
        id="password-button"
        type="submit"
        tabIndex="-1"
        name="search"
        >
          <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" stroke="#231f20" width="28.02692" height="22.04019" viewBox="0 0 28.02692 22.04019"><defs><style>{`.cls-1{stroke-linecap:round;stroke-width:4.75236px;}`}</style></defs><line className="cls-1" x1="25.50598" y1="11.20387" x2="17.18934" y2="19.52051"/><line className="cls-1" x1="25.5055" y1="10.83632" x2="17.18886" y2="2.51968"/><line className="cls-1" x1="14.33602" y1="11.20387" x2="2.57392" y2="11.20387"/></svg>
        </button>
      </div>
      <img src={gifSrc}
      className="password-img" 
      allowFullScreen
      title="password gif"
      alt="Richard Prior hiding behind a giant black mask"
      />
        { error && 
        <h4>
          Attempts remaining: <u><span style={{fontSize: "2.5rem"}}>{remainingAttempts}</span></u>
        </h4>
        }
    </form>
  );
}

export const mapStateToProps = state => ({
  remainingAttempts: state.data.remainingAttempts,
  isAuthenticated: state.data.isAuthenticated
});

export const mapDispatchToProps = (dispatch) => 
  bindActionCreators({ setPassword, setRemainingAttempts }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(PasswordForm);