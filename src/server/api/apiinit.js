/**
 * Created by Tile on 2015/12/20.
 */

import {connectSwitcher} from  '../core/io/lineswitcher';
import user from './user';


function apiInit(){
    connectSwitcher(
        [
            user
        ]
    );
}

export default apiInit