/**
 * Created by Tile on 2015/9/30.
 */
import {
	MSG_TYPES
}
from 'common/Types';
import Immutable from 'immutable';
import expStore from '../../core/StoreWithExpiration';

function hallUpdate(i_state, action) {
	console.log("hallUpdate:", action);
	var done = action.data.data.filter(function(item) {
		return item.State == "done"
	});
	var ing = action.data.data.filter(function(item) {
		return item.State = "ing"
	});
	return i_state
		.set("done", Immutable.fromJS(done))
		.set("ing", Immutable.fromJS(ing))
}

function hallItemUpdate(i_state, action) {
	var roomItem = action.data.data;
	item.State == "ing"
	return i_state;
}


/**
 * [defaultCall hall receive msg from server or client]
 * @author Tile
 * @date   2016-11-17T22:47:28+0800
 * @param  {Object}                 state  [description]
 * @param  {[type]}                 action [description]
 * @return {[type]}                        [description]
 */
var defaultCall = function(i_state = Immutable.Map({
	done: [],
	ing: [],
	lockfast: expStore.get('lockfast') //{rID:psw,... ,expiredTime:xxx}
}), action) {
	console.log("test done:", i_state.get("done"));
	switch (action.type) {
		case MSG_TYPES.STC_S_HALL_ROOM_UPDATE:
			return hallUpdate(i_state, action);
		case MSG_TYPES.STC_S_SYN_ROOMS:
			return hallItemUpdate(i_state, action);
		default:
			return i_state;
	}
};
export default defaultCall