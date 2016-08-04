/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */
import React, {
    PropTypes, Component
}
from 'react';
import RoomItem from './RoomItem';

import {
    connect
}
from 'react-redux';
import {
    ButtonInput, OverlayTrigger, ProgressBar, Label, Well, Popover, Grid, Row, Button, Input, Panel, Col
}
from 'react-bootstrap';
import ImmutablePropTypes from 'react-immutable-proptypes';
class HallPage extends Component {
    render() {
        console.log("hall Render");
        var ingitems = this.props.ing.map((item) => {
            console.log("this.props.ing-->");
            return (
                <h4>{item.GroupName}</h4>
                //<RoomItem {...item} key={item.groupID}/>
            );
        });

        var doneitems = this.props.done.map((item) => {
            console.log("this.props.done-->");
            return (
                <h4>{item.GroupName}</h4>
               // <RoomItem {...item} key={item.groupID}/>
            );
        });
        return (
            <Row className="show-grid">
                <Col xs={6} md={6}>
                    <Panel header="Ing" bsStyle="success">
                        <h2>asdfsd</h2>
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
    return {
        ret: 0,
        done: state.hall.done,
        ing: state.hall.ing
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