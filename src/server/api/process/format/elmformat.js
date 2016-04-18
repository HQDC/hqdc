/**
 * Created by Tile on 2015/8/17.
 */
var superagent = require('superagent');
var cheerio = require('cheerio');

function ElmFormat(name){
    this.name = name;
}
ElmFormat.prototype.doformat = function(url,callbackfun){
    superagent
        .get(url)
        .end(function(err, sres){
            callbackfun({ret:0,body:sres});
        });
};

module.exports = new ElmFormat("elmformat");