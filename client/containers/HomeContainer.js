import React, { Component } from 'react';
import Home from '../components/Home';
import { connect } from 'react-redux';
import { updateCurrentSearch, updateCurrentQuery } from '../actions';

class HomeContainer extends Component {
	render() {
		return (
			<Home {...this.props}/>
		);
	}
}

export default connect(null, { updateCurrentSearch, updateCurrentQuery })(HomeContainer);
