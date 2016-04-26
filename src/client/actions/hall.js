/**
 * Created by Tile on 2015/11/27.
 */
import ModalTypes from '../constants/ModalTypes';
import CreateRoomTest from '../components/CreateRoomModal';
export function showCreateRoom() {
    return (dispatch, getState) => {
        console.log("showCreateRoom");
        dispatch({type: ModalTypes.SHOW_MODAL, modal:CreateRoomTest});
    }
}
