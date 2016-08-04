/**
 * Created by Tile on 2015/9/30.
 */
import {
    MSG_TYPES
}
from 'common/Types';
import Immutable from 'immutable';
import Base from 'Base';

/**
 *
 * @param state
 * @param action
 */
function sysNetAuthenticatedHandler(state, action) {
    return state.set("sysNetInfo_msg","AuthenticatedSuccess");
}

function sysNetUnauthorizedHandler(state, action) {
    return state.set("sysNetInfo_msg", "Unauthorized");
}

function sysNetDisconnectHandler(state, action) {
    return state.set("sysNetInfo_msg","Disconnect");

}

function sysStateLoadingHandler(state, action) {
    return state.set("sysStateInfo_isLoading",true);
}

function sysStateUnLoadingHandler(state, action) {
    return state.set("sysStateInfo_isLoading",false);
}

/**
 * 接受action 后的 逻辑
 * @param state
 * @param action
 * @returns {{}}
 */
var defaultCall = function(state = Immutable.fromJS({
    sysNetInfo_msg:"",
    sysStateInfo_isLoading:false
}), action) {
    switch (action.type) {
        case MSG_TYPES.SYS_S_AUTHENTICATED:
            return sysNetAuthenticatedHandler(state, action);
        case MSG_TYPES.SYS_S_UNAUTHORIZED:
            return sysNetUnauthorizedHandler(state, action);
        case MSG_TYPES.SYS_S_DISCONNECT:
            return sysNetDisconnectHandler(state, action);
        case MSG_TYPES.STATE_LOADING:
            return sysStateLoadingHandler(state, action);
        case MSG_TYPES.STATE_UNLOADING:
            return sysStateUnLoadingHandler(state, action);
        case MSG_TYPES.STC_W_FOODLIST:
            return sysStateUnLoadingHandler(state, action);
        case MSG_TYPES.STC_W_CREATE_ROOM_SUCCESS:
            return sysStateUnLoadingHandler(state, action);

        default:
            return state;
    }
};

export default defaultCall