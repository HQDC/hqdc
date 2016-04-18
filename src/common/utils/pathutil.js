/**
 * Created by Tile on 2015/10/13.
 */


function getRootPath1() {
  var strFullPath = window.document.location.href;
  var strPath = window.document.location.pathname;
  var pos = strFullPath.indexOf(strPath);
  var prePath = strFullPath.substring(0, pos);
  var postPath = strPath.substring(0, strPath.substr(1).indexOf('/') + 1) + "/";
  return (prePath + postPath);
}

function getRootPath2() {
  var pathName = window.location.pathname.substring(1);
  var webName = pathName == '' ? '' : pathName.substring(0, pathName.indexOf('/'));
  return window.location.protocol + '//' + window.location.host + '/' + webName + '/';
}
/**
 * 和web 服务器交互 api 接口路径 rootPath + "/api/data" + apiPH
 * @param apiPH
 * @returns {string}
 */
function getDataPath(apiPH) {
  var rootpath = getRootPath1();
  return rootpath +apiPH;
}

exports.getDataPath = getDataPath;

