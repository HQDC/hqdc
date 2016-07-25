/**
 * Created by Tile on 2015/9/11.
 */
var hall_hash;

function HallList() {
    hall_hash = [];
}
/**
 * 查询一个房间
 * @param hallID
 * @returns {*}
 */
HallList.prototype.getHallByID = function(hallID) {
    if (this.hasHall(hallID)) {
        console.log("can't find hall ID=" + hallID);
        return null;
    }
    return hall_hash[hallID];
};
/**
 * 添加房间
 * @param hallData
 * @returns {boolean}
 */
HallList.prototype.addHall = function(hallData) {
    if (this.hasHall(hallData.uid)) {
        return false;
    }
    hall_hash[hallData.uid] = hallData;
    return true;
};
/**
 * 更新房间
 * @param hallData
 * @returns {boolean}
 */
HallList.prototype.updateHall = function(hallData) {
    hall_hash[hallID] = hallData;
    return true;
};

/**
 *
 * @param hallID
 * @param hallName
 * @param ip
 * @param socketID
 * @returns {boolean}
 * @constructor
 */
HallList.prototype.CreateHall = function(hallID, hallName, masterID) {
    var hall = {};
    hall.uid = hallID;
    hall.name = hallName;
    hall.ip = ip;
    hall.socketid = socketID;
    return hall;
};

/**
 * 删除房间
 * @param deldata 可以是Uid  也可以是  halldata
 */
HallList.prototype.delHall = function(deldata) {
    if (deldata == null) {
        return false;
    }
    if (typeof(deldata) == "number") {
        delete hall_hash[deldata];
        return true;
    }
    if (typeof(deldata) == "object") {
        if (deldata.uid != null) {
            if (this.hasHall(deldata.uid)) {
                delete hall_hash[deldata.uid];
                return true;
            }
        }
    }
    return false;
};
/**
 * 是否有一个房间
 * @param hallID
 * @returns {boolean}
 */
HallList.prototype.hasHall = function(hallID) {
    return hall_hash[hallID] != null;
};
var hallManager = new HallList()
export default hallManager;