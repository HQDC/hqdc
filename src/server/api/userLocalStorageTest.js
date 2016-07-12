/**
 * Created by LOL on 2015/12/21.
 */
import {
	Router
}
from 'express';
const storageRouter = new Router();

storageRouter.get('*', async(req, res, next) => {
	console.log("show cookie", req.cookies.SID)
	let SID = req.cookies.SID;
	if (SID == null) {
		if (req.baseUrl == '/login') {
			next();
			console.log("do next");
		} else {
			res.redirect('/login');
		}
	} else {
		console.log("SID is alive");
		next();
	}
});

exports.storageRouter = storageRouter;