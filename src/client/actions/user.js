/**
 * Created by Tile on 2015/9/30.
 */
import {WEBTYPES} from '../../common/CTSTypes';
import sendMSG from  '../core/io/Sender';
/**
 *
 * @returns {Function}
 */
export function userLogout() {
	return sendMSG(WEBTYPES.CTS_W_LOGOUT)
}

/**
 * @returns {Function}
 */
export function userLogin(loginName) {
	console.log("logout");
   return sendMSG(WEBTYPES.CTS_W_LOGIN,{name: loginName});
}

/**
 * @returns {Function}
 */
export function userTestSession() {
	return (dispatch, getState) => {
		httpClient.post('getsession', null, data=> {
			console.log("test session return:", data);
			if (data.ret == 1) {
				dispatch({type: UserActionTypes.USER_TEST_SESSION, data});
			} else {
				dispatch({type: UserActionTypes.USER_TEST_SESSION, error: {eType: 1, msg: "session null"}});
			}
		}, err=> {
			dispatch({type: UserActionTypes.USER_TEST_SESSION, ...{eType: 2, msg: "net error"}});
		});
	}
}
/**
 *
 * @param data
 * @returns {Function}
 */
export function createRoom(data) {
	return (dispatch, getState) => {
		httpClient.post('createroom', null, data=> {
			console.log("createRoom:", data.data.retdata);
			if (data.ret == 1) {
				dispatch({
					type: UserActionTypes.USER_TEST_SESSION,
					fddata: data.data.retdata,
					isCroomOpen: false,
					isFDListShow: true
				});
			} else {
				dispatch({type: UserActionTypes.USER_TEST_SESSION, error: {eType: 1, msg: "create error"}});
			}
		}, err=> {
			dispatch({type: UserActionTypes.USER_TEST_SESSION, ...{eType: 2, msg: "net error"}});
		});
	}
}