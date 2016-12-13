import React, {
	PropTypes,
	Component
} from 'react';
import {
	OverlayTrigger,
	Label,
	Glyphicon,
	Row,
	Well,
	Popover,
	ProgressBar,
	Badge,
	Panel,
	Col
} from 'react-bootstrap';

class RoomItem extends Component {
	constructor(props) {
		super(props);
		this.clickEnterRoom = this.clickEnterRoom.bind(this);
	}
	clickEnterRoom() {
		event.preventDefault();
		this.props.enterHandler(this.props.itemDate.get("RID"), this.props.itemDate.get("hasPSW"));
	}
	render() {
		var showlock = "";
		console.log("this.props->", this.props.itemDate);
		if (this.props.itemDate.get("hasPSW")) {
			showlock = <Glyphicon glyph="lock"/>;
		}
		return (
			<Col xs={4} md={4} onClick={this.clickEnterRoom}>
				<OverlayTrigger id={this.props.itemDate.get("RID")} placement="top"
								overlay={<Popover id={this.props.itemDate.get("RID")} title={this.props.itemDate.get("groupName")}>{this.props.itemDate.get("foodData").name}</Popover>}>
					<Well>
						<Row className="show-grid">
							<Col xs={6} md={6}>
								<div>{this.props.itemDate.get("groupName")}</div>
							</Col>
							<Col xs={4} md={4}>
								<div><font size="3" color="red">{this.props.itemDate.get("endTime")}</font></div>
							</Col>
							<Col xs={2} md={2}>
								{showlock}
							</Col>
						</Row>

						<ProgressBar>
							<ProgressBar active  label={20+"人"}  bsStyle="info" now={35} key={1} />
							<ProgressBar active label={60+"人"} bsStyle="warning" now={65} key={2} />
						</ProgressBar>
						<Row className="show-grid">
							<Col xs={12} md={12}>
								<center><Label>{this.props.itemDate.get("RID")}</Label></center>
							</Col>
						</Row>
					</Well>
				</OverlayTrigger>
			</Col>
		);
	}
}
// RoomItem.propTypes = {
// 	endTime: PropTypes.string.isRequired,
// 	RID: PropTypes.number.isRequired,
// 	MaxCost: PropTypes.string.isRequired,
// 	state: PropTypes.string.isRequired,
// 	hasPSW: PropTypes.bool.isRequired,
// 	enterHandler: PropTypes.func.isRequired,
// 	groupName: PropTypes.string.isRequired,
// 	playerNum: PropTypes.number.isRequired,
// 	foodData: PropTypes.shape({ // 是否符合指定格式的物件
// 		name: PropTypes.string.isRequired,
// 		logo: PropTypes.string.isRequired,
// 		phone: PropTypes.string.isRequired,
// 		address: PropTypes.string.isRequired
// 	})
// };
export default RoomItem;