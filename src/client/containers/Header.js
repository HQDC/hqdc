/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, {
    PropTypes,
    Component
}
from 'react';
import {
    connect
}
from 'react-redux';
import {
    Navbar,
    Nav,
    NavItem,
    NavDropdown,
    MenuItem,
    Col
}
from 'react-bootstrap';
import {
    userLogout
}
from '../actions/user';
import {
    addModal
}
from '../actions/modal'
import {
    addAlert
}
from '../actions/alert'
import CreateRoomTestModal from '../components/CreateRoomTestModal';
//import CreateRoomTestModal from '../components/OrderForFoodsModal';
import ViewUpdateTypes from '../constants/UpdateViewTypes';
import ImmutablePropTypes from 'react-immutable-proptypes';
class Header extends Component {
    // Listen for changes
    // 
    componentDidMount() {

    };
    constructor(props) {
        super(props);
        this.handleSelect = this.handleSelect.bind(this);
        this.showCreateRoomHandler = this.showCreateRoomHandler.bind(this);
    }
    handleSelect(event, selectedKey) {
        event.preventDefault();
        console.log("click log out", selectedKey);
        this.props.userLogout();
    }

    showCreateRoomHandler(selectedKey) {
            event.preventDefault();
            console.log("click create room", selectedKey);
            this.props.addModal(CreateRoomTestModal);
        }
        // Unbind change listener
    componentWillUnmount() {

    };
    render() {
        var dpdown;
        var croom;
        let {
            isLogin,
            name,
            ip
        } = this.props;

        if (isLogin == true) {
            croom = (<NavItem eventKey={2} onSelect={this.showCreateRoomHandler} >Creat Room</NavItem>);
            dpdown =
                <NavDropdown eventKey={3} onSelect={this.handleSelect} title={name +":"+ ip}
                             id="collapsible-navbar-dropdown">
                    <MenuItem eventKey='3.1' >注销</MenuItem>
                </NavDropdown>;
        } else {
            croom = "";
            dpdown = <NavItem eventKey={4} href="/login">未登录</NavItem>;
        }



        var returnContainer =
            <Navbar inverse>
                <Navbar.Header>
                        <Navbar.Brand>
                            <a href="#">SinceTimes</a>
                        </Navbar.Brand>
                        <Navbar.Toggle />
                </Navbar.Header> <Navbar.Collapse >
                <Nav pullRight eventKey = {1}> {croom} {dpdown}</Nav>
                </Navbar.Collapse>
            </Navbar>

        return returnContainer;
    }
}

function mapStateToProps(state) {
    console.log("mapStateToProps", state);
    return {
        ret: state.user.get('ret'),
        isLogin: state.user.get('isLogin'),
        name: state.user.get("name"),
        ip: state.user.get("ip"),
        userLogout: userLogout,
        addModal: addModal,
        addAlert: addAlert
    }
}

Header.propTypes = {
    ret: PropTypes.number.isRequired,
    userLogout: PropTypes.func.isRequired,
    addModal: PropTypes.func.isRequired,
    addAlert: PropTypes.func.isRequired,
    isLogin: PropTypes.bool.isRequired,
    ip: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
};

export default connect(
    mapStateToProps, {
        userLogout,
        addModal,
        addAlert
    })(Header)