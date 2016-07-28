/**
 * Created by Tile on 2015/9/11.
 */
import jwt from 'jsonwebtoken';

function UserList() {
    this.user_hash = {};
    this.temp_foodinfo = {}
}
/**
 * 查询一个用户
 * @param userID
 * @returns {*}
 */
UserList.prototype.getUserByID = function(userID) {
    if (!this.hasUser(userID)) {
        console.log("can't find user ID=" + userID);
        return null;
    }
    return this.user_hash[userID];
};


UserList.prototype.getUserByName = function(name) {
    return this.getUserByID(this.sign(name));
};

UserList.prototype.setUserFoodList = function(SID, foodinfo) {
    this.temp_foodinfo[SID] = foodinfo;
};

UserList.prototype.getUserFoodList = function(SID) {
    return this.temp_foodinfo[SID];
};

/**
 * 添加用户
 * @param userData
 * @returns {boolean}
 */
UserList.prototype.addUser = function(userData) {
    if (this.hasUser(userData.SID)) {
        console.log("user is alive " + userData)
    }
    this.user_hash[userData.SID] = userData;
};
/**
 * 更新用户
 * @param userData
 * @returns {boolean}
 */
UserList.prototype.updateUser = function(userData) {
    this.user_hash[userID] = userData;
    return true;
};

UserList.prototype.sign = function(userName) {
    return jwt.sign(userName, "hqfy");
};

UserList.prototype.unSign = function(unUserName) {
    return jwt.verify(unUserName, "hqfy");
};

/**
 *
 * @param userID
 * @param userName
 * @param ip
 * @param socketID
 * @returns {boolean}
 * @constructor
 */
UserList.prototype.createUser = function(userID, userName, ip, socketID) {
    var user = {};
    user.SID = userID;
    user.name = userName;
    user.ip = ip;
    user.socketid = socketID;
    return user;
};

/**
 * 删除用户
 * @param deldata 可以是Uid  也可以是  userdata
 */
UserList.prototype.delUser = function(deldata) {
    if (deldata == null) {
        return false;
    }
    if (typeof(deldata) == "number") {
        delete this.user_hash[deldata];
        return true;
    }
    if (typeof(deldata) == "object") {
        if (deldata.SID != null) {
            if (this.hasUser(deldata.SID)) {
                delete this.user_hash[deldata.SID];
                return true;
            }
        }
    }
    return false;
};
/**
 * 是否有一个用户
 * @param userID
 * @returns {boolean}
 */
UserList.prototype.hasUser = function(userID) {
    return this.user_hash[userID] != null;
};
var userManager = new UserList();
export default userManager;