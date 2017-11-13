import * as constant from '../util/constant';
import {createActions} from 'redux-actions';

export const {getCategories, getCategoryPosts} = createActions({
  [constant.GET_CATEGORIES]: categories => categories,
  [constant.GET_CATEGORY_POSTS]: (categorie, posts) => ({categorie, posts})
});






