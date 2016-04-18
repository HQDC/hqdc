/**
 * Created by Tile on 2015/12/1.
 */
import _ from 'lodash';
import STCTypes from '../../../common/STCTypes';
/**
 * @param state
 * @param action
 */
function defaultCall (state = {onShowAlerts:[]}, action) {
    switch (action.type) {
        case STCTypes.ERROR_ALERT:
            //return  {onShowAlerts:state.onShowAlerts.concat([{style:"error",msg:action.msg}])};
        default:
            return state;
    }
}

export default defaultCall