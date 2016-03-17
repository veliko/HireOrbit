import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import App from './App';
import Search from './Search';
import KanbanBoardContainer from '../containers/KanbanBoardContainer';
import DataVis from './DataVis';
import promise from 'redux-promise';
import reducers from '../reducers';


import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

let store = createStore(reducers, applyMiddleware(promise));

export default () =>
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Search}/>
        <Route path="/kanban" component={KanbanBoardContainer}/>
        <Route path="/data-vis" component={DataVis}/>
      </Route>
    </Router>
  </Provider>