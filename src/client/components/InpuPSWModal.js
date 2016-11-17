/**
 * input PSW 
 */
import React, {
	PropTypes,
	Component
}
from 'react';
import {
	setLoadingState
}
from '../actions/state';
import {
	ButtonInput,
	OverlayTrigger,
	Media,
	Thumbnail,
	Tooltip,
	ProgressBar,
	Label,
	Well,
	Popover,
	Grid,
	Row,
	Button,
	Input,
	Panel,
	Col,
	Modal
}
from 'react-bootstrap';
import {
	connect
}
from 'react-redux';
import {
	BD_TYPES
}
from '../../common/baidu/BaiDuTypes';
import {
	createRoom
}
from '../actions/hall';
import _ from 'lodash';
import {
	delModal
}
from '../actions/modal';
class OrderForFoodsModal extends Component {
	constructor() {
		super();
		this.submitHandler = this.submitHandler.bind(this);
		this.timeSelectHandler = this.timeSelectHandler.bind(this);
	}
	render() {
		var fooddata = this.props.foodData;
		return (
			<Modal show={true} backdrop={false} dialogClassName="custom-modal" bsSize="lg" onHide={()=>this.props.delModal()}>
				<Modal.Header closeButton>
					<Modal.Title id="contained-modal-title-lg">{fooddata.name}</Modal.Title>
				</Modal.Header>
				<Modal.Body>
                    <Label type="text" label="GroupName" ref="GroupName" />
                    <Label type="text" label="PSW" ref="PSW"/>
                    <Label type="text" label="MaxCost" ref="MaxCost"/>
                    <Label type="radio" name="inlineRadioOptions" label="Radio1" value="option1"/>
                    <Label type="radio" name="inlineRadioOptions" label="Radio2" value="option2"/>
                    <Label type="select" label="EndTime" defaultValue={this.props.DEFAULT_TIME} onChange={this.timeSelectHandler} />
                    <Row key="1">
						{v_fdlist}
					</Row>
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
		delModal: PropTypes.func.isRequired,
		setLoadingState: setLoadingState,
		isLoading: state.sys.get("sysStateInfo_isLoading")
	}
}

OrderForFoodsModal.propTypes = {
	delModal: PropTypes.func.isRequired,
	setLoadingState: PropTypes.func.isRequired,
	isLoading: PropTypes.bool.isRequired
};
export default connect(
	mapStateToProps, {
		createRoom,
		delModal,
		setLoadingState
	}
)(OrderForFoodsModal);