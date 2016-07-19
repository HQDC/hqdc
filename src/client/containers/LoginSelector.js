/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */
import React, {PropTypes, Component}from 'react';
import {userLogin}from '../actions/user';
import {connect}from 'react-redux';
import LoginPage from  './LoginPage';
import HallPage from  './HallPage';
class LoginSelector extends Component {
    render() {
        let {ret} = this.props;
        console.log("this.props",this.props);
        let showView = "";
        if(ret == 0){
            showView= <HallPage />;
        }else{
            showView= <LoginPage />;
        }
        //let showView = (ret == 1?<div> bye </div> :<div> hello </div>);
        return (showView);
    }
}

function mapStateToProps(state) {
    return {
        ret: state.user.userSession.get("ret")
    }
}

LoginSelector.propTypes = {
    ret: PropTypes.number.isRequired
};

export default connect(
    mapStateToProps, {

    })(LoginSelector);