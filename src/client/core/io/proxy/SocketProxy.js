/**
 * Created by Tile on 2015/9/8.
 * socket 客户端通信
 */
import proxyConnect from 'socket.io-client';
import Base from 'Base';
class SocketProxy {

    constructor() {
        this.connect = false;
        this.socket = null;
    }
}

/**
 * 初始化 客户端 socket
 */
SocketProxy.prototype.init = function(UID) {
    localStorage.debug = '*';
    if (!this.connect) {
        this.socket = proxyConnect("http://localhost:5000");
        this.socket.on("connect", () => {
            this._connect = true;
            console.log("client connected server");
        });
        this.socket.on("disconnect", () => {
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
var socketProxy = new SocketProxy();
export default socketProxy;