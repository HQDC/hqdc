/**
 * Created by Tile on 2015/12/1.
 */
import ModalTypes from '../../constants/ModalTypes';
import Immutable from 'immutable';
import {
	MSG_TYPES
}
from 'common/Types';
import FDShowModal from '../../components/FDShowModal';

function addModalHandler(state, modal) {
	console.log("addModalHandler", modal);
	return {
		onShowModal: modal
	};
}

function hideModalHandler(state, modal) {
	return {
		onShowModal: ""
	};
}

function showFoodListModal(state) {
	return {
		onShowModal: FDShowModal
	};
}
/**
 * @param state
 * @param action
 * @returns {{}}
 */
function defaultCall(state = {
	onShowModal: ""
}, action) {
	switch (action.type) {
		case ModalTypes.ADD_MODAL:
			return addModalHandler(state, action.modal);
		case ModalTypes.DEL_MODAL:
			return hideModalHandler(state, action.modal);
		case MSG_TYPES.STC_W_FOODLIST:
			return showFoodListModal(state);
		default:
			return state;
	}
}
export default defaultCall