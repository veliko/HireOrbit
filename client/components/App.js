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
              {loggedIn ? <li><NavLink to="/logout" className="fa fa-user">Log Out</NavLink></li> :
              <li><NavLink to="/auth/google" className="fa fa-user">Log In</NavLink></li>}
            </ul>
          </nav>
        </header>

        <div className="content">
          {this.props.children || <SearchContainer/>}
        </div>
      </div>
    )
  }
}

// Login /Logout condition - LogOut calls Auth.logout
