/**
 * Created by Tile on 2015/9/30.
 */
import {
	MSG_TYPES
}
from '../../common/Types';
import sendMSG from '../core/io/Sender';
/**
 *
 * @returns {Function}
 */
export function userLogout() {
	return sendMSG(MSG_TYPES.CTS_W_LOGOUT)
}

/**
 * @returns {Function}
 */
export function userLogin(loginName) {
	return sendMSG(MSG_TYPES.CTS_W_LOGIN, {
		name: loginName
	});
}

/**
 * @returns {Function}
 */
export function userTestSession(SID) {
	return sendMSG(MSG_TYPES.CTS_W_SESSION, {
		"SID": SID
	});
}
/**
 *
 * @param data
 * @returns {Function}
 */
export function createRoom(data) {
	return (dispatch, getState) => {
		httpClient.post('createroom', null, data => {
			console.log("createRoom:", data.data.retdata);
			if (data.ret == 1) {
				dispatch({
					type: UserActionTypes.USER_TEST_SESSION,
					fddata: data.data.retdata,
					isCroomOpen: false,
					isFDListShow: true
				});
			} else {
				dispatch({
					type: UserActionTypes.USER_TEST_SESSION,
					error: {
						eType: 1,
						msg: "create error"
					}
				});
			}
		}, err => {
			dispatch({
				type: UserActionTypes.USER_TEST_SESSION,
				... {
					eType: 2,
					msg: "net error"
				}
			});
		});
	}
}