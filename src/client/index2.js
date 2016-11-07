/**
 * Created by vshey on 2016/4/16.
 */

import connectHandler from 'socket.io-client';


var socket = connectHandler('http://localhost:5000');
socket.on('news', function(data) {
	console.log(data);
	socket.emit('my other event', {
		my: '123'
	});
});