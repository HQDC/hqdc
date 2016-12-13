/**
 * Created by Tile on 2015/9/11.
 */

import {
    userManager
}
from './index';

import _ from 'lodash';
import {
    MSG_TYPES
}
from "../../../common/Types";
import {
    mAssert
} from '../../../common/utils/index';

function HallList() {
    this.room_hash = {};
}
/**
 * 查询一个房间
 * @param roomID
 * @returns {*}
 */
HallList.prototype.getRoomByID = function(roomID) {
    mAssert(this.hasRoom(roomID), "can't find room ID=" + roomID);
    return this.room_hash[roomID];
};
/**
 * 添加房间
 * @param roomData
 * @returns {boolean}
 */
HallList.prototype.addRoom = function(roomData) {
    if (this.hasRoom(roomData.RID)) {
        return false;
    }
    this.room_hash[roomData.RID] = roomData;
    return true;
};


HallList.prototype.enterRoom = function(RID, SID) {
    mAssert(!this.hasRoom(RID), "enter null room RID:" + RID + " SID:" + SID);
    this.room_hash[RID].playerList[SID] = userManager.getUserByID(SID);
    roomData.playerNum = Math.max(roomData.playerNum + 1, 0);
    return true;
};

HallList.prototype.quitRoom = function(RID, SID) {
    mAssert(this.hasRoom(RID), "enter null room");
    this.room_hash[RID] = roomData;
    roomData.playerNum = Math.max(roomData.playerNum - 1, 0);
    return true;
};

/**
 * 更新房间
 * @param roomData
 * @returns {boolean}
 */
HallList.prototype.updateRoom = function(roomData) {
    this.room_hash[roomID] = roomData;
    return true;
};

/**
 *
 * @param cData
 * @returns {boolean}
 * @constructor
 */
HallList.prototype.createRoom = function(cData) {
    var roomData = {};
    roomData.RID = this.getHallSoleID();
    roomData.masterID = cData.SID;
    roomData.PSW = cData.PSW;
    roomData.endTime = cData.EndTime;
    roomData.maxCost = cData.MaxCost;
    roomData.groupName = cData.GroupName;
    roomData.state = "ing";
    roomData.maxPNum = 999;
    roomData.boxPrice = 1;
    roomData.playerList = {};
    roomData.playerNum = 0;
    roomData.hideList = cData.hidelist;
    roomData.foodData = userManager.getUserFoodData(cData.SID, true);
    console.log("RID ->", roomData.RID);
    return roomData;
};

HallList.prototype.getHallSoleID = function() {
    var MAX_NUM = 99999999;
    var id = _.random(1, MAX_NUM);
    while (this.hasRoom(id)) {
        id = _.random(1, MAX_NUM);
    }
    return id;
};
/**
 * 获取用于同步客户端的房间列表
 * @return {Array} 同步的房间列表
 */
HallList.prototype.getSyncRoomList = function() {
    console.log("getSyncRooms1");
    var returnList = [];
    _.forIn(this.room_hash, (roomItem) => {
        var synRoomItem = this.getSyncRoomItem(MSG_TYPES.ROOM_UPDATE_TYPE_ADD, roomItem.RID);
        returnList.push(synRoomItem);
    });
    console.log("getSyncRooms2", returnList);
    return returnList;
};
/**
 * get synchronized RoomItem
 * @param  {roomData.RID} roomID [description]
 * @synType add update or delete
 * @return {[type]}        [description]
 */
HallList.prototype.getSyncRoomItem = function(synType, roomID) {
    console.log("getRoomByID 1");
    var roomItem = this.getRoomByID(roomID);
    console.log("getRoomByID 2");
    var synRoomItem;
    if (synType == "add") {
        synRoomItem = _.pick(roomItem, ["RID", "endTime", "maxCost", "state", "groupName"]);
        synRoomItem.playerNum = roomItem.playerList.length;
        synRoomItem.hasPSW = roomItem.PSW.length > 0;
        synRoomItem.foodData = _.pick(roomItem.foodData, ["name", "logo", "address", "phone"]);
    } else if (synType == "delete") {
        synRoomItem = {};
        synRoomItem.RID = roomID;
    } else {
        synRoomItem = _.pick(roomItem, ["RID", "endTime", "maxCost", "state", "groupName"]);
        synRoomItem.playerNum = roomItem.playerList.length;
        synRoomItem.hasPSW = roomItem.PSW.length > 0;
        synRoomItem.foodData = _.pick(roomItem.foodData, ["name", "logo", "address", "phone"]);
    }
    synRoomItem.synType = synType;
    return synRoomItem;
}

/**
 * 删除房间
 *
 */
HallList.prototype.delRoom = function(delData) {
    if (delData == null) {
        return false;
    }
    if (typeof(delData) == "number") {
        delete this.room_hash[delData];
        return true;
    }
    if (typeof(delData) == "object") {
        if (delData.SID != null) {
            if (this.hasHall(delData.SID)) {
                delete this.room_hash[delData.SID];
                return true;
            }
        }
    }
    return false;
};
/**
 * 这个in room 循环所有房间列表查询玩家
 * @param userID
 * @returns {boolean}
 */
HallList.prototype.isPlayerInRoom = function(userID) {

};
/**
 * 是否有一个房间
 * @param roomID
 * @returns {boolean}
 */
HallList.prototype.hasRoom = function(roomID) {
    return this.room_hash[roomID] != null;
};
var hallManager = new HallList();
export default hallManager;