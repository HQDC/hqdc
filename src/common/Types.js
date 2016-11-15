/**
 * Created by Tile on 2015/12/1.
 */
import keyMirror from 'fbjs/lib/keyMirror';
/**
 *  给客户端 发送服务器的 事件
 */
var MSG_TYPE = keyMirror({
    //-------------------C->S web------------------------------
    CTS_W_LOGIN: null, //登录
    CTS_W_SESSION: null, //SESSION 检测
    CTS_W_LOGOUT: null, //退出
    CTS_W_CREATE_ROOM: null, //创建房间
    CTS_W_FOODLIST: null, //获取菜单数据



    //------------------S->C web------------------------------
    STC_W_LOGIN: null, //登录
    STC_W_SESSION: null, //SESSION 检测
    STC_W_LOGOUT: null, //退出
    STC_W_FOODLIST: null, //菜单数据
    STC_W_CREATE_ROOM_SUCCESS: null, // create roomesuccess


    //-----------S->C socket---------------------
    CTS_S_CHANGE_FD_UPDATE: null,
    CTS_S_ENTER_ROOM: null, // enter room
    CTS_S_SYN_ROOMS: null, // get Room List and synchronized
    CTS_S_SYN_ROOMITEM: null, // get Room List and synchronized
    CTS_S_QUIT_ROOM: null, // quit room
    //---------------C->S---socket---------------------------
    STC_S_SYN_ROOMS: null, //return synchronized room list
    STC_S_SYN_ROOMITEM: null, // push roomdata which requset to update
    STC_S_HALL_ROOM_UPDATE: null, //room update
    STC_S_ENTER_ROOM: null, //enter room ret
    STC_S_QUIT_ROOM: null, //quit room ret
    //------------------state---------------------------

    STATE_LOADING: null, //loading
    STATE_UNLOADING: null, //unloading
    //------------------system---------------------------
    SYS_S_AUTHENTICATED: null, //socket 验证成功 已经connect
    SYS_S_UNAUTHORIZED: null, //socket 验证失败 
    SYS_S_DISCONNECT: null, //socket Socket 链接失败


    //---------------------error------------------------------
    ERROR_ALERT: null //通用alert显示error
});

exports.MSG_TYPES = MSG_TYPE;
exports.isWeb = function(type) {
    return type.indexOf("_W_", 3) >= 0;
};

exports.isSocket = function(type) {
    return type.indexOf("_S_", 3) >= 0;
};