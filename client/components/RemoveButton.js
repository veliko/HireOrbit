import React, { Component, PropTypes } from 'react';
import Utils from '../utils/Utils';

class RemoveButton extends Component {
  constructor() {
    super(...arguments);
  }

  render() {
    return (
      <span className="fa fa-times remove-event" onClick={() => this.props.removeAction(this.props.removeTarget)}></span>
    );
  }
}

export default RemoveButton;
