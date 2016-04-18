/**
 * Created by LOL on 2015/12/21.
 */
import { Router } from 'express';
const sessionRouter = new Router();

sessionRouter.get('*', async (req, res, next) => {
	if (req.session == null || req.session.user == null) {
		if (req.baseUrl == '/login') {
			next();
			console.log("do next");
		} else {
			res.redirect('/login');
		}
	} else {
		console.log("session is alive");
		next();
	}
});

exports.sessionRouter = sessionRouter;