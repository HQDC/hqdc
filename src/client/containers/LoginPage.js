/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */
import React, {
    PropTypes,
    Component
}
from 'react';
import {
    userLogin
}
from '../actions/user';
import {
    connect
}
from 'react-redux';
import {
    ButtonInput,
    Tooltip,
    Col,
    Button,
    Row,
    Panel,
    Input,
    Label
}
from 'react-bootstrap';

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
        let {
            ret
        } = this.props;
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
        ret: state.user.get("ret")
    }
}

LoginPage.propTypes = {
    userLogin: PropTypes.func.isRequired,
    ret: PropTypes.number.isRequired
};

export default connect(
    mapStateToProps, {
        userLogin
    })(LoginPage);