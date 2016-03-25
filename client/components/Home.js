import React, { Component } from 'react';
import Utils from '../utils/Utils';
import { router } from 'react-router';

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
      range: 0,
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
      range: 25
    });
  }

  submitForm(e) {
    e.preventDefault();

    var q = {
      q: this.state.position,
      l: this.state.location,
      radius: this.state.range,
      jt: this.state.jobType,
      st: this.state.employerType
    }

    let self = this;
      Utils.getJobsFromIndeed(q, 
        (res) => {
          self.props.updateCurrentSearch(res);
          self.props.history.push('/q');
        },
        console.log.bind(console));
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
            <input type="radio" name={props.name} value={item.value}
              checked={item.value === this.state[props.name]} onChange={ this.stateChange.bind(this) } />
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
            <button onClick={this.submitForm.bind(this)}><i className="fa fa-arrow-circle-right"></i></button>
          </div>
          <div>
            <a href="#" className="advanced">Advanced Search</a>
          </div>
          <div className="advanced">
            <div>
              <div className="radius">
                <h3>Radius</h3>
                <input type="range" name="range" min="0" max="100" step="25" onChange={ this.stateChange.bind(this) } />
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
