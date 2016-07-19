/**
 * Created by Tile on 2015/12/19.
 */
import {isSocket,isWeb} from "../../../common/Types";
import {postFetchCall} from "./proxy/HttpProxy";
import socketProxy from "./proxy/SocketProxy";
import {addAlert} from "../../actions/alert";
function sendMSG(actionType, sendData = {}) {
    sendData.type = actionType;
    if (isWeb(actionType)) {
        return (dispatch, getState)=> {
            postFetchCall("api/msg", sendData, data => {
                dispatch(data)
            }, err=> {
                addAlert("error", "网络错误" + actionType);
            });
        }
    } else if (isSocket(actionType)) {
        console.log(">>>>>",socketProxy.sendMSG);
        socketProxy.sendMSG(sendData);
        //发送成功
        return {}
    }
}
function sendAllMSG() {

}
export default sendMSG