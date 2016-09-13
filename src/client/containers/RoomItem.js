/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */
import React, { PropTypes, Component } from 'react';
import { OverlayTrigger,Label,Glyphicon, Row, Well,Popover, ProgressBar,Badge, Panel, Col} from 'react-bootstrap';
import reactCSS, { hover } from 'reactcss';

class RoomItem extends Component {
	render() {
        const styles = reactCSS({
            'default': {
                card: {
                    background: this.props.background,
                    boxShadow: '0 2px 4px rgba(0,0,0,.15)'
                }
            }
        });

		var showlock = "";
		if (this.props.hasPSW) {
			showlock = <Glyphicon glyph="lock"/>;
		}
		return (
			<Col xs={4} md={4}>
				<OverlayTrigger id={this.props.RID} placement="top"
								overlay={<Popover id={this.props.RID} title={this.props.GroupName}>{this.props.foodData.name}</Popover>}>
					<Well bsClass={styles.card}>
						<Row className="show-grid">
							<Col xs={6} md={6}>
								<div>{this.props.GroupName}</div>
							</Col>
							<Col xs={4} md={4}>
								<div><font size="3" color="red">{this.props.EndTime}</font></div>
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
