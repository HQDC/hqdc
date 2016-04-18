/**
 * Created by Tile on 2015/11/30.
 */
import sendMSG from './io/Sender';
import socketClient from '../core/io/proxy/SocketProxy';
class Base{
	constructor() {
		this.socket = null;
		this.reduxStore = null;
	}
}

Base.prototype.init = function(reduxStore){
	this.socketClient = socketClient;
	this.reduxStore = reduxStore;
	this.sendMSG = sendMSG;
};
Base.prototype.socketInit = function(){
    this.socketClient.init();
};
var base = new Base();
export default base;