import React from 'react'
import { Route ,Router,IndexRoute} from 'react-router';
import App from  './containers/App';
import LoginPage from  './containers/LoginPage';
import HallPage from  './containers/HallPage';
import NotFoundPage from  './containers/NotFoundPage';
export default (
	<Route path="/" component={App}>
		<IndexRoute component={LoginPage} />
		<Route path="/login" component={LoginPage}/>
		<Route path="/hall" component={HallPage}/>
		<Route path="*" component={NotFoundPage}/>
	</Route>
)
