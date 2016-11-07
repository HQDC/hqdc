/**
 * Created by Tile on 2015/11/30.
 */
import "isomorphic-fetch";
import {
	canUseDOM
} from 'fbjs/lib/ExecutionEnvironment';

function getUrl(path) {
	if (path.startsWith('http') || canUseDOM) {
		return path;
	}
	return process.env.WEBSITE_HOSTNAME ?
		`http://${process.env.WEBSITE_HOSTNAME}${path}` :
		`http://127.0.0.1:${global.server.get('port')}${path}`;
}

function fetchCall(path, type, body, successFun, errorFun) {
	let webPath = getUrl(path);
	fetch(webPath, {
			method: type,
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: body == null ? {} : JSON.stringify(body)
		}).then(response => {
			return response.json();
		})
		.then(data => {
			console.log("http:" + webPath);
			successFun(data);
		})
		.catch(err => {
			console.log("error http:" + webPath);
			errorFun(err);
		})
}
const HttpClient = {
	get: (path, body, successFun, errorFun) => fetchCall(path, "get", body, successFun, errorFun),
	post: (path, body, successFun, errorFun) => fetchCall(path, "post", body, successFun, errorFun)
};

export default HttpClient;

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