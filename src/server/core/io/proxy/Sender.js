/**
 * Created by Tile on 2015/12/19.
 */
import {setLineType,TYPES} from "../lineswitcher"
sendMSG = function (res, actionType, sendData) {
    var type = setLineType(res);
    switch (type) {
        case TYPES.HTTP:
            res.status(200).send({actionType: actionType, data: sendData});
            break;
        case TYPES.SOCKET:
            res.emit('message', {actionType: actionType, data: sendData});
            break;
        default:
    }
};
sendAllMSG = function(){

};
export default sendMSG