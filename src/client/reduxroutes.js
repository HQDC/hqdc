import React from 'react'
import {
	Route, Router, IndexRoute
}
from 'react-router';
import App from './containers/App';
import LoginPage from './containers/LoginPage';
import HallPage from './containers/HallPage';
import NotFoundPage from './containers/NotFoundPage';
import LoginJump from './containers/LoginJump';
export default (
	<Route path="/" component={App}>
		<IndexRoute component={LoginJump} />
		<Route path="*" component={NotFoundPage}/>
	</Route>
)