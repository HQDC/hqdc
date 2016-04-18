/**
 * Created by Tile on 2015/12/1.
 */
import keyMirror from 'fbjs/lib/keyMirror';
/**
 *  给客户端 发送服务器的 事件
 */
var WebTypes = keyMirror({
//-------------------web------------------------------
    CTS_W_LOGIN: null,               //登录
    CTS_W_SESSION: null,             //SESSION 检测
    CTS_W_LOGOUT: null,              //退出
    CTS_W_CREATE_ROOM: null ,        //创建房间


});

var SocketTypes = keyMirror({
    CTS_S_CHANGE_FD_UPDATE: null ,


});

exports.WEBTYPES = WebTypes;
exports.isWeb = function (type) {
    return WebTypes[type] != null
};
exports.SOCKETTYPES = SocketTypes;
exports.isSocket = function (type) {
    return SocketTypes[type] != null
};