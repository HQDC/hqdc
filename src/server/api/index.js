/**
 * Created by Tile on 2015/12/20.
 */

import {
	connectSwitcher
}
from '../core/io/lineswitcher';
import userHandler from 'user'
import hallHandler from 'hall'
connectSwitcher(
	[
		userHandler,
		hallHandler
	]
);