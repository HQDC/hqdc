/**
 * Created by LOL on 2015/12/21.
 */
import { Router } from 'express';
import store from 'store';
const storageRouter = new Router();

storageRouter.get('*', async (req, res, next) => {
	let name = store.get("userName");
	if (name == null) {
		if (req.baseUrl == '/login') {
			next();
			console.log("do next");
		} else {
			res.redirect('/login');
		}
	} else {
		console.log("storage is alive");
		next();
	}
});

exports.storageRouter = storageRouter;