/**
 * Created by Tile on 2015/12/19.
 */
import httpClient from  'HttpClient';
sendWebMSG = function (actionType, sendData) {
    sendData.actionType = actionType;
    httpClient.post("/api",sendData)
};
sendSocMSG = function(actionType,sendData){

};

exports.sendWebMSG = sendWebMSG;
exports.sendSocMSG = sendSocMSG;