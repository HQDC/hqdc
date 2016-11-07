import 'babel-core/polyfill';
import React from 'react';
import {
	render
} from 'react-dom';
import Root from './containers/Root';
import initAll from './stores/configureStore';

const store = initAll();
render(
	<Root store={store}/>,
	document.getElementById('root')
);