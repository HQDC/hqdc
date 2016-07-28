/**
 * Created by Tile on 2015/9/11.
 */
var room_hash;

function HallList() {
    room_hash = [];
}
/**
 * 查询一个房间
 * @param hallID
 * @returns {*}
 */
HallList.prototype.getRoomByID = function(roomID) {
    if (this.hasRoom(roomID)) {
        console.log("can't find room ID=" + roomID);
        return null;
    }
    return room_hash[roomID];
};
/**
 * 添加房间
 * @param roomData
 * @returns {boolean}
 */
HallList.prototype.addRoom = function(roomData) {
    if (this.hasRoom(roomData.SID)) {
        return false;
    }
    room_hash[roomData.SID] = roomData;
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
HallList.prototype.CreateRoom = function(roomID, roomName, masterID) {
    var roomData = {};
    roomData.roomID = roomID;
    roomData.roomName = roomName;
    roomData.masterID = masterID;
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
 * 是否有一个房间
 * @param roomID
 * @returns {boolean}
 */
HallList.prototype.hasRoom = function(roomID) {
    return room_hash[roomID] != null;
};
var hallManager = new HallList();
export default hallManager;