/**
 * store with Expiration
 * @type {Object}
 */

import store from 'store'

var expStore = {
    set: function(key, val, exp) {
        store.set(key, {
            val: val,
            exp: exp,
            time: new Date().getTime()
        })
    },
    get: function(key) {
        var info = store.get(key)
        if (!info) {
            return null
        }
        if (new Date().getTime() - info.time > info.exp) {
            return null
        }
        return info.val
    }
}

export default expStore;