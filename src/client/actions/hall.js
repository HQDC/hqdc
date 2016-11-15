/**
 * Created by Tile on 2015/11/27.
 */
import ModalTypes from '../constants/ModalTypes';
import sendMSG from '../core/io/Sender';
import {
	MSG_TYPES
}
from '../../common/Types';
/**
 * create Room 
 * @param  {psw,roomName,endTime..} data  createRoom Info
 * @return {[type]}      [description]
 */
export function createRoom(data) {
	return sendMSG(MSG_TYPES.CTS_W_CREATE_ROOM, data);
}

export function enterRoom(roomID) {
	console.log("action roomID", roomID);
	return sendMSG(MSG_TYPES.CTS_S_ENTER_ROOM, {
		roomID: roomID
	});
}

export function quitRoom(roomID) {
	console.log("quitRoom roomID", roomID);
	return sendMSG(MSG_TYPES.CTS_S_QUIT_ROOM, {
		roomID: roomID
	});
}

export function synItemRoom(roomID) {
	console.log("synItemRoom roomID", roomID);
	return sendMSG(MSG_TYPES.CTS_S_SYN_ROOMITEM, {
		roomID: roomID
	});
}

export function synRoomList() {
	console.log("synItemRoom roomID", roomID);
	return sendMSG(MSG_TYPES.CTS_S_SYN_ROOMS, {});
}