import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from 'react-redux';
import thunk from "redux-thunk";
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './reducers';
import { BrowserRouter as Router } from 'react-router-dom'
import App from './components/App/App';
import reportWebVitals from './reportWebVitals';

const createDevStore = () => {
  console.log("Creating redux store with devtools.");
  return createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk), compose)
  );
};

const store =
  process.env.NODE_ENV === "production"
    ? createStore(rootReducer, applyMiddleware(thunk))
    : createDevStore();

ReactDOM.render(
  <Router>
    <Provider 
    store = {store} >
      <App />
    </Provider>
  </Router>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
