import * as constant from '../util/constant';
import {combineReducers} from 'redux';

const initialCategories = {
  topics: [],
  posts: [],
  comments: []
};

const categories = (state = initialCategories, action) => {
  const {payload} = action;
  switch (action.type) {
    case constant.SET_CATEGORIES:
      return {...state, topics: payload};
    case constant.SET_POSTS:
      return {...state, posts: payload};
    case constant.SET_COMMENTS:
      return {...state, comments: payload};
    default:
      return state;
  }
};

export default combineReducers({
  categories
});