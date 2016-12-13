/**
 * Created by Tile on 2015/12/20.
 */

import {
    MSG_TYPES
}
from "../../common/Types";
import {
    sendMSG,
    sendMSGToALL
}
from "../core/io/Sender";
import crypto from 'crypto';

import cookie from 'cookie';
import signature from 'cookie-signature';
import jwt from 'jsonwebtoken';
import os from 'os';

import {
    hallManager,
    userManager
}
from './data';

/*import cookie from 'cookie';*/

/*import dcconfig from '../../dcconfig';*/


function getClientIp(req) {
    var retip = req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.socket.remoteAddress || req.connection.socket.remoteAddress;
    //var reg2 = /^([0-9]|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.([0-9]|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.([0-9]|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.([0-9]|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])$/g;
    retip = (retip.substring((retip.lastIndexOf(":") + 1), retip.length));
    return retip;
}

function getIPAdress() {
    var interfaces = os.networkInterfaces();
    for (var devName in interfaces) {
        var iface = interfaces[devName];
        for (var i = 0; i < iface.length; i++) {
            var alias = iface[i];
            if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
                return alias.address;
            }
        }
    }
};

/*function setCookie(res, name, val, secret, options) {
 console.log("setcookie ");
 var signed = 's:' + signature.sign(val, secret);
 var data = cookie.serialize(name, signed, options);
 var prev = res.getHeader('set-cookie') || [];
 var header = Array.isArray(prev) ? prev.concat(data) : Array.isArray(data) ? [prev].concat(data) : [prev, data];
 res.setHeader('set-cookie', header)
 console.log("setcookie end");
 }*/

/**
 * login
 */
function login(data, res) {
    var comname;
    if (data.name != null) {
        comname = decodeURI(data.name);
    }
    console.log("login", comname, getIPAdress());

    var today = new Date();
    var time = today.getTime() + 60 * 1000;
    var time2 = new Date(time);
    var timeObj = time2.toGMTString();
    if (comname != null) {
        var reg = /^[\u4e00-\u9fa5]{2,4}$/;
        if (reg.test(comname)) {
            console.log("hello");
            var SID = userManager.sign(comname);
            console.log("hello2");
            var userData = createUserData(res, SID);
            userManager.addUser(userManager.createUser(SID, userData.name, userData.ip, ""));
            sendMSG(res, MSG_TYPES.STC_W_LOGIN, {
                data: userData,
                cookieopt: {
                    maxAge: 900000,
                    httpOnly: true
                }
            });


        } else {
            sendMSG(res, MSG_TYPES.ERROR_ALERT, {
                msg: "2-4hz"
            });
        }
    } else {
        sendMSG(res, MSG_TYPES.ERROR_ALERT, {
            msg: "null name"
        });
        //sendMSG(res,TYPES.ERROR_ALERT,{msg: "2-4 汉字"});
    }
    return {
        needStopNext: true
    };
}

function createUserData(res, SID) {
    console.log("createUserData1");
    var ip = getClientIp(res._req);
    console.log("createUserData2");
    var userName = userManager.unSign(SID);
    return {
        name: userName,
        ip: ip,
        ret: 0,
        SID: SID,
        server: getIPAdress()
    };
}
/**
 * session 检测
 */
function testSession(data, res) {
    var SID = data.SID;
    console.log("testSession SID:", SID);
    var userData = createUserData(res, SID);
    console.log("userManager.addUser1", SID);
    userManager.addUser(userManager.createUser(SID, userData.name, userData.ip, ""));

    console.log("userManager.addUser2", SID);
    if (SID) {
        sendMSG(res, MSG_TYPES.STC_W_LOGIN, {
            data: userData,
            cookieopt: {
                maxAge: 900000,
                httpOnly: true
            }
        });

    } else {
        sendMSG(res, MSG_TYPES.ERROR_ALERT, {
            msg: "Session null"
        });
    }
    return {
        needStopNext: true
    };
}

/**
 * 登出
 */
function logout(data, res) {
    req.session.destroy();
    res.clearCookie("connect.sid");
    res.status(200).send({
        ret: 0,
        data: {
            user: ""
        }
    });
    //res.redirect('/login');
    return {
        needStopNext: true
    };
}

function socketConnectAuth(data, res) {
    var userSession = userManager.getUserByName(data.user);
    console.log("socketConnectAuth:", userSession, data.user);
    sendMSGToALL(MSG_TYPES.STC_S_SYN_ROOMS, hallManager.getSyncRoomList());
    return {
        needStopNext: true
    };
}

/**
 * foodlist
 */
function getFoodList(data, res) {
    console.log("getFoodList", data);
    var workermanager = require('./process/processmanager');
    var groupData = {};
    groupData.DCUrl = data.fddata.DCUrl;
    var doclass = getclassbyurl(groupData.DCUrl);


    if (doclass != null) {
        workermanager.doWork(workermanager.creatworkdata({
            url: groupData.DCUrl
        }, doclass, (rData) => {
            if (rData.ret == 0) {
                /*res.status(200).send({
                    ret: 1,
                    data: data
                });*/

                userManager.setUserFoodData(data.SID, rData.retdata);
                sendMSG(res, MSG_TYPES.STC_W_FOODLIST, {
                    data: rData.retdata
                });
            }
        }));
    } else {
        sendMSG(res, MSG_TYPES.ERROR_ALERT, {
            msg: "The URL must be BaiDuWaiMai"
        });
    }
    //res.redirect('/login');
}

/* GET users listing. */
var ipconfig = [{
    url: "waimai.baidu.com",
    doclass: './format/baiduformat'
}];

function getclassbyurl(url) {
    console.log("getclassbyurl", url);
    for (var i = 0; i < ipconfig.length; i++) {
        var obj = ipconfig[i];
        if (url.indexOf(obj.url)) {
            return obj.doclass;
        }
    }
    return null;
}

/**
 *
 * @param type          消息头
 * @param data          消息体
 * @param res           消息源  可能是webRes  或者socket
 * @returns {{needStopNext: boolean}}    返回 needStopNext 如果是true 那么 后续的 响应函数将不会调用
 * @constructor
 */
function MsgHandler(type, data, res) {
    console.log("userHandler:", type, data);
    switch (type) {
        case MSG_TYPES.CTS_W_LOGIN:
            return login(data, res);
        case MSG_TYPES.CTS_W_LOGOUT:
            return logout(data, res);
        case MSG_TYPES.CTS_W_SESSION:
            return testSession(data, res);
        case MSG_TYPES.CTS_W_FOODLIST:
            return getFoodList(data, res);
        case MSG_TYPES.SYS_S_AUTHENTICATED:
            return socketConnectAuth(data, res);
        default:
            return {
                needStopNext: false
            };
    }
}
export default MsgHandler;