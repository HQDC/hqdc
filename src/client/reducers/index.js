import user from './data/userreducer';
import errors from './ui/errorreducer';
import modals from './ui/modalsreducer';
import alerts from './ui/alertsreducer';
import { routerStateReducer as router } from 'redux-router';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
	user,
	alerts,
	modals,
	errors,
	router
});

export default rootReducer
