/**
 * Created by Tile on 2015/12/1.
 */
import ALERT_TYPES from '../../constants/AlertTypes';
import Immutable from 'immutable';
import {MSG_TYPES} from 'common/Types';

function addAlertHandler (state, alert) {
	return {onShowAlerts:state.onShowAlerts.push(alert)};
}

function delAlertHandler (state, alert) {
	console.log("del alert");
	return {onShowAlerts:state.onShowAlerts.remove(state.onShowAlerts.indexOf(alert))};
}

//"success", "warning", "danger", "info"

/**
 * @param state
 * @param action
 * @returns {{}}
 */
function defaultCall(state = {onShowAlerts:Immutable.List()}, action) {
	switch (action.type) {
		case ALERT_TYPES.ADD_ALERT:
			return addAlertHandler(state, action.alert);
		case ALERT_TYPES.DEL_ALERT:
            return delAlertHandler(state, action.alert);
        case MSG_TYPES.ERROR_ALERT:
            return addAlertHandler(state, {msg:action.msg,style:"danger"});
		default:
			return state;
	}
}
export default defaultCall