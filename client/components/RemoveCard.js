import React, { Component, PropTypes } from 'react';
import Utils from '../utils/Utils';

class RemoveButton extends Component {
  constructor() {
    super(...arguments);
  }

  deleteCard() {
    this.props.deleteCardFromKanban(this.props.card_id);
  }

  render() {
    return (
      <span className="fa fa-times" onClick={this.deleteCard.bind(this)}></span>
    );
  }
}

export default RemoveButton;