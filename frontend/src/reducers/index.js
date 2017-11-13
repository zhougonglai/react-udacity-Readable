import * as constant from '../util/constant';
import {combineReducers} from 'redux';
 
const categories = (state = [], action) => {
  switch (action.type) {
    case constant.GET_CATEGORIES:
      return action.categories;
    default:
      return state;
  }
};

export default combineReducers({
  categories
});