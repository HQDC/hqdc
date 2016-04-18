/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */
import React, { PropTypes, Component } from 'react';
import { userLogin } from '../actions/user';
import { connect } from 'react-redux';
import { ButtonInput,Tooltip,Col ,Button,Row,Panel,Input,Label} from 'react-bootstrap';

class LoginPage extends Component {
	constructor(props) {
		super(props);
		this.loginHandler = this.loginHandler.bind(this);
	}

	loginHandler() {
		console.log("show body username:", this.refs.username);
		var userName = this.refs.username.getValue();
		//this.props.addAlert("info",("hello"+this.props.alertLg));
		this.props.userLogin(userName);
	};

	render() {

		let {session} = this.props;
		console.log("render loginPage",session);
		return (
			<Panel>
				<form>
					<Row>
						<Input type="text" ref="username" label="Name" bsSize="large" placeholder="Name"/>
					</Row>
					<ButtonInput onClick={this.loginHandler} bsStyle="primary" value="Submit Button"/>
				</form>
			</Panel>
		);
	}
}

function mapStateToProps(state) {
	return {
		userLogin: userLogin,
		session:state.user.userSession
	}
}

LoginPage.propTypes = {
	userLogin: PropTypes.func.isRequired
};

export default connect(
	mapStateToProps, {
		userLogin
	})(LoginPage);
