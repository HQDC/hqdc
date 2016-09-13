/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */
import 'babel/polyfill';
import _ from 'lodash';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import fs from 'fs';
import webpack from 'webpack';
import path from 'path';
import express from 'express';
import config from '../webpack.config';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import http from 'http';
import log4js from 'log4js';
//log the hqdc logger messages to a file, and the console ones as well.

log4js.configure({
	appenders: [{
		type: "file",
		filename: "hqdc.log",
		category: ['hqdc', 'console']
	}, {
		type: "console"
	}],
	replaceConsole: true
});

//to add an appender programmatically, and without clearing other appenders
//loadAppender is only necessary if you haven't already configured an appender of this type
log4js.loadAppender('file');
log4js.addAppender(log4js.appenders.file('pants.log'), 'pants');

var logger = log4js.getLogger('hqdc');

var debug = require('debug')('http'),
	name = 'My App';
debug('booting %s', name);

import {
	webProxy
}
from "./server/core/io/proxy/web/webproxy";
import apiInit from "./server/api/apiinit";

const app = global.app = express();

var compiler = webpack(config);
app.use(webpackDevMiddleware(compiler, {
	noInfo: true,
	publicPath: config.output.publicPath
}));
app.use(webpackHotMiddleware(compiler));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: false
}));

app.use(cookieParser("hqfy"));
//--------------cookpaser----------------------
app.set('port', (process.env.PORT || 5000));
app.use(express.static(path.join(__dirname, 'client/static')));
//------------include session---------------


//-------------- test session time out? ------------------------
/*import {
	storageRouter
}
from "./server/api/userLocalStorageTest";
app.use('*', storageRouter);
*/
app.use('/api/*', webProxy);
apiInit();

app.use((req, res) => {
	res.sendFile(__dirname + '/client/index.html')
});
//-------------socket.io--------------------
var realserver = http.Server(app);
var io = require("socket.io")(realserver);
import socketProxy from "./server/core/io/proxy/socket/socketproxy";
socketProxy.init(io, "hqfy");

//------------------------web 转发器------------------------------------

//
// Register API middleware
// -----------------------------------------------------------------------------
//web 逻辑
//app.use('/api/data', serverWebLogic);
// Launch the server
// -----------------------------------------------------------------------------

realserver.listen(app.get('port'), () => {
	/* eslint-disable no-console */
	console.log('The server is running at http://localhost:' + app.get('port'));
	if (process.send) {
		process.send('online');
	}
});