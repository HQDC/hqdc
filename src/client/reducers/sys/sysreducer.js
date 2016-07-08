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
    console.log("sysNetInfo", state.sysNetinfo, action);
    return {
        sysNetinfo: state.sysNetinfo.merge(Immutable.fromJS(action.data))
    };
}

function sysNetUnauthorizedHandler(state, action) {
    console.log("sysNetInfo", state.sysNetinfo, action);
    return {
        sysNetinfo: state.sysNetinfo.merge(Immutable.fromJS(action.data))
    };
}

function sysNetDisconnectHandler(state, action) {
    console.log("sysNetInfo", state.sysNetinfo, action);
    return {
        sysNetinfo: state.sysNetinfo.merge(Immutable.fromJS(action.data))
    };
}

/**
 * 接受action 后的 逻辑
 * @param state
 * @param action
 * @returns {{}}
 */
var defaultCall = function(state = {
    sysNetinfo: Immutable.Map({

    })
}, action) {
    switch (action.type) {
        case MSG_TYPES.SYS_S_AUTHENTICATED:
            return sysNetAuthenticatedHandler(state, action);
        case MSG_TYPES.SYS_S_UNAUTHORIZED:
            return sysNetUnauthorizedHandler(state, action);
        case MSG_TYPES.SYS_S_DISCONNECT:
            return sysNetDisconnectHandler(state, action);
        default:
            return state;
    }
};

export default defaultCall