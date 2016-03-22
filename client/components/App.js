import React from 'react';
import Note from './Note';
import { Link } from 'react-router';
import NavLink from './NavLink';
import SearchContainer from '../containers/SearchContainer';
import Auth from '../utils/Auth';

export default class App extends React.Component {
  render() {
    

    let loggedIn = Auth.isLoggedIn();

    // const LogNav = loggedIn ? <Link to='/logout'></Link> 
    return (
      <div className="container">


        <aside>
          <nav>
            <h1><Link to="/">HireOrbit</Link></h1>
            <ul role="nav">
              <li><NavLink to="/" onlyActiveOnIndex>Home</NavLink></li>
              <li><NavLink to="/kanban">Kanban</NavLink></li>
              <li><NavLink to="/data-vis">Data</NavLink></li>
              {loggedIn ? <li><NavLink to="/logout">Log Out</NavLink></li> :
              <li><NavLink to="/auth/google">Log In</NavLink></li>}
            </ul>
          </nav>
        </aside>

        <div className="content">
          {this.props.children || <SearchContainer/>}
        </div>
      </div>
    )
  }
}

// Login /Logout condition - LogOut calls Auth.logout 