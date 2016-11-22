/**
 * Created by Tile on 2015/12/20.
 */

import {
    MSG_TYPES
}
from "../../common/Types";
import {
    sendMSG,
    sendMSGToALL
}
from "../core/io/Sender";
import {
    hallManager,
    userManager
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
    sendMSGToALL(MSG_TYPES.STC_S_SYN_ROOMITEM, hallManager.getSyncRoomItem(roomData.RID));
    console.log("show Complete");
    return {
        needStopNext: false
    };
}
/**
 * foodlist
 */
function enterRoom(roomData, res) {
    console.log("enterRoom ", roomData);
    hallManager.enterRoom(roomData.roomID, roomData.UID);
    console.log("enterRoom ", roomData);
    sendMSGToALL(MSG_TYPES.STC_S_SYN_ROOMITEM, hallManager.getSyncRoomItem(roomData.roomID));
    console.log("enterRoom Complete");
    return {
        needStopNext: false
    };
}
/**
 * foodlist
 */
function synRooms(roomData, res) {
    console.log("synRooms ", roomData);
    hallManager.enterRoom(roomData.roomID, roomData.UID);
    sendMSGToALL(MSG_TYPES.STC_S_SYN_ROOMS, hallManager.getSyncRoomList());
    console.log("synRooms Complete");
    return {
        needStopNext: false
    };
}
/**
 * foodlist
 */
function quitRoom(roomData, res) {
    console.log("quitRoom ", roomData);
    hallManager.quitRoom(roomData.roomID, roomData.UID);
    sendMSGToALL(MSG_TYPES.STC_S_SYN_ROOMITEM, hallManager.getSyncRoomItem(roomData.roomID));
    console.log("quitRoom Complete");
    return {
        needStopNext: false
    };
}
/**
 * synRoomItem
 */
function getSyncRoomItem(roomData, res) {
    console.log("getSyncRoomItem ", roomData);
    sendMSGToALL(MSG_TYPES.STC_S_SYN_ROOMITEM, hallManager.getSyncRoomItem(roomData.roomID));
    console.log("getSyncRoomItem Complete");
    return {
        needStopNext: false
    };
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
        case MSG_TYPES.CTS_S_SYN_ROOMITEM:
            return getSyncRoomItem(data, res);
        case MSG_TYPES.CTS_W_CREATE_ROOM:
            return createRoom(data, res);
        case MSG_TYPES.CTS_S_ENTER_ROOM:
            return enterRoom(data, res);
        case MSG_TYPES.CTS_S_QUIT_ROOM:
            return quitRoom(data, res);
        case MSG_TYPES.CTS_S_SYN_ROOMS:
            return synRooms(data, res);
        default:
            return {
                needStopNext: false
            };
    }
}
export default MsgHandler;