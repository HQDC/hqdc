/**
 * Created by Tile on 2015/12/20.
 */

import {
    MSG_TYPES
}
from "../../common/Types";
import {
    sendMSG
}
from "../core/io/Sender";
import crypto from 'crypto';

import cookie from 'cookie';
import signature from 'cookie-signature';
import jwt from 'jsonwebtoken';
/*import cookie from 'cookie';*/

/*import dcconfig from '../../dcconfig';*/


function getClientIp(req) {
    var retip = req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.socket.remoteAddress || req.connection.socket.remoteAddress;
    //var reg2 = /^([0-9]|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.([0-9]|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.([0-9]|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.([0-9]|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])$/g;
    retip = (retip.substring((retip.lastIndexOf(":") + 1), retip.length));
    return retip;
}


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
    console.log("login", comname);
    var today = new Date();
    var time = today.getTime() + 60 * 1000;
    var time2 = new Date(time);
    var timeObj = time2.toGMTString();
    if (comname != null) {
        var reg = /^[\u4e00-\u9fa5]{2,4}$/;
        if (reg.test(comname)) {
            var ip = getClientIp(res._req);
            console.log("ip:", ip);

            var SID = jwt.sign(comname, "hqfy");

            // res.end({type:MSG_TYPES.STC_W_LOGIN,data:{"user":comname,"ip":ip,"ret":0}});
            sendMSG(res, MSG_TYPES.STC_W_LOGIN, {
                data: {
                    user: comname,
                    ip: ip,
                    ret: 0,
                    SID: SID
                },
                cookie: {
                    SID: SID
                },
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

/**
 * session 检测
 */
function testSession(data, res) {
    var SID = data.SID;
    console.log("testSession SID:", SID);
    var userName = jwt.verify(SID, "hqfy");
    var ip = getClientIp(res._req);
    if (SID) {
        sendMSG(res, MSG_TYPES.STC_W_LOGIN, {
            data: {
                user: userName,
                ip: ip,
                ret: 0,
                SID: SID
            },
            cookie: {
                SID: SID
            },
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

/**
 * 创建房间
 */
function createRoom(data, res) {
    console.log("createroom", req.query);
    var workermanager = require('./../process/processmanager');
    var groupData = {};
    groupData.GroupName = req.query.GroupName;
    groupData.DCUrl = req.query.DCUrl;
    groupData.PSW = req.query.PSW;
    groupData.EndTime = req.query.EndTime;
    //groupData.BoxPrice = req.body.BoxPrice;
    var doclass = getclassbyurl(groupData.DCUrl);
    console.log(doclass);
    if (doclass != null) {
        console.log("doclass not null");
        workermanager.doWork(workermanager.creatworkdata({
            url: groupData.DCUrl
        }, doclass, (data) => {
            console.log("return success");
            if (data.ret == 0) {
                res.status(200).send({
                    ret: 1,
                    data: data
                });
            }
        }));
    } else {
        res.status(200).send({
            ret: 1,
            data: {
                user: ""
            }
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
        case MSG_TYPES.CTS_W_CREATE_ROOM:
            return createRoom(data, res);
        default:
            return {
                needStopNext: false
            };
    }
}
export default MsgHandler;