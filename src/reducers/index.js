import { combineReducers } from 'redux';
import data from './data';
import screen from './screen';
const rootReducer = combineReducers({
  data,
  screen
});

export default rootReducer;