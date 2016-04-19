/**
 * Created by Tile on 2015/9/8.
 * socket 客户端通信
 */
import { Dispatcher } from 'flux';
/**
 * 向一个 客户端发送消息  io.sockets.connected[socket.id].emit('message', handshakeData.session.user); 重要
 */
class SocketServer extends Dispatcher{

}
/**
 * 初始化 服务器 socket
 */
SocketServer.prototype.init = function(io,secret,mongoStore){
  //http 共享session
  this._io = io;
  io.on('connection', (socket)=>{
    this._connect = true;
    var handshakeData = socket.handshake;
    console.log("socket connect ========> ");
    var signedCookies = require('express/node_modules/cookie').parse(handshakeData.headers.cookie);
    cookieParser = require('cookie-parser');
    handshakeData.cookies = cookieParser.signedCookies(signedCookies,secret);
    var sid = handshakeData.cookies["connect.sid"];
    if(sid){
      mongoStore.get(sid, (err,session)=>{
        if(err){
          console.error("read session error",err);
          return callback(err, false);
        }else{
          handshakeData.session = session;
          var user = global.getUserManager().CreateUser((encodeBase64(handshakeData.session.user)),handshakeData.session.user,handshakeData.session.ip,socket.id);
          global.getUserManager().addUser(user);
        }
      });
    }
    if(user != null){
      socket.on('message', (data)=>{
        this.dispatch({
          user:user,
          actionType: data.actionType,
          data: data
        });
      });
    }
  });
  io.on('reconnect', function(socket){
    console.log("-------------reconnect-------------");
  });
  io.on('disconnect', function() {
    console.log("-------------disconnect----------");
  });
};

/**
 * 向某个客户端发送消息
 * @param socketID ClientSocketToServerTypes.js
 * @param msgHead ClientSocketToServerTypes.js
 * @param msgBody [actionType:ClientSocketToServerTypes.xxx,data:{msgBody}]
 */
SocketServer.prototype.sendMSGToOne = function(socketID,msgHead,msgBody){
  //socket.emit("message",{actionType:msgHead, data:msgBody});
  this._io.sockets.connected[socketID].emit('message', {actionType:msgHead,data:{msgBody}});
};

/**
 * 向所有户端发送消息
 * @param msgHead ClientSocketToServerTypes.js
 * @param msgBody [actionType:ClientSocketToServerTypes.xxx,data:{msgBody}]
 */
SocketServer.prototype.sendMSGToALL = function(msgHead,msgBody){
  this._io.socket.emit('message',{actionType:msgHead, data:msgBody});
};

var socketClient = new SocketServer();
export default socketClient;
