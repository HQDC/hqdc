/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */
import React, {
    PropTypes,
    Component
}
from 'react';
import RoomItem from './RoomItem';

import {
    connect
}
from 'react-redux';
import {
    ButtonInput,
    OverlayTrigger,
    ProgressBar,
    Label,
    Well,
    Popover,
    Grid,
    Row,
    Button,
    Input,
    Panel,
    Col
}
from 'react-bootstrap';
import ImmutablePropTypes from 'react-immutable-proptypes';
class HallPage extends Component {
    render() {
        console.log("hall Render");
        var ingItems = [];
        for (var i = 0; i < this.props.ing.length; i++) {
            var ingItem = this.props.ing[i];
            ingItems.push(
                <RoomItem {...ingItem} key={ingItem.groupID}/>
            );
        }
        var downItems = [];
        for (var j = 0; j < this.props.done.length; j++) {
            var downItem = this.props.done[j];
            downItems.push(
                <RoomItem {...downItem} key={downItem.groupID}/>
            );
        }

        return (
            <Row className="show-grid">
                <Col xs={6} md={6}>
                    <Panel header="Ing" bsStyle="success">
                        {ingItems}
                    </Panel>
                </Col>
                <Col xs={6} md={6}>
                    <Panel header="Complete" bsStyle="warning">
                        {downItems}
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