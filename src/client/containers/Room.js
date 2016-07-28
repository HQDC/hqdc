/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */
import React, {
    PropTypes, Component
}
from 'react';
from '../actions/user';
import {
    connect
}
from 'react-redux';
import {
    ButtonInput, OverlayTrigger, ProgressBar, Label, Well, Popover, Grid, Row, Button, Input, Panel, Col
}
from 'react-bootstrap';
import ImmutablePropTypes from 'react-immutable-proptypes';
class Room extends Component {
    render() {
        var playerlist = this.props.playerlist.map((item) => {
            return (
                <RoomItem key={item.groupID}>{item}</RoomItem>
            );
        });

        var foodlist = this.props.foodlist.map((item) => {
            return (
                <RoomItem key={item.groupID}>{item}</RoomItem>
            );
        });
        return (
            <Row className="show-grid">
                <Col xs={2} md={2}>
                    <Panel header="Ing" bsStyle="success">
                        {playerlist}
                    </Panel>
                </Col>
                <Col xs={10} md={10}>
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
        playerlist: state.hall.nowRoom.playerlist,
        foodlist: state.hall.nowRoom.foodlist
    }
}

Room.propTypes = {
    playerlist: PropTypes.number.isRequired,
    foodlist: PropTypes.array.isRequired
};

export default connect(
    mapStateToProps
)(Room);