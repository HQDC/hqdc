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
 * send create room date to server
 * @author Tile
 * @date   2016-11-16T23:29:56+0800
 * @param  {Object}                 data {UID:xx,...}
 * @return {[type]}                      [description]
 */
export function createRoom(data) {
	return sendMSG(MSG_TYPES.CTS_W_CREATE_ROOM, data);
}
/**
 * send user enter room hander to server
 * @author Tile
 * @date   2016-11-16T23:32:14+0800
 * @param  {[type]}                 roomID [description]
 * @return {[type]}                        [description]
 */
export function enterRoom(roomID) {
	console.log("action roomID", roomID);
	return sendMSG(MSG_TYPES.CTS_S_ENTER_ROOM, {
		roomID: roomID
	});
}
/**
 * send quit room msg to server
 * @author Tile
 * @date   2016-11-16T23:33:04+0800
 * @param  {string}                 roomID 
 * @return {function}               callback middle fun
 */
export function quitRoom(roomID) {
	console.log("quitRoom roomID", roomID);
	return sendMSG(MSG_TYPES.CTS_S_QUIT_ROOM, {
		roomID: roomID
	});
}
/**
 * request to server and synchronized the room which send
 * @author Tile
 * @date   2016-11-16T23:34:20+0800
 * @param  {[type]}                 roomID [description]
 * @return {[type]}                        [description]
 */
export function synItemRoom(roomID) {
	console.log("synItemRoom roomID", roomID);
	return sendMSG(MSG_TYPES.CTS_S_SYN_ROOMITEM, {
		roomID: roomID
	});
}
/**
 * synchronized all roomlist from server
 * @author Tile
 * @date   2016-11-16T23:36:05+0800
 * @return {
 	[type]
 }[description]
 */
export function synRoomList() {
	console.log("synItemRoom roomID", roomID);
	return sendMSG(MSG_TYPES.CTS_S_SYN_ROOMS, {});
}