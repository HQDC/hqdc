/**
 * Created by Tile on 2015/12/1.
 */
import keyMirror from 'fbjs/lib/keyMirror';
/**
 *  给客户端 发送服务器的 事件
 */
var MSG_TYPE = keyMirror({
    //-------------------web------------------------------
    CTS_W_LOGIN: null,               //登录
    CTS_W_SESSION: null,             //SESSION 检测
    CTS_W_LOGOUT: null,              //退出
    CTS_W_CREATE_ROOM: null ,        //创建房间

    //-----------socket---------------------
    CTS_S_CHANGE_FD_UPDATE: null ,


    //------------------web------------------------------
    STC_W_LOGIN:null,               //登录
    STC_W_SESSION:null,             //SESSION 检测
    STC_W_LOGOUT:null,              //退出
    //------------------socket---------------------------

    STC_S_HALL_ROOM_UPDATE: null,   //room update

    //---------------------error------------------------------
    ERROR_ALERT:null          //通用alert显示error
});

exports.MSG_TYPES = MSG_TYPE;
exports.isWeb = function (type) {
    return type.indexOf("_W_",3) >= 0;
};

exports.isSocket = function (type) {
    return type.indexOf("_S_",3) >= 0;
};