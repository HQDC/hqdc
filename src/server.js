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

// fake app

debug('booting %s', name);

import {webProxy} from "./server/core/io/proxy/web/webproxy";
import apiInit from "./server/api/apiinit";

const app = global.app = express();

var compiler = webpack(config);
app.use(webpackDevMiddleware(compiler, {noInfo: true, publicPath: config.output.publicPath}));
app.use(webpackHotMiddleware(compiler));
app.secret = "123";
app.use(cookieParser(app.secret));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
//--------------cookpaser----------------------
app.set('port', (process.env.PORT || 5000));
app.use(express.static(path.join(__dirname, 'client/static')));
//------------include session---------------

app.use('/api/*', webProxy);
apiInit();

app.use((req, res) => {
    console.log("redirect", req.signedCookies);
    res.sendFile(__dirname + '/client/index.html')
});

//-------------socket.io--------------------

var realserver = http.Server(app);
var io = require("socket.io")(realserver);
import socketProxy from "./server/core/io/proxy/socket/socketproxy";
socketProxy.init(io,app.secret);


//-------------- test session time out? ------------------------
/*import {sessionRouter} from "./server/api/userSessionTest";
 app.use('*', sessionRouter);*/

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