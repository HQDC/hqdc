/**
 * Created by Tile on 2015/9/11.
 */
var user_hash;

function UserList() {
    user_hash = [];
}
/**
 * 查询一个用户
 * @param userID
 * @returns {*}
 */
UserList.prototype.getUserByID = function(userID) {
    if (this.hasUser(userID)) {
        console.log("can't find user ID=" + userID);
        return null;
    }
    return user_hash[userID];
};
/**
 * 添加用户
 * @param userData
 * @returns {boolean}
 */
UserList.prototype.addUser = function(userData) {
    if (this.hasUser(userData.uid)) {
        return false;
    }
    user_hash[userData.uid] = userData;
    return true;
};
/**
 * 更新用户
 * @param userData
 * @returns {boolean}
 */
UserList.prototype.updateUser = function(userData) {
    user_hash[userID] = userData;
    return true;
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
UserList.prototype.CreateUser = function(userID, userName, ip, socketID) {
    var user = {};
    user.uid = userID;
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
        delete user_hash[deldata];
        return true;
    }
    if (typeof(deldata) == "object") {
        if (deldata.uid != null) {
            if (this.hasUser(deldata.uid)) {
                delete user_hash[deldata.uid];
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
    return user_hash[userID] != null;
};
var userManager = new UserList()
export default userManager;