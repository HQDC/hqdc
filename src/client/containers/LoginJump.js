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
import HallPage from './HallPage';
import LoginPage from './LoginPage';

import store from 'store';
class LoginJump extends Component {
    constructor(props) {
        super(props);
        this.testSessionHandler = this.testSessionHandler.bind(this);
    }
    testSessionHandler(sid) {
        console.log("LoginJump store.SID", sid);
        if (sid.length > 0) {
            return "hello";
            //return HallPage
        }
        return LoginPage
    }
    render() {
        let {
            sid
        } = this.props;
        let ShowView = this.testSessionHandler(sid);
        return (
            <ShowView />
        );
    }
}

function mapStateToProps(state) {
    return {
        sid: (store.get("SID")?store.get("SID"):"")
    }
}

LoginJump.propTypes = {
    sid: PropTypes.string.isRequired
};

export default connect(
    mapStateToProps, {

    })(LoginJump);