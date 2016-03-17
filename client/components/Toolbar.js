import React, { Component, PropTypes } from 'react';

class Toolbar extends Component {
  
  handleInputChange(e) {
    this.props.updateFilterValue(e.target.value);
  }
  render() {
    return(
      <div className="toolbar">
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