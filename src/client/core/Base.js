/**
 * Created by Tile on 2015/11/30.
 */
import postMSG from './io/Sender';
import socketClient from '../core/io/proxy/SocketProxy';
import player from './Player';
class Base {
	constructor() {
		this.socket = null;
		this.reduxStore = null;
		this.player = player;
	}
};

Base.prototype.init = function(reduxStore) {
	this.socketClient = socketClient;
	this.reduxStore = reduxStore;
};

Base.prototype.sendMSG = function(actionType, data) {
	postMSG(actionType, data);
};

var base = new Base();
export default base;