import React from 'react';
import Note from './Note';
import { Link } from 'react-router';
import NavLink from './NavLink';
import Search from './Search';

export default class App extends React.Component {
  render() {
    return (
      <div className="container">

        <aside>
          <nav>
            <h1><Link to="/">HireOrbit</Link></h1>
            <ul role="nav">
              <li><NavLink to="/" onlyActiveOnIndex>Home</NavLink></li>
              <li><NavLink to="/kanban">Kanban</NavLink></li>
              <li><NavLink to="/data-vis">Data</NavLink></li>
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
