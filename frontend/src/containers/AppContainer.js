import {connect} from 'react-redux';

import {App} from '../components';
import * as actions from '../actions';

const mapStateToProps = ({categories}) => ({categories});

export default connect(mapStateToProps, actions)(App);