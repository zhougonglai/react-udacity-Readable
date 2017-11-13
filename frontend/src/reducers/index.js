import * as constant from '../util/constant';
import {combineReducers} from 'redux';

const initialCategories = {
  topics: [],
  active: 0,
  posts: []
};

const categories = (state = initialCategories, action) => {
  const {payload} = action;
  switch (action.type) {
    case constant.GET_CATEGORIES:
      return Object.assign({}, state, {topics: payload});
    case constant.GET_CATEGORY_POSTS:
      return Object.assign({}, state, {posts: payload});
    default:
      return state;
  }
};

export default combineReducers({
  categories
});