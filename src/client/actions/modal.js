/**
 * Created by Tile on 2015/12/7.
 */
import ModalTypes from '../constants/ModalTypes';
export function addModal(modal) {
	console.log("call Add Modal", modal);
	return {
		type: ModalTypes.ADD_MODAL,
		modal: modal
	};
}

export function delModal() {
	return {
		type: ModalTypes.DEL_MODAL
	};
}