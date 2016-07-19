/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */
import React, {
    PropTypes, Component
}
from 'react';
import {
     userTestSession
}
from '../actions/user';
import {
    connect
}
from 'react-redux';
import HallPage from './HallPage';
import LoginPage from './LoginPage';

import store from 'store';
class LoginJump extends Component {
    constructor(props) {
        super(props);
        this.testSessionHandler = this.testSessionHandler.bind(this);
        this.viewSelecterHandler = this.viewSelecterHandler.bind(this);
    }

    testSessionHandler(SID) {
        if (SID.length > 0) {
            this.props.userTestSession(SID);
        }
    }
    viewSelecterHandler(isLogin) {
        if (isLogin) {
            //return "hello";
            return HallPage;
        }
        return LoginPage;
    }

    render() {
        let {
            SID,isLogin
        } = this.props;
        this.testSessionHandler(SID);
        let ShowView = this.viewSelecterHandler(isLogin);
        return (
            <ShowView />
        );
    }
}

function mapStateToProps(state) {
    return {
        userTestSession: userTestSession,
        SID: state.user.userSession.get("SID"),
        isLogin:state.user.userSession.get("isLogin")
    }
}

LoginJump.propTypes = {
    SID: PropTypes.string.isRequired,
    userTestSession: PropTypes.func.isRequired,
    isLogin:PropTypes.bool.isRequired
};

export default connect(
    mapStateToProps, {
        userTestSession
    })(LoginJump);