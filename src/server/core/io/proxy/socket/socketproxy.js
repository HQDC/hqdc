/**
 * Created by Tile on 2015/9/8.
 * socket 客户端通信
 */
/**
 * 向一个 客户端发送消息  io.sockets.connected[socket.id].emit('message', handshakeData.session.user); 重要
 */

import {
    routerHandler, setLineType, TYPES
} from '../../lineswitcher';
import {
    MSG_TYPES
} from "../../../../../common/Types";
import cookieParser from 'cookie-parser';

import {
    parse
}
from 'cookie';
import {
    unsign
}
from 'cookie-signature';
import {
    isString
}
from '../../../../../common/utils/TypeUtils';
import socketioJwt from 'socketio-jwt';

function SocketProxy() {

}
var _io;

/**
 * 初始化 服务器 socket
 */
SocketProxy.prototype.init = function(io, secret) {
    //http 共享session
    _io = io;

    io.on('connection', socketioJwt.authorize({
        secret: secret,
        timeout: 15000 // 15 seconds to send the authentication message
    }));
    io.on("authenticated", (socket) => {

        setLineType(socket, TYPES.SOCKET);
        var request = socket.request;

        routerHandler({type:MSG_TYPES.SYS_S_AUTHENTICATED,user:socket.decoded_token}, socket);
        socket.on('message', (data) => {
            routerHandler(data, socket);
        });
    });
    io.on('unauthorized',(socket) => {
        routerHandler({type:MSG_TYPES.SYS_S_UNAUTHORIZED,user:socket.decoded_token}, socket);
    });
    /*io.on('connection', (socket) => {
        this._connect = true;
        setLineType(socket, TYPES.SOCKET);
        var requestData = socket.request;

        console.log("socket connect decoded_token ========> ", socket.decoded_token);
        console.log("socket connect requestData ========> ", requestData.headers.cookie);
        if (isString(requestData.headers.cookie)) {
            var curCookie = parse(requestData.headers.cookie);
            console.log("curCookie", curCookie);
        }
        socket.on('message', (data) => {
            socket.emit('message', "client")
            routerHandler(data, socket);
        });
    });
*/
    io.on('reconnect', function(socket) {
        console.log("-------------reconnect-------------", socket);
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
SocketProxy.prototype.sendMSGToOne = function(socketID, msgHead, msgBody) {
    //socket.emit("message",{actionType:msgHead, data:msgBody});
    _io.sockets.connected[socketID].emit('message', {
        actionType: msgHead,
        data: {
            msgBody
        }
    });
};
/**
 * 向所有户端发送消息
 * @param actionType ClientSocketToServerTypes.js
 * @param msgBody [actionType:ClientSocketToServerTypes.xxx,data:{msgBody}]
 */
SocketProxy.prototype.sendMSGToALL = function(actionType, msgBody) {

    _io.sockets.emit('message', {
        actionType: actionType,
        data: msgBody
    });
    console.log("SocketProxy call sendMSGToALL2");
};
var socketProxy = new SocketProxy();
export default socketProxy;
exports.sendMSGToALL = socketProxy.sendMSGToALL;
