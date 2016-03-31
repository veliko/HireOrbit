import React from 'react';
import Note from './Note';
import { Link } from 'react-router';
import NavLink from './NavLink';
import Home from '../components/Home';
import Auth from '../utils/Auth';
import DragTarget from './DragTarget'
import Utils from '../utils/Utils';
import isURL from 'validator/lib/isURL';


export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      displayInput: false,
      showExpired : false,
      showJobSaved: false,
      showInvalid: false
    }
  }

  toggleInputDisplay() {
    this.setState({
      displayInput: !this.state.displayInput
    });
  }
  toggleExpiredSaved(field) {
    if(field === 'Expired'){
      this.setState({
        showExpired: !this.state.showExpired
      });
    } else if (field === 'Saved'){
      this.setState({
        showJobSaved: !this.state.showJobSaved
      });
    } else if (field === 'Invalid'){
      this.setState({
        showInvalid: !this.state.showInvalid
      })
    }
  }
  saveLink(e) {
    e.preventDefault();
    var self = this;
    self.toggleInputDisplay();
    var urlPasted = this.refs.urlInput.value;
    if(!isURL(urlPasted)) {
      self.toggleExpiredSaved('Invalid');
      setTimeout(() => self.toggleExpiredSaved('Invalid'), 2000);
      return;
    }
    console.log('this got the input: ', urlPasted);
    if(urlPasted){
      Utils.sendUrlToParse(urlPasted)
        .done(res => {
          console.log(res)
          self.toggleExpiredSaved('Saved')
          setTimeout(() => self.toggleExpiredSaved('Saved'), 2000);
          self.refs.urlInput.value = "";
        })
        .fail(err => {
          console.log(err);
          self.toggleExpiredSaved('Expired')
          setTimeout(() => self.toggleExpiredSaved('Expired'), 2000)
          self.refs.urlInput.value = "";
        })
    }
  }

  render() {
    console.log('UserID is ', decodeURIComponent(Auth.getUserImage()));
    let loggedIn = Auth.isLoggedIn();

    return (
      <div className="container">

        <header>
          <h1 id="logo">
            <Link to="/"><img src="img/hireOrbit.png" /></Link>
          </h1>
          <nav>
            <ul role="nav">
              <li><NavLink to="/search"><i className="fa fa-search"></i>Search</NavLink></li>
              <li><NavLink to="/kanban"><i className="fa fa-table"></i>Kanban</NavLink></li>
              <li><NavLink to="/monster-jobs"><i className="fa fa-stack-overflow"></i>Monster</NavLink></li>
            </ul>
          </nav>
            {this.state.showExpired ? <div className="expired-text">The job might be expired</div> : null}
            {this.state.showJobSaved ? <div className="saved-text">Saved the job in Kanban</div> : null}
            {this.state.isInvalid ? <div className="expired-text">The url seems to be invalid, try again</div> : null}
            <div className="fa fa-bullseye" onClick={this.toggleInputDisplay.bind(this)}/>
            <input className="url-input" type="text" ref="urlInput"
                   style={
                     this.state.displayInput ? {display: "inline-block"} : {display: "none"}
                   }
                   placeholder="place job link here"
            /> 
            <div onClick={this.saveLink.bind(this)} 
                style={
                  this.state.displayInput ? {display: "inline-block"} : {display: "none"}
                }
                className="fa fa-plus-circle">
            </div>
          {loggedIn ? (<div className="login">
                         <span>{"Welcome, User "}</span>
                         <NavLink to="/logout" className="fa fa-user"><img className="circular-image" src={Auth.getUserImage()}></img></NavLink>
                       </div>) :
                      (<div className="login">
                         <span>{"Log in with Google "}</span>
                         <NavLink to="/auth/google" className="fa fa-user"></NavLink>  
                       </div>) }
        </header>

        <div className="content">
          {this.props.children || <Home/>}
        </div>
      </div>
    )
  }
}

// Login /Logout condition - LogOut calls Auth.logout
