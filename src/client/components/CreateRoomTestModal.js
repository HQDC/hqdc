/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */
import React, {
    PropTypes, Component
}
from 'react';
import {
    getFoodList
}
from '../actions/user';
import {
    setLoadingState
}
    from '../actions/state';
import {
    delModal
}
from '../actions/modal';
import {
    connect
}
from 'react-redux';
import {
    ButtonInput, OverlayTrigger, Tooltip, ProgressBar, Label, Well, Popover, Grid, Row, Button, Input, Panel, Col, Modal
}
from 'react-bootstrap';
class CreateRoomTestModal extends Component {
    constructor() {
        super();
        console.log("CreateRoomTestModal constructor");
        this.submitHandler = this.submitHandler.bind(this);
        this.state = {};
    };

    close() {
        this.forceUpdate();
    };

    submitHandler() {
        if(this.props.isLoading){
            return;
        }
        var createRoomData = {};
        console.log("url:", this.refs.DCUrl.getValue());
        createRoomData.DCUrl = this.refs.DCUrl.getValue();
        this.props.setLoadingState();
        this.props.getFoodList(createRoomData);
    };

    handleChange() {};

    render() {
        console.log("CreateRoomTestModal render: isLoading",this.props.isLoading);
        return (
            <Modal show={true} dialogClassName="custom-modal" backdrop={true} onHide={()=>this.props.delModal()}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Input type="text" label="DCUrl" defaultValue="http://waimai.baidu.com/waimai/shop/1438078139" ref="DCUrl"/>
                </Modal.Body>
                <Modal.Footer>
                    <center><Button bsStyle={this.props.isLoading?"warning" :"info"} onClick={this.submitHandler}>{this.props.isLoading ? "Loading" : "Submit"}</Button></center>
                </Modal.Footer>
            </Modal>
        );
    }
}

function mapStateToProps(state) {
    return {
        getFoodList: getFoodList,
        setLoadingState: setLoadingState,
        uid: state.user.userSession.get("SID"),
        isLoading: state.sys.get("sysStateInfo_isLoading")
    }
}

CreateRoomTestModal.propTypes = {
    getFoodList: PropTypes.func.isRequired,
    setLoadingState: PropTypes.func.isRequired,
    uid: PropTypes.string.isRequired,
    isLoading: PropTypes.bool.isRequired
};

export default connect(
    mapStateToProps, {
        getFoodList,
        delModal,
        setLoadingState
    }
)(CreateRoomTestModal);