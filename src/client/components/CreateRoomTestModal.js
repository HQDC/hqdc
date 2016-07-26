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
        var createRoomData = {};
        console.log("url:", this.refs.DCUrl.getValue());
        createRoomData.DCUrl = this.refs.DCUrl.getValue();
        createRoomData.PSW = this.refs.PSW.getValue();
        createRoomData.EndTime = this.refs.EndTime.getValue();
        createRoomData.GroupName = this.refs.GroupName.getValue();
        createRoomData.uid = this.props.uid;
        this.props.getFoodList(createRoomData);
    };

    handleChange() {};

    render() {
        console.log("CreateRoomTestModal render");
        return (
            <Modal show={true} dialogClassName="custom-modal" backdrop={true} onHide={()=>this.props.delModal()}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Input type="text" label="GroupName" ref="GroupName" onChange={()=>this.handleChange}/>
                    <Input type="text" label="DCUrl" defaultValue="http://waimai.baidu.com/waimai/shop/1438078139" ref="DCUrl"/>
                    <Input type="text" label="PSW" ref="PSW"/>
                    <Input type="text" label="MaxCost" ref="MaxCost"/>
                    <Input type="radio" name="inlineRadioOptions" label="Radio1" value="option1"/>
                    <Input type="radio" name="inlineRadioOptions" label="Radio2" value="option2"/>
                    <Input type="select" label="EndTime" ref="EndTime" placeholder="select">
                        <option checked value="0">16:40</option>
                        <option value="1">16:50</option>
                        <option value="2">17:00</option>
                        <option value="3">17:10</option>
                        <option value="4">17:20</option>
                        <option value="5">17:30</option>
                        <option value="6">17:40</option>
                        <option value="7">17:50</option>
                        <option value="8">18:00</option>
                    </Input>
                </Modal.Body>
                <Modal.Footer>
                    <center><Button bsStyle="info" onClick={this.submitHandler}>Submit</Button></center>
                </Modal.Footer>
            </Modal>
        );
    }
}

function mapStateToProps(state) {
    return {
        getFoodList: getFoodList,
        uid: state.user.userSession.get("SID"),
    }
}

CreateRoomTestModal.propTypes = {
    getFoodList: PropTypes.func.isRequired,
    uid: PropTypes.string.isRequired
};

export default connect(
    mapStateToProps, {
        getFoodList,
        delModal
    }
)(CreateRoomTestModal);