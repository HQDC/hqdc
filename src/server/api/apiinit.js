/**
 * Created by Tile on 2015/12/20.
 */

import {
	connectSwitcher
}
from '../core/io/lineswitcher';
import user from './user';
import hall from './hall';

function apiInit() {
	connectSwitcher(
		[
			user,
			hall
		]
	);
}

export default apiInit