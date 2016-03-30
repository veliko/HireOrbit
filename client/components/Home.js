import React, { Component } from 'react';
import Utils from '../utils/Utils';
import { Link } from 'react-router';

class Home extends Component {
  constructor(){
    super();

    this.state = {
      jobSet: [],
      employerSet: [],
      employerType: '',
      jobType: '',
      location: '',
      position: '',
      radius: 0,
      sort: 'relevance',
      start: 0,
      q: {}
    };
  }

  componentDidMount() {
    this.setState({
      jobSet: [{label: 'Any', value: ''}, {label: 'Fulltime', value: 'fulltime'}, {label: 'Part Time', value: 'parttime'}, {label: 'Contract', value: 'contract'}, {label: 'Internship', value: 'internship'}, {label: 'Temporary', value: 'temporary'}],
      employerSet: [{label: 'Any', value: ''}, {label: 'Recruiter', value: 'recruiter'}, {label: 'Employer', value: 'employer'}],
      employerType: '',
      jobType: '',
      location: 'San Francisco, CA',
      position: 'Software Engineer',
      radius: 25,
      sort: 'relevance',
      start: 0
    });
  }

  submitForm() {
    var q = {
      q: this.state.position,
      l: this.state.location,
      radius: this.state.radius,
      jt: this.state.jobType,
      st: this.state.employerType,
      sort: this.state.sort,
      start: 0
    }

    this.props.updateCurrentQuery(q);
    return q;
  }

  stateChange(event) {
    let key = event.target.name;
    this.setState({
      [key]: event.target.value
    });
  }

  render(){
    // TODO refactor this to a component
    var Tabs = (props) => (
      <div className="radio-box job">
        <h3>{props.title}</h3>
        {props.types.map((item, i) =>
          // make this active based on the 'checked' match
          <div key={i} className={ (item.value === this.state[props.name]) ? 'active' : '' }>
            <span>{item.label}</span>
            <input type="radio" name={props.name} value={item.value} checked={item.value === this.state[props.name]} onChange={ this.stateChange.bind(this) } />
          </div>
        )}
      </div>
    );

    return (
      <div className="search-container">
        <img src="img/logo.svg" className="searchLogo"/>
        <form action="" className="search">
          <div className="main-search">
            <div>
              <input type="text" placeholder="Position" name="position" value={this.state.position} onChange={ this.stateChange.bind(this) } />
            </div>
            <div>
              <input type="text" placeholder="Location" name="location" value={this.state.location} onChange={ this.stateChange.bind(this) } />
            </div>
            <Link to={{ pathname: '/search', query: this.submitForm.bind(this)() }} ><button> <i className="fa fa-arrow-circle-right"></i></button></Link>
          </div>
          <div>
            <a href="#" className="advanced">Advanced Search</a>
          </div>
          <div className="advanced">
            <div>
              <div className="radius">
                <h3>Radius</h3>
                <input type="range" value={this.state.radius} name="radius" min="0" max="100" step="25" onChange={ this.stateChange.bind(this) } />
                <div className="range">
                  <span>0<br/>miles</span>
                  <span>50</span>
                  <span>100<br/>miles</span>
                </div>
              </div>
              <Tabs types={this.state.jobSet} name={"jobType"} title={"Job Type"} />
              <Tabs types={this.state.employerSet} name={"employerType"} title={"Post Type"} />
            </div>
          </div>
          </form>
      </div>
    );
  }
}

export default Home;
