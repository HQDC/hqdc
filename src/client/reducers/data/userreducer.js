/**
 * Created by Tile on 2015/9/30.
 */
import {
    MSG_TYPES
}
from 'common/Types';
import Immutable from 'immutable';
import Base from 'Base';
import expStore from '../../core/StoreWithExpiration';

/**
 *
 * @param state
 * @param action
 */
function testSessionRet(i_state, action) {

}
/**
 *
 * @param state
 * @param action
 */
function userLoginRet(i_state, action) {
    //window.location.href = "/hall";
    Base.socketClient.init(action.data.SID, action.data.server);
    expStore.set('SID', action.data.SID, 24 * 3600);
    // return {
    //     userSession: i_state.userSession.merge(Immutable.fromJS(action.data), {
    //         "isLogin": true
    //     })
    // };
    return i_state.set("isLogin", true).merge(Immutable.fromJS(action.data));
}

function foodListRet(i_state, action) {
    return i_state.set("foodData", Immutable.fromJS(action.data));
    //return i_state;
}

/**
 *
 * @param i_state
 * @param action
 */
function userLogOutRet(i_state, action) {
    //socketClient.disconnect();
}



/**
 *
 * @param i_state
 * @param action
 */
function STCHallUpDateRet(i_state, action) {

}

/**
 * 接受action 后的 逻辑
 * @param i_state
 * @param action
 * @returns {{}}
 */
var defaultCall = function(i_state = Immutable.fromJS({
        ret: -1,
        isLogin: false,
        ip: "",
        name: "",
        SID: (expStore.get('SID') ? expStore.get('SID') : ""),
        foodData: {}
    }),
    action) {
    switch (action.type) {
        case MSG_TYPES.STC_W_LOGIN:
            return userLoginRet(i_state, action);
        case MSG_TYPES.STC_W_FOODLIST:
            return foodListRet(i_state, action);
        default:
            return i_state;
    }
};

export default defaultCall