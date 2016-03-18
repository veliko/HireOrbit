import React from 'react';
import Note from './Note';
import { Link } from 'react-router';
import NavLink from './NavLink';
import Search from './Search';
import Auth from '../utils/Auth';

export default class App extends React.Component {
  render() {
    

    const loggedIn = Auth.isLoggedIn();

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
              <li><NavLink to="/auth/github">Log In</NavLink></li>}
            </ul>
          </nav>
        </aside>

        <div className="content">
          {this.props.children || <Search/>}
        </div>
      </div>
    )
  }
}

// Login /Logout condition - LogOut calls Auth.logout 