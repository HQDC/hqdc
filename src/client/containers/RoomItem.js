/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */
import React, { PropTypes, Component } from 'react';
import { OverlayTrigger,Label,Glyphicon, Row, Well,Popover, ProgressBar,Badge, Panel, Col} from 'react-bootstrap';
class RoomItem extends Component {
	constructor() {
		super();
		this.state = {
			groupID: 0,
			groupName: "",
			completeNum: 0,
			totalNum: 0,
			psw: "",
			snackBarName: ""
		};
	}
	;

	loginHandler() {
		var userName = this.refs.username.getValue();
		UserActions.userLogin(userName);
	}
	;

	render() {
		var itemdata = this.props.children;
		var showlock;
		if (itemdata.psw != null && itemdata.psw != "") {
			showlock = <Glyphicon glyph="lock"/>;
		} else {
			showlock = "";
		}
		return (
			<Col xs={4} md={4}>
				<OverlayTrigger id={itemdata.groupID} placement="top"
								overlay={<Popover id={itemdata.groupID} title="Popover bottom"><strong>{itemdata.groupName}</strong>{itemdata.snackBarName}</Popover>}>
					<Well>
						<Row className="show-grid">
							<Col xs={6} md={6}>
								<div>{itemdata.groupName}</div>
							</Col>
							<Col xs={4} md={4}>
								<div>{itemdata.snackBarName}</div>
							</Col>
							<Col xs={2} md={2}>
								{showlock}
							</Col>
						</Row>
						<ProgressBar>
							<ProgressBar bsStyle="success" now={itemdata.completeNum} key={1}/>
							<ProgressBar bsStyle="warning" now={itemdata.totalNum} key={2}/>
						</ProgressBar>
						<Row className="show-grid">
							<Col xs={12} md={12}>
								<center><Label>{itemdata.groupID}</Label></center>
							</Col>
						</Row>
					</Well>
				</OverlayTrigger>
			</Col>
		);
	}

	;
}
export default RoomItem;
