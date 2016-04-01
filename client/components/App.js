import React from 'react';
import { Link } from 'react-router';
import NavLink from './NavLink';
import Home from '../components/Home';
import Auth from '../utils/Auth';
import DragTarget from './DragTarget'
import Utils from '../utils/Utils';
import isURL from 'validator/lib/isURL';
import Modal from 'react-awesome-modal';
import CardForm from './CardForm';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';


export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      displayInput: false,
      showExpired : false,
      showJobSaved: false,
      showInvalid: false,
      modalVisible: false,
      cardData: null
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
  saveLink() {
    var self = this;
    self.toggleInputDisplay();
    var urlPasted = this.refs.urlInput.value;
    if(!isURL(urlPasted)) {
      self.toggleExpiredSaved('Invalid');
      setTimeout(() => self.toggleExpiredSaved('Invalid'), 2000);
      return;
    }
    if(urlPasted){
      Utils.sendUrlToParse(urlPasted)
        .done(res => {
          // console.log(res)
          self.toggleExpiredSaved('Saved');
          setTimeout(() => self.toggleExpiredSaved('Saved'), 2000);
          // self.refs.urlInput.value = "";
          self.setState({cardData: res});
          self.toggleModalState(res);
        })
        .fail(err => {
          console.log(err);
          self.toggleExpiredSaved('Expired')
          setTimeout(() => self.toggleExpiredSaved('Expired'), 2000)
          self.refs.urlInput.value = "";
        })
    }
  }

  handleCrosshairsInputKeyPress(e) {
    if (e.key === "Enter") {
      this.saveLink();
    }
  }

  toggleModalState(cardData) {
    this.setState({
      modalVisible: !this.state.modalVisible
    });
  }

  render() {
    let loggedIn = Auth.isLoggedIn();

    return (
      <div className="container">
        { this.state.modalVisible ? 
          <Modal visible={this.state.modalVisible}
                 effect="fadeInDown"
                 width="400"
                 height="415">
            <h1 className="cardform__heading">Add a New Card</h1>
            <CardForm cards={this.props.cards} 
                      cardData={this.state.cardData} 
                      addCardsToKanban={this.props.addCardsToKanban}
                      toggleModalState={this.toggleModalState.bind(this)} />
          </Modal> : 
        null } 
        <header>
          <h1 id="logo">
            <Link to="/"><img className="logo__header" src="img/hireOrbit.png" /></Link>
          </h1>
          <nav>
            <ul role="nav">
              <li><NavLink to="/search"><i className="fa fa-search"></i>Search</NavLink></li>
              <li><NavLink to="/kanban"><i className="fa fa-calendar"></i>Kanban</NavLink></li>
              <li><NavLink to="/data-vis"><i className="fa fa-bar-chart"></i>DataViz</NavLink></li>
              <li><NavLink to="/monster-jobs"><i className="fa fa-stack-overflow"></i>Other Sources</NavLink></li>
              <li>
                <div className="bullseye__container">
                  <div className="fa fa-crosshairs" onClick={this.toggleInputDisplay.bind(this)} />
                  {this.state.showExpired ? <div className="expired-text">The job might be expired</div> : null}
                  {this.state.showJobSaved ? <div className="saved-text">Saved the job in Kanban</div> : null}
                  {this.state.isInvalid ? <div className="expired-text">The url seems to be invalid, try again</div> : null}
                  <ReactCSSTransitionGroup transitionName="example"
                                           transitionEnterTimeout={250}
                                           transitionLeaveTimeout={250} >
                    {this.state.displayInput ? 
                      <input className="url-input" type="text" ref="urlInput"
                             style={{display: "inline-block"}}
                             placeholder="place job link here"
                             key="url__input__header"
                             onKeyPress={this.handleCrosshairsInputKeyPress.bind(this)} /> : null }
                  </ReactCSSTransitionGroup>
                </div>
              </li>
            </ul>
          </nav>

          {loggedIn ? (<div className="login">
                         <NavLink to="/logout"><img className="circular-image" src={Auth.getUserImage()}></img></NavLink>
                         <span>{`Welcome, ${Auth.getUserName() || "User"}`}</span>
                       </div>) :
                      (<div className="login">
                         <NavLink to="/auth/google" className="fa fa-user"></NavLink>  
                         <span className="login__with__google__text">{"Log in with Google "}</span>
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
