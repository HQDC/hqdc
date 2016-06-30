/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */
import React, {
    PropTypes, Component
}
from 'react';
import RoomItem from './RoomItem';
import {
    createRoom
}
from '../actions/user';
import {
    connect
}
from 'react-redux';
import {
    ButtonInput, OverlayTrigger, ProgressBar, Label, Well, Popover, Grid, Row, Button, Input, Panel, Col
}
from 'react-bootstrap';
class HallPage extends Component {
    render() {
        var ingitems = this.props.ing.map((item) => {
            return (
                <RoomItem key={item.groupID}>{item}</RoomItem>
            );
        });

        var doneitems = this.props.done.map((item) => {
            return (
                <RoomItem key={item.groupID}>{item}</RoomItem>
            );
        });
        return (
            <Row className="show-grid">
                <Col xs={6} md={6}>
                    <Panel header="Ing" bsStyle="success">
                        {ingitems}
                    </Panel>
                </Col>
                <Col xs={6} md={6}>
                    <Panel header="Complete" bsStyle="warning">
                        {doneitems}
                    </Panel>
                </Col>
            </Row>
        );
    }
}

function mapStateToProps(state) {

    var inglist = state.hall
    return {
        ret: 0,
        done: done,
        ing: ing
    }
}

HallPage.propTypes = {
    ret: PropTypes.number.isRequired,
    done: PropTypes.array.isRequired,
    ing: PropTypes.array.isRequired
};

export default connect(
    mapStateToProps
)(HallPage);

/*constructor() {
 super();
 this.state = {ing:[],done:[]};
 for (var i = 0; i < 3; i++) {
 this.state.ing.push(this.creatRoomData(i+1,"RoomIng"+i,40+i,50,"","KFC"+i));
 }
 for (var j = 0; j < 5; j++) {
 this.state.done.push(this.creatRoomData(j+4,"RoomDone"+j,40+j,50,"123","MM"+j));
 }
 };
 creatRoomData(id,name,cpmpleteNum,totalnum,psw,snackBarName){
 var data = {};
 data.groupID = id;
 data.groupName = name;
 data.completeNum = cpmpleteNum;
 data.totalNum = totalnum;
 data.psw = psw;
 data.snackBarName = snackBarName;
 return data;
 }*/