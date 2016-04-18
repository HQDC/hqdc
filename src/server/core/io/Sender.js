/**
 * Created by Tile on 2015/12/19.
 */
import {getLineType,TYPES} from "./lineswitcher"
function sendOneMSG (res, actionType, sendData) {

    var type = getLineType(res);
    console.log("get res type",type);
    sendData.type = actionType;
    switch (type) {
        case TYPES.HTTP:
            console.log("send web msg",actionType);
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