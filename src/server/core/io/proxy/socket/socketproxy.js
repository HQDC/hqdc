/**
 * Created by Tile on 2015/9/8.
 * socket 客户端通信
 */
/**
 * 向一个 客户端发送消息  io.sockets.connected[socket.id].emit('message', handshakeData.session.user); 重要
 */

import {
    routerHandler, setLineType, TYPES
}
from '../../lineswitcher';
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
/*import cookieParser from 'cookie-parser';*/


function SocketProxy() {
    this._connect = false;
}
var socketProxy = new SocketProxy();
/**
 * 初始化 服务器 socket
 */
SocketProxy.prototype.init = function(io, secret) {
    //http 共享session
    this._io = io;
    console.log("socketInit", secret);

    io.on('connection', socketioJwt.authorize({
        secret: secret,
        // handshake: true,
        timeout: 15000 // 15 seconds to send the authentication message
    }));
    io.on("authenticated", (socket) => {
        this._connect = true;
        setLineType(socket, TYPES.SOCKET);
        var handshakeData = socket.handshake;

        console.log("socket connect decoded_token ========> ", socket.decoded_token);
        console.log("socket connect cookie ========> ", handshakeData.headers.cookie);
        if (isString(handshakeData.headers.cookie)) {
            var curCookie = parse(handshakeData.headers.cookie);
            console.log("curCookie", curCookie);
        }
        socket.on('message', (data) => {
            routerHandler(data, socket);
            /*this.dispatch({
                user: user,
                actionType: data.actionType,
                data: data
            });*/
        });
    });
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
    this._io.sockets.connected[socketID].emit('message', {
        actionType: msgHead,
        data: {
            msgBody
        }
    });
};

/**
 * 向所有户端发送消息
 * @param msgHead ClientSocketToServerTypes.js
 * @param msgBody [actionType:ClientSocketToServerTypes.xxx,data:{msgBody}]
 */
SocketProxy.prototype.sendMSGToALL = function(msgHead, msgBody) {
    this._io.socket.emit('message', {
        actionType: msgHead,
        data: msgBody
    });
};

export default socketProxy;