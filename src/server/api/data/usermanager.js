/**
 * Created by Tile on 2015/9/11.
 */
import jwt from 'jsonwebtoken';

import {
    hallManager
}
from './index';
import {mAssert} from '../../../common/utils/index';

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
    mAssert(this.hasUser(userID), "can't find user ID=" + userID);
    return this.user_hash[userID];
};


UserList.prototype.getUserByName = function(name) {
    return this.getUserByID(this.sign(name));
};

UserList.prototype.setUserFoodData = function(SID, foodInfo) {
    this.temp_foodinfo[SID] = foodInfo;
};

UserList.prototype.getUserFoodData = function(SID, clean) {

    mAssert(this.hasUserFoodData(SID), "error foodlist is null");
    var foodInfo = this.temp_foodinfo[SID];
    var needClean = clean == null ? false : clean;
    if (needClean) {

        delete this.temp_foodinfo[SID];
    }
    return foodInfo;
};
UserList.prototype.hasUserFoodData = function(SID) {
    return this.temp_foodinfo[SID] != null;
};
/**
 * 添加用户
 * @param userData
 * @returns {boolean}
 */
UserList.prototype.addUser = function(userData) {
    // mAssert(!this.hasUser(userData.SID), "user is alive " + userData);
    mAssert(!this.hasUser(userData.SID), "user is alive " + userData);
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
    user.RID = "none";
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

/**
 * 这个in room 只判断 用户 RID 是否为 空
 * @param userID
 * @returns {boolean}
 */
UserList.prototype.isInRoom = function(userID) {
    var userData = this.getUserByID(userID)
    return userData.RID != "none";
};

var userManager = new UserList();
export default userManager;