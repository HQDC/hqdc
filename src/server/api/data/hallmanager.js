/**
 * Created by Tile on 2015/9/11.
 */

import {
    userManager
}
from './index';

var room_hash;

function HallList() {
    room_hash = [];
}
import assert from 'assert';
/**
 * 查询一个房间
 * @param hallID
 * @returns {*}
 */
HallList.prototype.getRoomByID = function(roomID) {
    assert.ok(this.hasRoom(roomID), "can't find room ID=" + roomID)
    return room_hash[roomID];
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
    room_hash[roomData.RID] = roomData;
    return true;
};


HallList.prototype.enterRoom = function(RID, SID) {
    assert.ok(!this.hasRoom(RID), "enter null room RID:" + RID + " SID:" + SID);
    var userData = userManager.getUserByID(SID);
    room_hash[RID].playerList[SID] = userData;
    return true;
};

HallList.prototype.outRoom = function(RID, SID) {
    assert.ok(this.hasRoom(RID), "enter null room");
    room_hash[RID] = roomData;
    return true;
};

/**
 * 更新房间
 * @param roomData
 * @returns {boolean}
 */
HallList.prototype.updateRoom = function(roomData) {
    room_hash[roomID] = roomData;
    return true;
};

/**
 *
 * @param roomID
 * @param roomName
 * @param ip
 * @param socketID
 * @returns {boolean}
 * @constructor
 */
HallList.prototype.createRoom = function(roomID, roomName, masterID) {
    var roomData = {};
    roomData.RID = roomID;
    roomData.roomName = roomName;
    roomData.masterID = masterID;
    userManager.getUserFoodList(masterID, true)
    roomData.playerList = {};
    roomData.foodData = ;
    return roomData;
};

/**
 * 删除房间
 * @param deldata 可以是Uid  也可以是  roomdata
 */
HallList.prototype.delRoom = function(deldata) {
    if (deldata == null) {
        return false;
    }
    if (typeof(deldata) == "number") {
        delete room_hash[deldata];
        return true;
    }
    if (typeof(deldata) == "object") {
        if (deldata.SID != null) {
            if (this.hasHall(deldata.SID)) {
                delete room_hash[deldata.SID];
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
UserList.prototype.isPlayerInRoom = function(userID) {

};
/**
 * 是否有一个房间
 * @param roomID
 * @returns {boolean}
 */
HallList.prototype.hasRoom = function(roomID) {
    return room_hash[roomID] != null;
};
var hallManager = new HallList();
export default hallManager;