/**
 * Created by Tile on 2015/12/7.
 */
import ModalTypes from '../constants/ModalTypes';

export function addModal() {
	return {type: ModalTypes.ADD_MODAL, modals:data.modals};

}

export function delModal() {
	return {type: ModalTypes.DEL_MODAL,  modals:data.modals};
}