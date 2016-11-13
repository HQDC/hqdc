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
    addModal
}
from '../actions/modal';

import {
    addAlert
}
from '../actions/alert';

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
import OrderForFoodsModal from '../components/OrderForFoodsModal';

class HallPage extends Component {
    constructor(props) {
        super(props);
        this.enterHandler = this.enterHandler.bind(this);
    }

    enterHandler(data) {
        console.log("enter Handler Data HallPage -->", data);
        console.assert(OrderForFoodsModal != null, "error OrderForFoodsModal is Null");
        this.props.addModal(OrderForFoodsModal);
    }
    render() {
        console.log("hall Render");
        var ingItems = [];
        for (var i = 0; i < this.props.ing.length; i++) {
            var ingItem = this.props.ing[i];
            ingItems.push(
                <RoomItem {...ingItem} enterHandler={this.enterHandler} key={"ing"+i}/>
            );
        }
        var downItems = [];
        for (var j = 0; j < this.props.done.length; j++) {
            var downItem = this.props.done[j];
            downItems.push(
                <RoomItem {...downItem} enterHandler={this.enterHandler} key={"done"+j}/>
            );
        }

        return (
            <Row className="show-grid" key="hallPage-Row">
                <Col xs={6} md={6} key="CollIng">
                    <Panel header="Ing" bsStyle="success" key="p_ing">
                        {ingItems}
                    </Panel>
                </Col>
                <Col xs={6} md={6} key="ColDone">
                    <Panel header="Complete" bsStyle="warning" key="p_done">
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
        addModal: addModal,
        addAlert: addAlert,
        done: state.hall.done,
        ing: state.hall.ing
    }
}

HallPage.propTypes = {
    ret: PropTypes.number.isRequired,
    done: PropTypes.array.isRequired,
    addModal: PropTypes.func.isRequired,
    addAlert: PropTypes.func.isRequired,
    ing: PropTypes.array.isRequired
};

export default connect(
    mapStateToProps, {
        addAlert,
        addModal
    }
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