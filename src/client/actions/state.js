/**
 * Created by Tile on 2015/11/27.
 */
import ModalTypes from '../constants/ModalTypes';
import sendMSG from '../core/io/Sender';
import {
	MSG_TYPES
}
from '../../common/Types';
export function setLoadingState() {
    return {type: MSG_TYPES.STATE_LOADING};
}
export function setUnLoadingState() {
    return {type: MSG_TYPES.STATE_UNLOADING};

}