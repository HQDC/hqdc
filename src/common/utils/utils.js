/**
 * Created by Tile on 2015/8/28.
 */
/**
 *
 * @param str
 * @returns {string}
 */
encodeBase64 = function (str) {
    var b = new Buffer(str);
    return b.toString('base64');
};

decodeBase64 = function (str) {
    var b = new Buffer(str, 'base64');
    return b.toString();
};


