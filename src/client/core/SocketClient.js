/**
 * Created by Tile on 2015/9/8.
 * socket 客户端通信
 */
import ioClient from 'socket.io-client';
import Base from '../core/Base';
class SocketClient{
  constructor() {
    this.connect = false;
    this.socket = null;
  }
}

/**
 * 初始化 客户端 socket
 */
SocketClient.prototype.init = function () {
  if(!this.connect){
    console.log("client test connect to server");
    this.socket = ioClient.connect();
    this.socket.on("connect",()=>{
      this._connect = true;
      console.log("client connected server");
    });
    this.socket.on("disconnect",()=>{
      this.connect = false;
      this.socket.removeAllListeners();
    });
    this.socket.on("message",(data)=>{
      Base.reduxStore.dispatch({type: data.actionType, data: data});
      /* this.dispatch({
        actionType: data.actionType,
        data: data
      });*/
    });
  }
};
/**
 * 向服务器发送数据
 * @param msgHead ClientSocketToServerTypes.js
 * @param msgBody {...data}
 */
SocketClient.prototype.sendMSG = function(msgHead,msgBody){
  this.socket.emit("message",{actionType:msgHead, data:msgBody});
};
SocketClient.prototype.disconnect = function(){
  this.socket.disconnect();
};
var socketClient = new SocketClient();
export default socketClient;