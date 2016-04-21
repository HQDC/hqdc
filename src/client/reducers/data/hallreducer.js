/**
 * Created by Tile on 2015/9/30.
 */
import {MSG_TYPES} from 'common/Types';
import Immutable from 'immutable';

function hallUpdate(state, action) {
	console.log(action);
	console.log("testState userLoginRet:",state.userSession,action);
	return {userSession:state.hallList.merge(Immutable.fromJS(action.data))};
}
/**
 * 接受action 后的 逻辑
 * @param state
 * @param action
 * @returns {{}}
 */
var defaultCall = function (state = {hallList:Immutable.Map()}, action) {
	switch (action.type) {
		case MSG_TYPES.STC_S_HALL_ROOM_UPDATE:
			return hallUpdate(state, action);
		default:
			return state;
	}
};
export default defaultCall
