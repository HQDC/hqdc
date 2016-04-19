/**
 * Created by Tile on 2015/12/1.
 */
import keyMirror from 'fbjs/lib/keyMirror';
/**
 *  给客户端 发送服务器的 事件
 */
var MSG_TYPE = keyMirror({
    //-------------------web------------------------------
    CTS_W_LOGIN: 1,               //登录
    CTS_W_SESSION: 2,             //SESSION 检测
    CTS_W_LOGOUT: 3,              //退出
    CTS_W_CREATE_ROOM: 4 ,        //创建房间

    //-----------socket---------------------
    CTS_S_CHANGE_FD_UPDATE: 2001 ,


    //------------------web------------------------------
    STC_W_LOGIN:1001,               //登录
    STC_W_SESSION:1002,             //SESSION 检测
    STC_W_LOGOUT:1003,              //退出
    //------------------socket---------------------------

    STC_S_HALL_ROOM_UPDATE: 3001,   //room update

    //---------------------error------------------------------
    ERROR_ALERT:5001 ,         //通用alert显示error
});

exports.MSG_TYPES = MSG_TYPE;
exports.isWeb = function (type) {
    return MSG_TYPE[type] < 2000;
};

exports.isSocket = function (type) {
    return MSG_TYPE[type] > 2000 && MSG_TYPE[type] < 5000;
};