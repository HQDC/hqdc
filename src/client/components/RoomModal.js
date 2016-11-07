/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */
import React, {
	PropTypes,
	Component
}
from 'react';
import {
	ButtonInput,
	OverlayTrigger,
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
class RoomModal extends Component {
	constructor() {
		super();
		this.hidelist = [];
		this.submitHandler = this.submitHandler.bind(this);
	}
	getHideList() {
		var hidelist = [];
		for (var i = 0; i < this.props.foodlist.length; i++) {
			var itemData = this.props.foodlist[i];
			if (itemData != null && itemData.onsell != 0) {
				var refitem = this.refs["ref_show_" + itemData.tid];
				console.log("->", refitem);
				if (refitem != null) {
					if (refitem.getValue()) {

					}
				} else {
					console.error("can't find ", refitem);
				}
			}
		}
	}
	hideHandleChange(e, id) {
		if (e.target.checked) {
			_.remove(this.hidelist, (tid) => {
				return tid == id;
			});
		} else {
			this.hidelist.push(id);
		}
		console.log("idChange->", id, e.target.checked, this.hidelist);
	}
	submitHandler() {

		this.props.createRoom({
			"hidelist": this.hidelist
		});
	}

	/**
	 * 格式化成 订餐统一数据
	 * {
	 * name:店名,
	 * id:店id,
	 * logo:店图片,
	 * phone:电话;
	 * category:店家类型(),
	 * address:地址,
	 * worktime:{begin:,end:}
	 * state:店当前营业状态 (1开店 ,2打样),
	 * score:评分",
	 * invoice:是否支持开发票(1支持,其他不支持),
	 * coupon:是否支持在线付款(1支持,其他不支持),
	 * takeout_menu:[
	 *      {
	 *          name:"菜名1",
	 *          score:"评分",
	 *          tid:"菜id",
	 *          price:"价格",
	 *          dish_attr:[{did:,price:,name:,},...],
	 *          image:"图片",
	 *          des:"描述",
	 *          onsell:"0,1(是否在售,1:true,0:false)"
	 *          leftnum:"" (剩余数量)
	 *      },
	 *      {
	 *
	 *      }
	 *      ]
	 * }
	 * @param data
	 */
	getItem(item) {
		var left_state = item.leftnum > 0 ? "success" : "default";
		return (
			<Col key={item.tid} xs={3}>
				<Thumbnail key={"thumb_"+item.tid} width={200} height={200} src={item.image} alt="无图">
					<center  key={"c_"+item.tid}>
						<Row key={"row_"+item.tid}>
							<h4><Label key={"lab_name_"+item.tid} bsStyle="info">{"名称:" + item.name}</Label></h4>
							<h4><Label key={"lab_price_"+item.tid} bsStyle="warning">{"价格:" + item.price + "元"}</Label></h4>
							<h4><Label key={"lab_leftnum_"+item.tid} bsStyle={left_state}>{"剩余:" + (item.leftnum > 999 ? "N" : item.leftnum) }</Label></h4>
							<Input onChange={(e)=> this.hideHandleChange(e,item.tid)} key={"inp_show_"+item.tid} type="checkbox" label="入选" defaultChecked={true}/>
						</Row>
					</center>
				</Thumbnail>
			</Col>
		)
	}

	render() {
		var fooddata = this.props.foodData;
		console.log("RoomModal", this.props.foodData);
		var v_fdlist = [];
		var rowNum = 4;
		var rowList = [];
		for (var i = 0; i < this.props.foodlist.length; i++) {
			var itemData = this.props.foodlist[i];
			if (itemData != null && itemData.onsell != 0 && itemData.saled_out == BD_TYPES.SELL_OUT_NO) {
				if (rowList.length == 0) {
					v_fdlist.push(<Row>{rowList}</Row>);
				}
				rowList.push(this.getItem(itemData));
				if (rowList.length >= rowNum) {
					rowList = [];
				}
			}
		}
		return (
			<Modal show={true} backdrop={false} dialogClassName="custom-modal" bsSize="lg" onHide={()=>this.props.delModal()}>
				<Modal.Header closeButton>
					<Modal.Title id="contained-modal-title-lg">{fooddata.name}</Modal.Title>
				</Modal.Header>
				<Modal.Body>
                    <Panel header="Complete" bsStyle="warning">

                    </Panel>
                    <Panel header="Complete" bsStyle="warning">
                        <OverlayTrigger id={itemdata.groupID} placement="top" overlay={<Popover title="Complete Member">{"5/10"}</Popover>}>
                            <ProgressBar bsStyle="success" now={itemdata.completeNum} key={1}/>
                        </OverlayTrigger>
                        <OverlayTrigger id={itemdata.groupID} placement="top" overlay={<Popover title="Left">{"3:30"}</Popover>}>
                            <ProgressBar bsStyle="warning" now={itemdata.totalNum} key={2}/>
                        </OverlayTrigger>
                        <Row key="1">
                            {v_fdlist}
                        </Row>
                    </Panel>
				</Modal.Body>

			</Modal>
		);
	}
}

function mapStateToProps(state) {
	return {
		createRoom: createRoom,
		uid: state.user.userSession.get("SID"),
		foodlist: state.user.foodData.takeout_menu,
		foodData: state.user.foodData
	}
}
/*name:店名,
 * id:店id,
 * logo:店图片,
 * phone:电话;
 * category:店家类型(),
 * address:地址,
 * worktime:{begin:,end:}
 * state:店当前营业状态 (1开店 ,2打样),
 * score:评分",
 * invoice:是否支持开发票(1支持,其他不支持),
 * coupon:是否支持在线付款(1支持,其他不支持),
 * takeout_menu:[
 *      {
 *          name:"菜名1",
 *          score:"评分",
 *          tid:"菜id",
 *          price:"价格",
 *          dish_attr:[{did:,price:,name:,},...],
 *          image:"图片",
 *          des:"描述",
 *          onsell:"0,1(是否在售,1:true,0:false)"
 *          leftnum:"" (剩余数量)
 *      },
 *      {
 *
 *      }
 *      ]
 * }*/
RoomModal.propTypes = {
	createRoom: PropTypes.func.isRequired,
	delModal: PropTypes.func.isRequired,
	uid: PropTypes.string.isRequired,
	foodlist: PropTypes.array.isRequired,
	foodData: PropTypes.shape({ // 是否符合指定格式的物件
		name: PropTypes.string.isRequired,
		logo: PropTypes.string.isRequired,
		phone: PropTypes.string.isRequired,
		category: PropTypes.string.isRequired,
		address: PropTypes.string.isRequired,
		worktime: PropTypes.object.isRequired,
		state: PropTypes.number.isRequired,

		invoice: PropTypes.number.isRequired,
		coupon: PropTypes.number.isRequired,
		id: PropTypes.string.isRequired,
		takeout_menu: PropTypes.array.isRequired
	})
};
export default connect(
	mapStateToProps, {
		createRoom,
		delModal
	}
)(RoomModal);