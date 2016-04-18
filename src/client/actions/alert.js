/**
 * Created by Tile on 2015/12/7.
 */
import AlertTypes from '../constants/AlertTypes';

export function addAlert(style , msg ) {
	return {type: AlertTypes.ADD_ALERT, alert:{style:style,msg:msg}};
}

export function delAlert(alert) {
	return {type: AlertTypes.DEL_ALERT,  alert:alert};
}