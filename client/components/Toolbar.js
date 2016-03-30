import React, { Component, PropTypes } from 'react';

class Toolbar extends Component {
  constructor() {
    super(...arguments);
  }
  handleInputChange(e) {
    this.props.updateFilterValue(e.target.value);
  }
  render() {
    console.log('inside toolbar: ', this.props);
    return(
      <div className="toolbar">
        <span className="fa fa-sort-amount-desc toolbar"></span>
        <button className="toolbar__button" 
                onClick={() => this.props.changeSortingCriteria('stars')}
                style={this.props.sortBy === "stars" ? {backgroundColor: "#00CED1"} : {backgroundColor: "#cccccc"}}>
          <span className="fa fa-star toolbar"></span>
        </button>
        <button className="toolbar__button" 
                onClick={() => this.props.changeSortingCriteria('events')}
                style={this.props.sortBy === "events" ? {backgroundColor: "#00CED1"} : {backgroundColor: "#cccccc"}}>
          <span className="fa fa-calendar toolbar"></span>
        </button>
        <button className="toolbar__button" 
                onClick={() => this.props.changeSortingCriteria('none')}
                style={this.props.sortBy === "none" ? {backgroundColor: "#00CED1"} : {backgroundColor: "#cccccc"}}>
          <span className="fa fa-ban toolbar"></span>
        </button>
        <span className="fa fa-filter toolbar"></span>
        <input type="text" 
               className="filter__input" 
               value={this.props.filterValue} 
               onChange={this.handleInputChange.bind(this)}
               placeholder="Filter Board" />
      </div>

    );
  }
}

export default Toolbar;