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

var debug = require('debug')('http')
, name = 'My App';
debug('booting %s', name);

import {webProxy} from "./server/core/io/proxy/web/webproxy";
import apiInit from "./server/api/apiinit";

const app = global.app = express();

var compiler = webpack(config);
app.use(webpackDevMiddleware(compiler, {noInfo: true, publicPath: config.output.publicPath}));
app.use(webpackHotMiddleware(compiler));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.secret = "123";
app.use(cookieParser(app.secret));
//--------------cookpaser----------------------
app.set('port', (process.env.PORT || 5000));
app.use(express.static(path.join(__dirname, 'client/static')));
//------------include session---------------


//-------------- test session time out? ------------------------
import {storageRouter} from "./server/api/userLocalStorageTest";
app.use('*', storageRouter);

app.use('/api/*', webProxy);
apiInit();

app.use((req, res) => {
    console.log("redirect", req.cookies);
    res.sendFile(__dirname + '/client/index.html')
});
//-------------socket.io--------------------
var realserver = http.Server(app);
var io = require("socket.io")(realserver);
import socketProxy from "./server/core/io/proxy/socket/socketproxy";
socketProxy.init(io,app.secret);




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