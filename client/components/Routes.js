import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import App from './App';
import Search from './Search';
import Kanban from './Kanban';
import DataVis from './DataVis';

export default () =>
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Search}/>
      <Route path="/kanban" component={Kanban}/>
      <Route path="/data-vis" component={DataVis}/>
    </Route>
  </Router>
