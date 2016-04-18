import { createStore, applyMiddleware, compose } from 'redux'
import { reduxReactRouter } from 'redux-router'
import {createHistory} from 'history'
import routes from '../reduxroutes'
import thunk from 'redux-thunk'
import api from '../middleware/api'
import rootReducer from '../reducers'

const finalCreateStore = compose(
	//applyMiddleware(thunk, api),
	applyMiddleware(thunk),
	reduxReactRouter({routes, createHistory})
)(createStore);
export default function configureStore(initialState) {
	return finalCreateStore(rootReducer, initialState)
}
