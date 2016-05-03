/**
 * Created by vshey on 2016/4/29.
 */
var TEST_TYPES = {
    string:'[object String]',
    number:'[object Number]',
    array:'[object Array]',
    date:'[object Date]',
    func:'[object Function]'
};
exports.TYPES = TEST_TYPES;
export function isType(testObj,type){
    return Object.prototype.toString.call(testObj) == type;
}
exports.isString = function(testObj){
    return isType(testObj,TEST_TYPES.string);
};
exports.isNumber = function(testObj){
    return isType(testObj,TEST_TYPES.number);
};
exports.isArray = function(testObj){
    return isType(testObj,TEST_TYPES.array);
};
exports.isDate = function(testObj){
    return isType(testObj,TEST_TYPES.date);
};
exports.isFunction = function(testObj){
    return isType(testObj,TEST_TYPES.func);
};
