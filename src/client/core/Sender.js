/**
 * Created by Tile on 2015/12/19.
 */
import httpClient from 'HttpClient';
import store from 'store';
sendWebMSG = function(actionType, sendData) {
	sendData.actionType = actionType;
	sendData.SID = store.get('SID', "none");
	httpClient.post("/api", sendData)
};
sendSocMSG = function(actionType, sendData) {

};

exports.sendWebMSG = sendWebMSG;
exports.sendSocMSG = sendSocMSG;