import React from 'react';
import Note from './Note';
import { Link } from 'react-router';
import NavLink from './NavLink';
import SearchContainer from '../containers/SearchContainer';
import Auth from '../utils/Auth';

export default class App extends React.Component {
  render() {

    let loggedIn = Auth.isLoggedIn();

    return (
      <div className="container">

        <header>
          <h1 id="logo">
            <Link to="/"><img src="img/logo.svg" /></Link>
          </h1>
          <nav>
            <ul role="nav">
              <li><NavLink to="/" onlyActiveOnIndex><i className="fa fa-home"></i>Home</NavLink></li>
              <li><NavLink to="/kanban"><i className="fa fa-table"></i>Kanban</NavLink></li>
              <li><NavLink to="/data-vis"><i className="fa fa-bar-chart"></i>Data</NavLink></li>
            </ul>
          </nav>
          {loggedIn ? <NavLink to="/logout" className="fa fa-user"></NavLink> :
          <NavLink to="/auth/github" className="fa fa-user"></NavLink>}
        </header>

        <div className="content">
          {this.props.children || <SearchContainer/>}
        </div>
      </div>
    )
  }
}

// Login /Logout condition - LogOut calls Auth.logout
