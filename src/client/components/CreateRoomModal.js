/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes, Component } from 'react';
import styles from './CreateRoomTest.css';
import withStyles from '../../decorators/withStyles';
import UserActions from '../../actions/UserActions'
import { ButtonInput,OverlayTrigger,Tooltip,ProgressBar,Label,Well,Popover,Grid,Row, Button,Input, Panel, Col,Modal} from 'react-bootstrap';
@withStyles(styles)
class CreateRoomTest extends Component {
	constructor() {
		super();
		this.state = {};
	};

	static propTypes = {
		isOpen: React.PropTypes.bool
	};
	static defaultProps = {
		isOpen: false
	};

	close() {
		this.props.isOpen = false;
		this.forceUpdate();
	};

	submitHandler() {
		var createRoomData = {};
		createRoomData.DCUrl = this.refs.DCUrl.getValue();
		createRoomData.PSW = this.refs.PSW.getValue();
		createRoomData.EndTime = this.refs.EndTime.getValue();
		createRoomData.GroupName = this.refs.GroupName.getValue();
		UserActions.userCreateRoom(createRoomData);
	};

	handleChange() {
	};

	render() {
		return (
			<Modal show={this.props.isOpen} backdrop={false} onHide={()=>this.props.closeHandler()}>
				<Modal.Header closeButton>
					<Modal.Title>Modal heading</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Input type="text" label="GroupName" ref="GroupName" onChange={()=>this.handleChange}/>
					<Input type="text" value="http://waimai.baidu.com/waimai/shop/17505482147936014164" label="DCUrl"
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
export default CreateRoomTest;
