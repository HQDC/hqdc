class Player {
	constructor() {
		this.islogin = false;
		this.cookie = null;
		this.name = null
	}
}

Player.prototype.init = function(reduxStore) {
	this.socketClient = socketClient;
	this.reduxStore = reduxStore;
};

var player = new Player();
export default player;