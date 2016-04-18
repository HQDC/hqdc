/**
 * Created by Tile on 2015/12/1.
 */
import ModalTypes from '../../constants/ModalTypes';
function addModalHandler (state, action) {
	return ({
		onShowModal:action.modal
	})
}

function hideModalHandler (state, action) {
    return ({
        onShowModal:null
    })
}
/**
 * @param state
 * @param action
 * @returns {{}}
 */
function defaultCall (state = {}, action) {
	switch (action.type) {
		case ModalTypes.SHOW_MODAL:
			return addModalHandler(state, action);
        case ModalTypes.HIDE_MODAL:
            return hideModalHandler(state, action);
		default:
			return state;
	}
}
export default defaultCall