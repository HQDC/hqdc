/**
 * Created by Tile on 2015/12/19.
 */
import {
    getLineType, TYPES
}
from "./lineswitcher"

import {sendMSGToALL} from "./proxy/socket/socketproxy"

function sendOneMSG(res, actionType, sendData = {}) {
    var type = getLineType(res);
    sendData.type = actionType;
    switch (type) {
        case TYPES.HTTP:
            console.log("send web msg", actionType);
            if (sendData.cookie) {
                console.log("setHeader Cookie", sendData.cookie);
                for (var key in sendData.cookie) {
                    var value = sendData.cookie[key];
                    if (sendData.cookieopt) {
                        res.cookie(key, value, sendData.cookieopt);
                    } else {
                        res.cookie(key, value, {});
                    }
                }
            }
            res.status(200).send(sendData);
            break;
        case TYPES.SOCKET:
            console.log("send socket msg");
            res.emit('message', sendData);
            break;
        default:
    }
}

exports.sendMSG = sendOneMSG;

exports.sendMSGToALL = sendMSGToALL;

