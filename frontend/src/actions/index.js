import * as constant from '../util/constant';
import {createAction, createActions} from 'redux-actions';

export const {getCategories} = createActions({
  [constant.GET_CATEGORIES]: categories => ({categories})
});






