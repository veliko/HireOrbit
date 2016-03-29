import React, { Component, PropTypes } from 'react';
import { DropTarget } from 'react-dnd';

class AddCardButton extends Component {
  render() {
    return (
      <span onClick={this.props.toggleModalState} className="fa fa-plus"></span>
    );
  }
}

export default AddCardButton;