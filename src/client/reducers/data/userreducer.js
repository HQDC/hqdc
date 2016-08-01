/**
 * Created by Tile on 2015/9/30.
 */
import {
    MSG_TYPES
}
from 'common/Types';
import Immutable from 'immutable';
import Base from 'Base';
import store from 'store';

/**
 *
 * @param state
 * @param action
 */
function testSessionRet(state, action) {

}
/**
 *
 * @param state
 * @param action
 */
function userLoginRet(state, action) {
    //window.location.href = "/hall";
    Base.socketClient.init(action.data.SID);
    store.set('SID', action.data.SID);
    console.log("testState userLoginRet:", state.userSession, action);
    return {
        userSession: state.userSession.merge(Immutable.fromJS(action.data), {
            "isLogin": true
        })
    };
}


function foodListRet(state, action) {
    return {
        userSession: state.userSession.set("foodData",action.data)
    };
}

/**
 *
 * @param state
 * @param action
 */
function userLogOutRet(state, action) {
    //socketClient.disconnect();
}

/**
 *
 * @param state
 * @param action
 */
function createRoomRet(state, action) {

}

/**
 *
 * @param state
 * @param action
 */
function STCHallUpDateRet(state, action) {

}

/**
 * 接受action 后的 逻辑
 * @param state
 * @param action
 * @returns {{}}
 */
var defaultCall = function(state = {
        userSession: Immutable.Map({
            ret: -1,
            isLogin: false,
            ip: "",
            name: "",
            SID: (store.get('SID') ? store.get('SID') : ""),
            foodData: {},
            isLoading:false
        })
    },
    action) {
    switch (action.type) {
        case MSG_TYPES.STC_W_LOGIN:
            return userLoginRet(state, action);
        case MSG_TYPES.STC_W_FOODLIST:
            return foodListRet(state, action);
        default:
            return state;
    }
};

export default defaultCall