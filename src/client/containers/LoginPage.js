/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */
import React, {
    PropTypes, Component
}
from 'react';
import {
    userLogin, userTestSession
}
from '../actions/user';
import {
    connect
}
from 'react-redux';
import {
    ButtonInput, Tooltip, Col, Button, Row, Panel, Input, Label
}
from 'react-bootstrap';
import cookieutil
from '../../common/utils/cookieutil';
class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.loginHandler = this.loginHandler.bind(this);
        this.retStateHandler = this.retStateHandler.bind(this);
        this.testSessionHandler = this.testSessionHandler.bind(this);
    }

    loginHandler() {
        console.log("show body username:", this.refs.username);
        var userName = this.refs.username.getValue();
        //this.props.addAlert("info",("hello"+this.props.alertLg));
        this.props.userLogin(userName);
    };
    testSessionHandler() {
        var sid = cookieutil.getCookie("SID");
        console.log(document.cookies)
        console.log("Client Cookie", sid)
        if (sid) {
            this.props.userTestSession(sid);
        };
    }
    retStateHandler(ret) {
        /*console.log("retStateHandler:",session);
        console.log("history:",this.props.history);
        console.log("router:",reduxReactRouter);
        pushState(null, "/hall");
        this.props.history.pushState(null, "/hall")*/
        console.log("retStateHandler:", ret);
        if (ret == 0) {
            //this.props.pushState(null, "/hall")
        }
    }

    render() {
        let {
            session, ret
        } = this.props;
        this.testSessionHandler();
        this.retStateHandler(ret);
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
        userTestSession: userTestSession,
        session: state.user.userSession,
        ret: state.user.userSession.get("ret")
    }
}

LoginPage.propTypes = {
    userLogin: PropTypes.func.isRequired,
    userTestSession: PropTypes.func.isRequired,
    ret: PropTypes.number.isRequired
};

export default connect(
    mapStateToProps, {
        userLogin,
        userTestSession
    })(LoginPage);