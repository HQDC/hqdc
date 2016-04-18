/**
 * Created by Tile on 2015/12/1.
 */

import keyMirror from 'fbjs/lib/keyMirror';
/**
 *  给客户端 发送服务器的 事件
 */
export default keyMirror({
    //------------------web------------------------------
    STC_W_LOGIN:null,               //登录
    STC_W_SESSION:null,             //SESSION 检测
    STC_W_LOGOUT:null,              //退出

    //------------------socket---------------------------

	STC_S_HALL_ROOM_UPDATE: null,   //room update




    //---------------------error------------------------------
    ERROR_ALERT:null ,         //通用alert显示error
});