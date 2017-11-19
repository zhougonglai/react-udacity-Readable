import * as constant from '../util/constant';
import {createActions} from 'redux-actions';

export const {
  setCategories,
  setPosts, 
  setComments,
  updatePost,
  updateComment,
} = createActions({
  [constant.SET_CATEGORIES]: categories => categories,
  [constant.SET_POSTS]: posts => posts,
  [constant.SET_COMMENTS]: comments => comments,
  [constant.UPDATE_POST]: post => post,
  [constant.UPDATE_COMMENT]: comment => comment
});





