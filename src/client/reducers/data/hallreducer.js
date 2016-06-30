/**
 * Created by Tile on 2015/9/30.
 */
import {
	MSG_TYPES
}
from 'common/Types';
import Immutable from 'immutable';

function hallUpdate(state, action) {
	var done = state.list.filter(function(item) {
		return item.state = 2
	});
	var ing = state.list.filter(function(item) {
		return item.state = 1
	});
	return {
		done: done,
		ing: ing
	};
}
/**
 * 接受action 后的 逻辑
 * @param state
 * @param action
 * @returns {{}}
 */
var defaultCall = function(state = {
	done : Immutable.Map(),
	ing :  Immutable.Map()
}, action) {
	switch (action.type) {
		case MSG_TYPES.STC_S_HALL_ROOM_UPDATE:
			return hallUpdate(state, action);
		default:
			return state;
	}
};
export default defaultCall