import React from 'react';
import { Router, Route, IndexRoute, hashHistory, browserHistory } from 'react-router';
import App from './App';
import HomeContainer from '../containers/HomeContainer';
import Home from '../components/Home';
import SearchContainer from '../containers/SearchContainer';
import KanbanBoardContainer from '../containers/KanbanBoardContainer';
import DataVisContainer from '../containers/DataVisContainer';
import DataVisSearchContainer from '../containers/DataVisSearchContainer';
import promise from 'redux-promise';
import reducers from '../reducers';
import Auth from '../utils/Auth';
import logger from 'redux-logger';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import MonsterJobs from './MonsterJobs'

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
        <IndexRoute component={HomeContainer}/>
        <Route path="/search" component={SearchContainer}/>
        <Route path="/kanban" onEnter={requireAuth} component={KanbanBoardContainer}/>
        <Route path="/data-vis" onEnter={requireAuth} component={DataVisSearchContainer}/>
        <Route path="/logout" onEnter={logOut} />
        <Route path="/auth/google" onEnter={requireAuth} />
        <Route path="/monster-jobs" component={MonsterJobs} />

      </Route>
    </Router>
  </Provider>
