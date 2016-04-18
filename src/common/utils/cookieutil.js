/**
 * Created by Tile on 2015/10/28.
 */
import $ from 'jquery';
function CookieUtil() {
    console.log("create CookieUtil");
}

var cookieutil = new CookieUtil();
CookieUtil.prototype.setCookie = function (c_name, value, expiredays) {
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + expiredays);
    document.cookie = c_name + "=" + escape(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString());
};
CookieUtil.prototype.getCookie = function (name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    var str = document.cookie;
    console.log("cookie",str);
    if (arr = document.cookie.match(reg))
        return (arr[2]);
    else
        return null;
};
CookieUtil.prototype.delCookie = function (name) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = this.getCookie(name);
    var str = document.cookie;
    console.log("show document:"+document);
    if (cval != null) {
        console.log("del cook:"+name);
        document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
    }
};
export default cookieutil;