import React, { Component, PropTypes } from 'react';
import App from '../components/App';
import { connect } from 'react-redux';
import { addCardsToKanban } from '../actions';

class AppContainer extends Component {
  render() {
    return (
      <App {...this.props}/>
    );
  }
}

function mapStateToProps(state) {
  return {
    cards: state.cards
  }
}

export default connect(mapStateToProps, { addCardsToKanban })(AppContainer);
