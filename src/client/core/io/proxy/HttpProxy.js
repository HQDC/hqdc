/**
 * Created by Tile on 2015/11/30.
 */
import "isomorphic-fetch";
import {getDataPath} from '../../../../common/utils/pathutil'

function postFetchCall(path,body, successFun, errorFun) {
    let webPath = getDataPath(path);
    console.log("cookie:",document.cookie);
    fetch(webPath, {
        method: "post",
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: body == null ? {} : JSON.stringify(body)
    }).then(response => {
            console.log("http return:",response);
            return response.json();
        })
        .then(data => {
            console.log("pass json success return:" , data);
            successFun(data);
        })
        .catch(err => {
            console.log("error:" + err);
            errorFun(err);
        })
}
function getFetchCall(path, successFun, errorFun) {
    let webPath = getDataPath(path);
    console.log("webPath:",webPath);
    fetch(webPath, {
        method: "get",
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }).then(response => {
            console.log("http return:" + webPath);
            return response.json();
        })
        .then(data => {
            console.log("pass json success return:" + webPath);
            successFun(data);
        })
        .catch(err => {
            console.log("error:" + err);
            errorFun(err);
        })
}


exports.postFetchCall =  postFetchCall;

exports.getFetchCall =  getFetchCall;

/*import { canUseDOM } from 'fbjs/lib/ExecutionEnvironment';
 function getUrl(path) {
 console.log("getpath1:", path);
 if (path.startsWith('http') || canUseDOM) {
 return path;
 }
 console.log("getpath2:", path);
 return process.env.WEBSITE_HOSTNAME ?
 `http://${process.env.WEBSITE_HOSTNAME}${path}` :
 `http://127.0.0.1:${global.server.get('port')}${path}`;
 }*/

/*const HttpClient2 = {
 get: path => new Promise((resolve, reject) => {
 request
 .get(getUrl(path))
 .accept('application/json')
 .end((err, res) => {
 if (err) {
 if (err.status === 404) {
 resolve(null);
 } else {
 reject(err);
 }
 } else {
 resolve(res.body);
 }
 });
 }),
 };*/
