import {connect} from 'react-redux';

import {App} from '../components';
import {setCategories, setPosts, setComments, updatePost} from '../actions';

const mapStateToProps = ({categories}) => ({categories});

const mapDispatchToProps = (dispatch) => ({
  setCategories: categories => dispatch(setCategories(categories)),
  setPosts: posts => dispatch(setPosts(posts)),
  setComments: comments => dispatch(setComments(comments)),
  updatePost: post => dispatch(updatePost(post))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);