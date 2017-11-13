import {connect} from 'react-redux';

import {App} from '../components';
import {getCategories} from '../actions';

const mapStateToProps = ({categories}) => ({categories});

const mapDispatchToProps = (dispatch) => ({
  getCategories: data => dispatch(getCategories(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);