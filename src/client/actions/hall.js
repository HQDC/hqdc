/**
 * Created by Tile on 2015/11/27.
 */
import ModalTypes from '../constants/ModalTypes';
import sendMSG from '../core/io/Sender';
import {
	MSG_TYPES
}
from '../../common/Types';
export function createRoom(uid) {
	return sendMSG(MSG_TYPES.CTS_W_CREATE_ROOM, {
		"uid": uid
	});
}