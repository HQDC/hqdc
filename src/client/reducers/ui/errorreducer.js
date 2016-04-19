/**
 * Created by Tile on 2015/12/1.
 */
import {MSG_TYPES} from 'common/Types';
/**
 * @param state
 * @param action
 */
function defaultCall (state = {onShowAlerts:[]}, action) {
    switch (action.type) {
        case MSG_TYPES.ERROR_ALERT:
            //return  {onShowAlerts:state.onShowAlerts.concat([{style:"error",msg:action.msg}])};
        default:
            return state;
    }
}

export default defaultCall