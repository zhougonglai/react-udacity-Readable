import {connect} from 'react-redux';

import {App} from '../components';
import {setCategories, setPosts, setComments} from '../actions';

const mapStateToProps = ({categories}) => ({categories});

const mapDispatchToProps = (dispatch) => ({
  setCategories: categories => dispatch(setCategories(categories)),
  setPosts: posts => dispatch(setPosts(posts)),
  setComments: comments => dispatch(setComments(comments))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);