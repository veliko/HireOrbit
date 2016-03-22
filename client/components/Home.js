import React, { Component, PropTypes } from 'react';

class Home extends Component {
  constructor(){
    super();
  }

  render(){
    return (
      <div>
      <form action="" className="search">
        <div className="main-search">
          <div>
            <input type="text" placeholder="Position" name="position" />
          </div>
          <div>
            <input type="text" placeholder="Location" name="location" />
          </div>
          <button><i className="fa fa-arrow-circle-right"></i></button>
          <a href="#" className="advanced">Advanced Search</a>
        </div>
        <div className="advanced">
          <div>
            <div className="radius">
              <h3>Radius</h3>
              <input type="range" min="0" max="100" step="10" />
              <div className="range">
                <span>0<br/>miles</span>
                <span>50</span>
                <span>100<br/>miles</span>
              </div>
            </div>

            <div className="radio-box job">
              <div>
                <span>Any</span>
                <input type="radio" name="job-type" value="Any" checked />
              </div>
              <div>
                <span>Annual</span>
                <input type="radio" name="job-type" value="Annual" />
              </div>
              <div>
                <span>Permanent</span>
                <input type="radio" name="job-type" value="Permanent" />
              </div>
              <div>
                <span>Contract</span>
                <input type="radio" name="job-type" value="Contract" />
              </div>
            </div>

            <div className="radio-box employer">
              <div>
                <span>Any</span>
                <input type="radio" name="post-type" value="Any" checked />
              </div>
              <div>
                <span>Recruiter</span>
                <input type="radio" name="post-type" value="Recruiter" />
              </div>
              <div>
                <span>Employer</span>
                <input type="radio" name="post-type" value="Employer" />
              </div>
            </div>

          </div>
        </div>
        </form>
      </div>
    );
  }
}

export default Home;
