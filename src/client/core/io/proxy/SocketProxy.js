/**
 * Created by Tile on 2015/9/8.
 * socket 客户端通信
 */
import proxyConnect from 'socket.io-client';
import Base from 'Base';
import {
    MSG_TYPES
}
from 'common/Types';
class SocketProxy {

    constructor() {
        this.connect = false;
        this.socket = null;
    }
}
/**
 * 向服务器发送数据
 * @param sendData {...data}
 */
SocketProxy.prototype.sendMSG = function(sendData) {
    console.log("call socket sendmsg");
    this.socket.emit("message", sendData);
};
SocketProxy.prototype.disconnect = function() {
    this.socket.disconnect();
};
/**
 * 初始化 客户端 socket
 */
SocketProxy.prototype.init = function(token) {
    localStorage.debug = '*';
    if (!this.connect) {
        console.log("client test connect to server");
        //自制cookie
        /*var opts = {
            extraHeaders: {
                'X-Custom-Header-For-My-Project': 'my-secret-access-token',
                'Cookie': 'user_session=NI2JlCKF90aE0sJZD9ZzujtdsUqNYSBYxzlTsvdSUe35ZzdtVRGqYFr0kdGxbfc5gUOkR9RGp20GVKza; path=/; expires=Tue, 07-Apr-2018 18:18:08 GMT; secure; HttpOnly'
            }
        };
        this.socket = proxyConnect("http://localhost:5000", opts);*/
        /*var opts = {
            extraHeaders: {
                'UID': UID
            }
        };
        console.log("init Socket UID", UID);
        this.socket = proxyConnect("http://localhost:5000", opts);*/
        this.socket = proxyConnect("http://192.168.4.120:5000");
        //-----------------------------authenticated-------------------------------------------
        this.socket.on("connect", () => {
            console.log("connect send authenticate to server", token);
            this.socket.emit('authenticate', {
                token: token
            });
        });
        this.socket.on('authenticated', () => {
            console.log("authenticated success");
            this.connect = true;
            Base.reduxStore.dispatch({
                type: MSG_TYPES.SYS_S_AUTHENTICATED,
                data: "authenticated"
            });
            this.sendMSG("test")
        });
        this.socket.on('unauthorized', (msg) => {
            console.log("client unauthorized ->", msg.data.type);
            this.connect = false;
            Base.reduxStore.dispatch({
                type: MSG_TYPES.SYS_S_UNAUTHORIZED,
                data: "unauthorized"
            });
        });

        //-----------------------------authenticated-------------------------------------------
        /*this.socket.on("connect", () => {
            console.log("connect ");
            this.sendMSG("test")
        });*/
        //-----------------------------splite-------------------------------------------
        this.socket.on("disconnect", () => {
            this.connect = false;
            Base.reduxStore.dispatch({
                type: MSG_TYPES.SYS_S_DISCONNECT,
                data: "disconnect"
            });
            this.connect = false;
            this.socket.removeAllListeners();
        });
        this.socket.on("message", (data) => {
            Base.reduxStore.dispatch({
                type: data.actionType,
                data: data
            });
            /* this.dispatch({
             actionType: data.actionType,
             data: data
             });*/
        });
    }
};

var socketProxy = new SocketProxy();
export default socketProxy;