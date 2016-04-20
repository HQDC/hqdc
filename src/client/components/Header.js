/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */
import React, {PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import {Navbar,Nav,NavItem,NavDropdown,MenuItem,Col} from 'react-bootstrap';
import {userLogout} from '../actions/user'
import ViewUpdateTypes from '../constants/UpdateViewTypes';

class Header extends Component {
    // Listen for changes
    componentDidMount() {

    };
    constructor(props) {
        super(props);
        this.handleSelect = this.handleSelect.bind(this);
    }
    handleSelect(event, selectedKey) {
        event.preventDefault();
        console.log("click log out",selectedKey);
        this.props.userLogout();
    }
    createRoom( selectedKey) {
        event.preventDefault();
        console.log("click create room",selectedKey);
        this.props.userLogout();
    }
    // Unbind change listener
    componentWillUnmount() {

    };
    render() {
        var dpdown;
        var croom;
        let {session} = this.props;
        console.log("render Header",session);
        if (session.has('user')) {
            croom = (<NavItem eventKey={2} onSelect={this.createRoom} >Creat Room</NavItem>);
            dpdown =
                <NavDropdown eventKey={3} onSelect={this.handleSelect} title={session.get("user") +":"+ session.get("ip")}
                             id="collapsible-navbar-dropdown">
                    <MenuItem eventKey='3.1' >注销</MenuItem>
                </NavDropdown>;
        } else {
            croom = "";
            dpdown = <NavItem eventKey={4} href="/login">未登录</NavItem>;
        }
        return (
            <Navbar inverse >
                <Navbar.Header>
                    <Navbar.Brand>
                        <a href="#">SinceTimes</a>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav pullRight eventKey={1} >
                        {croom}
                        {dpdown}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

function mapStateToProps(state) {
    return {
        ret: 0,
        session:state.user.userSession,
        userLogout: userLogout
    }
}

Header.propTypes = {
    ret: PropTypes.number.isRequired,
    userLogout: PropTypes.func.isRequired
};

export default connect(
    mapStateToProps, {
        userLogout
    })(Header);

