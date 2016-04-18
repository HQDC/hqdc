import Base from 'Base';

function initFun (initialState) {
	let store = null;
	if (process.env.NODE_ENV === 'production') {
		store = require('./configureStore.prod')(initialState);
	} else {
		//store = require('./configureStore.prod')(initialState);
		store = require('./configureStore.dev')(initialState);
	}
	Base.init(store);
	return store;
}
export default initFun;