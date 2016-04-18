/**
 * Created by Tile on 2015/12/1.
 */
import AlertTypes from '../../constants/AlertTypes';
import Immutable from 'immutable';
import STCTypes from '../../../common/STCTypes';

function addAlertHandler (state, alert) {
	return {onShowAlerts:state.onShowAlerts.push(alert)};
}

function delAlertHandler (state, alert) {

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
		case AlertTypes.ADD_ALERT:
			return addAlertHandler(state, action.alert);
		case AlertTypes.DEL_ALERT:
            return delAlertHandler(state, action.alert);
        case STCTypes.ERROR_ALERT:
            return addAlertHandler(state, {msg:action.msg,style:"danger"});
		default:
			return state;
	}
}
export default defaultCall