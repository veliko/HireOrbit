import React, { Component } from 'react';

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
      range: 0
    };
  }

  componentDidMount() {
    this.setState({
      jobSet: [{label: 'Any', value: ''}, {label: 'Fulltime', value: 'fulltime'}, {label: 'Part Time', value: 'parttime'}, {label: 'Contract', value: 'contract'}, {label: 'Internship', value: 'internship'}, {label: 'Temporary', value: 'temporary'}],
      employerSet: [{label: 'Any', value: ''}, {label: 'Recruiter', value: 'recruiter'}, {label: 'Employer', value: 'employer'}],
      employerType: 'Any',
      jobType: 'Any',
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

    console.log(q);
  }

  stateChange(event) {
    let key = event.target.name;
    this.setState({
      [key]: event.target.value
    });
    // console.log(key, event.target.value);
  }

  render(){
    var Tabs = (props) => (
      <div className="radio-box job">
        {props.types.map((item, i) =>
          <div>
            <span>{item.label}</span>
            <input type="radio" name={props.name} value={item.value} key={i}
              checked={item.value === this.state[props.name]} onChange={ this.stateChange.bind(this) } />
          </div>
        )}
      </div>
    );

    return (
      <div>
      <form action="" className="search">
        <div className="main-search">
          <div>
            <input type="text" placeholder="Position" name="position" value={this.state.position} onChange={ this.stateChange.bind(this) } />
          </div>
          <div>
            <input type="text" placeholder="Location" name="location" value={this.state.location} onChange={ this.stateChange.bind(this) } />
          </div>
          <button onClick={this.submitForm.bind(this)}><i className="fa fa-arrow-circle-right"></i></button>
          <a href="#" className="advanced">Advanced Search</a>
        </div>
        <div className="advanced">
          <div>
            <div className="radius">
              <h3>Radius</h3>
              <input type="range" name="range" min="0" max="100" step="10" onChange={ this.stateChange.bind(this) } />
              <div className="range">
                <span>0<br/>miles</span>
                <span>50</span>
                <span>100<br/>miles</span>
              </div>
            </div>

            <Tabs types={this.state.jobSet} name={"jobType"} />

            <Tabs types={this.state.employerSet} name={"employerType"} />

          </div>
        </div>
        </form>
      </div>
    );
  }
}

export default Home;
