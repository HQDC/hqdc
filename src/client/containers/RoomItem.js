/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */
import React, { PropTypes, Component } from 'react';
import { OverlayTrigger,Label,Glyphicon, Row, Well,Popover, ProgressBar,Badge, Panel, Col} from 'react-bootstrap';
class RoomItem extends Component {

	render() {

		var showlock = "";
		if (this.props.hasPSW) {
			showlock = <Glyphicon glyph="lock"/>;
		}
		return (
			<Col xs={4} md={4}>
				<OverlayTrigger id={this.props.RID} placement="top"
								overlay={<Popover id={this.props.RID} title="Popover bottom"><strong>{this.props.GroupName}</strong>{this.props.foodData.name}</Popover>}>
					<Well>
						<Row className="show-grid">
							<Col xs={6} md={6}>
								<div>{this.props.GroupName}</div>
							</Col>
							<Col xs={4} md={4}>
								<div>{this.props.EndTime}</div>
							</Col>
							<Col xs={2} md={2}>
								{showlock}
							</Col>
						</Row>
						<ProgressBar>
							<ProgressBar bsStyle="success" now={100} key={1}/>
							<ProgressBar bsStyle="warning" now={100} key={2}/>
						</ProgressBar>
						<Row className="show-grid">
							<Col xs={12} md={12}>
								<center><Label>{this.props.RID}</Label></center>
							</Col>
						</Row>
					</Well>
				</OverlayTrigger>
			</Col>
		);
	}
}
RoomItem.propTypes = {
    EndTime: PropTypes.string.isRequired,
    RID: PropTypes.number.isRequired,
    MaxCost: PropTypes.string.isRequired,
    State: PropTypes.string.isRequired,
    hasPSW: PropTypes.bool.isRequired,
    GroupName: PropTypes.string.isRequired,
    playerNum: PropTypes.number.isRequired,
    foodData: PropTypes.shape({ // 是否符合指定格式的物件
        name: PropTypes.string.isRequired,
        logo: PropTypes.string.isRequired,
        phone: PropTypes.string.isRequired,
        address: PropTypes.string.isRequired
    })
};
export default RoomItem;
