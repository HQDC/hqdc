var express = require('express');
var app = express();
import path from 'path';

import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpack from 'webpack';
import config from '../webpack.config';

var compiler = webpack(config);
app.use(webpackDevMiddleware(compiler, {noInfo: true, publicPath: config.output.publicPath}));
app.use(webpackHotMiddleware(compiler));
app.use(express.static(path.join(__dirname, 'client/static')));
app.get('/', function (req, res) {
    res.sendfile(__dirname + '/client/index2.html');
});


var server = require('http').Server(app);
var io = require('socket.io')(server);
server.listen(80);
io.on('connection', function (socket) {
    socket.emit('news', { hello: 'world' });
    socket.on('my other event', function (data) {
        console.log(data);
    });
});