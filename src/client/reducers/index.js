import user from './data/userreducer';
import hall from './data/hallreducer';
import errors from './ui/errorreducer';
import modals from './ui/modalsreducer';
import alerts from './ui/alertsreducer';
import sys from './sys/sysreducer';
import {
	routerStateReducer as router
}
from 'redux-router';
import {
	combineReducers
}
from 'redux';
const rootReducer = combineReducers({
	user,
	hall,
	alerts,
	modals,
	errors,
	router,
	sys
});

export default rootReducer