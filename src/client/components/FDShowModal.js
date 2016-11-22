/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */
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
class FDShowModal extends Component {
	constructor() {
		super();
		this.submitHandler = this.submitHandler.bind(this);
		this.timeSelectHandler = this.timeSelectHandler.bind(this);
	}

	timeSelectHandler(e) {
		this.endTime = e.target.value;
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
		if (this.props.isLoading) {
			return;
		}
		this.props.setLoadingState();
		console.log("input End Time ", this.endTime);
		this.props.createRoom({
			"hidelist": this.hidelist,
			"PSW": this.refs.PSW.getValue(),
			"EndTime": (this.endTime == null ? this.props.DEFAULT_TIME : this.endTime),
			"MaxCost": this.refs.MaxCost.getValue(),
			"GroupName": this.refs.GroupName.getValue()
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
			<Col key={item.tid} xs={4}>
                <Media >
                    <Media.Left align="middle">
                        <img key={"thumb_"+item.tid} width={100} height={100} src={item.image} alt="无图"/>
                    </Media.Left>
                    <Media.Body>
                        <h4 align="center"><Label key={"lab_name_"+item.tid} bsStyle="info" align="center">{item.name}</Label></h4>
                        <Label key={"lab_price_"+item.tid} bsStyle="warning">{item.price + "元"}</Label>
                        <Label key={"lab_leftnum_"+item.tid} bsStyle={left_state}>{"剩余:" + (item.leftnum > 999 ? "N" : item.leftnum) }</Label>
                        <Input onChange={(e)=> this.hideHandleChange(e,item.tid)} key={"inp_show_"+item.tid} type="checkbox" label="入选" defaultChecked={true}/>
                    </Media.Body>
                </Media>
                <p></p>
			</Col>
		)
	}

	render() {
		var fooddata = this.props.foodData;
		console.log("RoomModal", this.props.foodData);
		var v_fdlist = [];
		var rowNum = 3;
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
		var timeOptions = [];
		for (var j = 0; j < this.props.DEFAULT_TIMES.length; j++) {
			var itemValue = this.props.DEFAULT_TIMES[j];
			timeOptions.push(<option value={itemValue}>{itemValue}</option>);
		}
		return (
			<Modal show={true} backdrop={false} dialogClassName="custom-modal" bsSize="lg" onHide={()=>this.props.delModal()}>
				<Modal.Header closeButton>
					<Modal.Title id="contained-modal-title-lg">{fooddata.name}</Modal.Title>
				</Modal.Header>
				<Modal.Body>
                    <Input type="text" label="GroupName" ref="GroupName" />
                    <Input type="text" label="PSW" ref="PSW"/>
                    <Input type="text" label="MaxCost" ref="MaxCost"/>
                    <Input type="radio" name="inlineRadioOptions" label="Radio1" value="option1"/>
                    <Input type="radio" name="inlineRadioOptions" label="Radio2" value="option2"/>
                    <Input type="select" label="EndTime" defaultValue={this.props.DEFAULT_TIME} onChange={this.timeSelectHandler} placeholder="select">
                        {timeOptions}
                    </Input>
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
		createRoom: createRoom,
		setLoadingState: setLoadingState,
		uid: state.user.get("SID"),
		foodData: state.user.get("foodData"),
		foodlist: state.user.get("foodData").takeout_menu,
		isLoading: state.sys.get("sysStateInfo_isLoading"),
		DEFAULT_TIMES: [
			"15:50",
			"16:00",
			"16:10",
			"16:20",
			"16:30",
			"16:40",
			"16:50",
			"17:00",
			"17:10",
			"17:20",
			"17:30",
			"17:40",
			"17:50",
			"18:00",
			"18:10"
		],
		DEFAULT_TIME: "16:30"
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
FDShowModal.propTypes = {
	createRoom: PropTypes.func.isRequired,
	delModal: PropTypes.func.isRequired,
	uid: PropTypes.string.isRequired,
	setLoadingState: PropTypes.func.isRequired,
	foodlist: ImmutablePropTypes.list.isRequired,
	isLoading: PropTypes.bool.isRequired,
	DEFAULT_TIMES: PropTypes.array.isRequired,
	DEFAULT_TIME: PropTypes.string.isRequired,
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
		delModal,
		setLoadingState
	}
)(FDShowModal);