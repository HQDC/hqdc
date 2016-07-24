/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */
import React, {
    PropTypes, Component
}
from 'react';
import {
    createRoom
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
        this.state = {};
    };

    close() {
        this.forceUpdate();
    };

    submitHandler() {
        var createRoomData = {};
        createRoomData.DCUrl = this.refs.DCUrl.getValue();
        createRoomData.PSW = this.refs.PSW.getValue();
        createRoomData.EndTime = this.refs.EndTime.getValue();
        createRoomData.GroupName = this.refs.GroupName.getValue();
        this.props.createRoom(createRoomData);
    };

    handleChange() {};

    render() {
        console.log("CreateRoomTestModal render");
        return (
            <Modal show={true} backdrop={false} onHide={()=>this.props.delModal()}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Input type="text" label="GroupName" ref="GroupName" onChange={()=>this.handleChange}/>
                    <Input type="text" value="http://waimai.baidu.com/waimai/shop/1447461529" label="DCUrl"
                           ref="DCUrl"/>
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
                    <center><Button bsStyle="info" onClick={()=>this.submitHandler()}>Submit</Button></center>
                </Modal.Footer>
            </Modal>
        );
    }
}

function mapStateToProps(state) {
    return {
        createRoom: createRoom
    }
}

CreateRoomTestModal.propTypes = {
    createRoom: PropTypes.func.isRequired
};

export default connect(
    mapStateToProps, {
        createRoom,
        delModal
    }
)(CreateRoomTestModal);