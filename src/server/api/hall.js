/**
 * Created by Tile on 2015/12/20.
 */

import {
    MSG_TYPES
}
from "../../common/Types";
import {
    sendMSG,
    socketProxy
}
from "../core/io/Sender";
import {
    hallManager, userManager
}
from './data';

/**
 * foodlist
 */
function createRoom(cData, res) {
    console.log("createRoom", cData);
    var roomData = hallManager.createRoom(cData);
    //console.log("roomData.hideList:", roomData);
    hallManager.addRoom(roomData);
    sendMSG(res, MSG_TYPES.STC_W_CREATE_ROOM_SUCCESS);
    socketProxy.sendMSGToALL( MSG_TYPES.STC_S_HALL_ROOM_UPDATE,hallManager.getSyncRooms());
    console.log("show Complete")
}

/**
 *
 * @param type          消息头
 * @param data          消息体
 * @param res           消息源  可能是webRes  或者socket
 * @returns {{needStopNext: boolean}}    返回 needStopNext 如果是true 那么 后续的 响应函数将不会调用
 * @constructor
 */
function MsgHandler(type, data, res) {
    console.log("hallHandler:", type, data);
    switch (type) {
        case MSG_TYPES.CTS_W_CREATE_ROOM:
            return createRoom(data, res);
        default:
            return {
                needStopNext: false
            };
    }
}
export default MsgHandler;