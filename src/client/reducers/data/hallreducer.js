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
		return item.state == "done"
	});
	var ing = action.data.data.filter(function(item) {
		return item.state == "ing"
	});
	return i_state
		.set("done", Immutable.fromJS(done))
		.set("ing", Immutable.fromJS(ing))
}

function hallItemUpdate(i_state, action) {
	var roomItem = Immutable.fromJS(action.data.data);
	var newState = i_state;
	console.log("hallItemUpdate ", action);
	switch (roomItem.get("synType")) {
		case MSG_TYPES.ROOM_UPDATE_TYPE_ADD:
			{
				console.log("hallItemUpdate 1", action);
				newState = i_state.updateIn(roomItem.get("state")),
				(itemList) => {
					console.log("hallItemUpdate 1.5", newState);
					return itemList.push(roomItem)
				};
				console.log("hallItemUpdate 2", newState);
				break;
			}
		case MSG_TYPES.ROOM_UPDATE_TYPE_DELETE:
			{
				newState = i_state.updateIn(roomItem.get("state")),
				(itemList) => {
					var itemIndex;
					itemList.forEach((value, numer, iter) => {
						if (value.get("RID") == roomItem.get("RID")) {
							itemIndex = numer;
							return false;
						};
					});
					return itemList.delete(itemIndex)
				};
				break;
			}
		case MSG_TYPES.ROOM_UPDATE_TYPE_UPDATE:
			{
				newState = i_state.updateIn(roomItem.get("state")),
				(itemList) => {
					itemList.forEach((value, numer, iter) => {
						if (value.get("RID") == roomItem.get("RID")) {
							itemIndex = numer;
							return false;
						};
					});
					return itemList.update(itemIndex, roomItem)
				};
				break;
			}

	}

	return newState;
}


/**
 * [defaultCall hall receive msg from server or client]
 * @author Tile
 * @date   2016-11-17T22:47:28+0800
 * @param  {Object}                 state  [description]
 * @param  {[type]}                 action [description]
 * @return {[type]}                        [description]
 */
var defaultCall = function(i_state = Immutable.fromJS({
	done: [],
	ing: [],
	lockfast: expStore.get('lockfast') //{rID:psw,... ,expiredTime:xxx}
}), action) {
	console.log("test done:", i_state.get("done"));
	switch (action.type) {
		case MSG_TYPES.STC_S_SYN_ROOMITEM:
			return hallItemUpdate(i_state, action);
		case MSG_TYPES.STC_S_SYN_ROOMS:
			return hallUpdate(i_state, action);
		default:
			return i_state;
	}
};
export default defaultCall