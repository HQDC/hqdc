/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
class NotFoundPage extends Component {
	render() {
		const {nowPath} = this.props;
		return (
			<div>
				<h1>{"NotFoundPage >> " + nowPath}</h1>
				<p>Sorry, but the page you were trying to view does not exist.</p>
			</div>
		);
	}
}

NotFoundPage.propTypes = {
	nowPath: PropTypes.string.isRequired
};

function mapStateToProps(state) {
	return {
		nowPath: state.router.location.pathname.substring(1)
	}
}

export default connect(mapStateToProps, {})(NotFoundPage)
