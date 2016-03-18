import React, { Component, PropTypes } from 'react';
import List from '../components/List';
import { connect } from 'react-redux';
import { updateCardStatus, updateCardPosition } from '../actions';

class ListContainer extends Component {
  render() {
    return (
      <List {...this.props}/>
    );
  }
}

ListContainer.propTypes = {
  updateCardStatus: PropTypes.func.isRequired,
  updateCardPosition: PropTypes.func.isRequired
}

export { ListContainer };
export default connect(null, { updateCardStatus, updateCardPosition })(ListContainer);
