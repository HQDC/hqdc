/**
 * Created by Tile on 2015/9/30.
 */
import {
	MSG_TYPES
}
from 'common/Types';
import Immutable from 'immutable';
import expStore from '../../core/StoreWithExpiration';

function hallUpdate(state, action) {
	console.log("hallUpdate:", action);
	var done = action.data.data.filter(function(item) {
		return item.State == "done"
	});
	var ing = action.data.data.filter(function(item) {
		return item.State = "ing"
	});
	return {
		done: done,
		ing: ing,
		"lockfast": state.lockfast
	};
}

function createRoomSuccess(state, action) {
	console.log("success");
	return {
		done: [],
		ing: [],
		"lockfast": state.lockfast
	};
}
/**
 * [defaultCall hall receive msg from server or client]
 * @author Tile
 * @date   2016-11-17T22:47:28+0800
 * @param  {Object}                 state  [description]
 * @param  {[type]}                 action [description]
 * @return {[type]}                        [description]
 */
var defaultCall = function(state = {
	done: [],
	ing: [],
	lockfast: expStore.get('lockfast') //{rID:psw,... ,expiredTime:xxx}
}, action) {
	switch (action.type) {
		case MSG_TYPES.STC_S_HALL_ROOM_UPDATE:
			return hallUpdate(state, action);
			/*case MSG_TYPES.STC_W_CREATE_ROOM_SUCCESS:
			    return createRoomSuccess(state, action);*/
		default:
			return state;
	}
};
export default defaultCall