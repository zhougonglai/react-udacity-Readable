import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {BrowserRouter, Route} from 'react-router-dom';

import './index.css';
import 'material-components-web/dist/material-components-web.css';
import {AppPage} from './containers';
import registerServiceWorker from './registerServiceWorker';
import store from './store';


ReactDOM.render(
<BrowserRouter>
  <Provider store={store}>
    {/* path="/:category/:post_id"  */}
    <Route children={location => <AppPage {...location}/>}/>
  </Provider>
</BrowserRouter>, document.getElementById('root'));
registerServiceWorker();
