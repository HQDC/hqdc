/**
 * Created by Tile on 2015/12/1.
 */
import ModalTypes from '../../constants/ModalTypes';
import Immutable from 'immutable';

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
/**
 * @param state
 * @param action
 * @returns {{}}
 */
function defaultCall(state = {
	onShowModal: ""
}, action) {
	switch (action.type) {
		case ModalTypes.SHOW_MODAL:
			return addModalHandler(state, action.modal);
		case ModalTypes.DEL_MODAL:
			return hideModalHandler(state, action.modal);
		default:
			return state;
	}
}
export default defaultCall