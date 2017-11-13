import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';

import './index.css';
import 'material-components-web/dist/material-components-web.css';
import {AppPage} from './containers';
import registerServiceWorker from './registerServiceWorker';
import store from './store';


ReactDOM.render(
<BrowserRouter>
  <Provider store={store}>
    <AppPage/>
  </Provider>
</BrowserRouter>, document.getElementById('root'));
registerServiceWorker();
