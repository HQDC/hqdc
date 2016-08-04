/**
 * Created by Tile on 2015/9/11.
 */

import {
    userManager
}
from './index';

import _ from 'lodash';
import {mAssert} from '../../../common/utils/index';
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
    return true;
};

HallList.prototype.outRoom = function(RID, SID) {
     mAssert(this.hasRoom(RID), "enter null room");
    this.room_hash[RID] = roomData;
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
    roomData.EndTime = cData.EndTime;
    roomData.MaxCost = cData.MaxCost;
    roomData.GroupName = cData.GroupName;
    roomData.State = "ing";
    roomData.EndTime = cData.EndTime;
    roomData.maxPNum = 999;
    roomData.boxPrice = 1;
    roomData.playerList = {};
    roomData.hideList = cData.hidelist;
    roomData.foodData = userManager.getUserFoodData(cData.SID, true);
    return roomData;
};

HallList.prototype.getHallSoleID = function() {
    var MAX_NUM = 999999;
    var id = _.random(1,MAX_NUM);
    while (this.hasRoom(id)){
        id = _.random(1,MAX_NUM);
    }
    return id;
};
HallList.prototype.getSyncRooms = function() {
    console.log("getSyncRooms1");
    var returnList = [];
    _.forIn(this.room_hash,function(item){
        var roomData = _.pick(item,["RID","EndTime","MaxCost","State","GroupName"]);
        roomData.playerNum = item.playerList.length | 1;
        roomData.hasPSW = item.PSW.length > 0;
        roomData.foodData = _.pick(item.foodData,["name","logo","address","phone"]);
        returnList.push(roomData);
    });
    console.log("getSyncRooms2",returnList);
    return returnList;
};
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