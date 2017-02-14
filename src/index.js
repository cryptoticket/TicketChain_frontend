import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import store from './store';
import routes from './routes';

import './assets/less/index.less';
import 'antd/dist/antd.less';

import moment from 'moment';
import 'moment/locale/ru';

window.moment = moment;
moment.locale('ru');

render(
  <Provider store={store}>
      <Router history={browserHistory} routes={routes} />
  </Provider>, document.getElementById('root')
);
