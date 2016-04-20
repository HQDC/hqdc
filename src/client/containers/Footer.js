/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */
import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
class Footer extends Component {
	render() {
		return (
			<div className="Footer">
				<div className="Footer-container">
					<span className="Footer-text">© Your Company</span>
					<span className="Footer-spacer">·</span>
					<a className="Footer-link" href="/">Home</a>
					<span className="Footer-spacer">·</span>
					<a className="Footer-link" href="/privacy">Privacy</a>
					<span className="Footer-spacer">·</span>
					<a className="Footer-link" href="/not-found">Not Found</a>
					<span className="Footer-spacer"> | </span>
					<span ref="viewport" className="Footer-viewport Footer-text Footer-text--muted">Viewport:</span>
				</div>
			</div>
		);
	}
}
function mapStateToProps(state) {
	return {
		ret: 0
	}
}

Footer.propTypes = {
	ret: PropTypes.number.isRequired
};

/*export default Footer;*/

export default connect(
	mapStateToProps, {})(Footer);
