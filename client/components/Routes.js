import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import App from './App';
import Home from '../components/Home';  
import SearchContainer from '../containers/SearchContainer';
import KanbanBoardContainer from '../containers/KanbanBoardContainer';
import DataVis from './DataVis';
import promise from 'redux-promise';
import reducers from '../reducers';
import Auth from '../utils/Auth';
import logger from 'redux-logger';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

let store = createStore(reducers/*, applyMiddleware(logger())*/);

const requireAuth = (nextState, replace) => {
  console.log('In requireAuth')
      if (!Auth.isLoggedIn()) {
        console.log("sending to google");
        window.location.assign('/auth/google');
      }
    }

const logOut = () => {
  Auth.logOut();
  window.location.assign('/logout');
}

export default () =>
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Home}/>
        <Route path="/kanban" onEnter={requireAuth} component={KanbanBoardContainer}/>
        <Route path="/data-vis" onEnter={requireAuth} component={DataVis}/>
        <Route path="/logout" onEnter={logOut} />
        <Route path="/auth/google" onEnter={requireAuth} />
      </Route>
    </Router>
  </Provider>
