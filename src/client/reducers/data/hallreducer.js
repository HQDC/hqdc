/**
 * Created by Tile on 2015/9/30.
 */
import UserActionTypes from '../constants/UserActionTypes';
import ServerSocketToClientTypes from '../constants/ServerSocketToClientTypes';
import "isomorphic-fetch";
import _ from 'lodash';
import httpClient from '../core/HttpClient'
import socketClient from '../core/SocketClient';

/**
 *
 * @param state
 * @param action
 */
function userLogin(state, action) {
	ajaxutil.axs(pathutil.getDataPath('login'), {
		name: encodeURI(loginName)
	}, async (data)=> {
		console.log("ajax success:", data);
		if (data.ret == 1) {
			this.userSelf.session = data.data;
		}
		this.emitChange(ViewUpdateTypes.USER_UPDATE, data);
	});
};
/**
 * 接受action 后的 逻辑
 * @param state
 * @param action
 * @returns {{}}
 */
var defaultCall = function (state = {}, action) {
	switch (action.type) {
		case UserActionTypes.USER_LOGIN:
			return userLogin(state, action);
		default:
			return state;
	}
};

export default defaultCall
