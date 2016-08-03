/**
 * Created by Tile on 2015/12/19.
 */

var switchers = [];

function connectSwitcher(list) {
    console.log("initSwitcher.LG:", list.length);
    switchers = list;
}
/**
 * 消息响应函数
 * @param data
 * @param res     如果从web 端 过来的 res是web的 res  如果是socket 端那么res 是socket
 */
function routerHandler(data, res) {
    var needStopNext = true;
    for (var i = 0; i < switchers.length; i++) {
        var itemSwitcher = switchers[i];
        if (data == null) {
            console.error("routerHandler data is null");
            return;
        }
        if (data.type == null || data.type == "") {
            console.error("无action type 请检查消息是否正确");
            return;
        }
        needStopNext = itemSwitcher(data.type, data, res).needStopNext;
        if (needStopNext == true) {
            break;
        }
    }
}

function setLineType(res, type) {
    if (res != null) {
        res.___type = type;
    }
}

function getLineType(res) {
    if (res != null) {
        return res.___type;
    }
    return "getLineType res null";
}

exports.routerHandler = routerHandler;
exports.connectSwitcher = connectSwitcher;
exports.setLineType = setLineType;
exports.getLineType = getLineType;
exports.TYPES = {
    HTTP: 1,
    SOCKET: 2
};