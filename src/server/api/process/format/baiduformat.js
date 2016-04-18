/**
 * Created by Tile on 2015/8/17.
 */
var superagent = require('superagent');
var imageUrl = "http://webmap0.map.bdimg.com/maps/services/thumbnails?width=100&height=100&align=center,center&quality=100&src=";
function BaiDuFormat(name) {
  this.name = name;
}
var starsearch = 'waimai:widget/menu/basicinfo/basicinfo.js\").init(';
var endsearch = ');';
BaiDuFormat.prototype.exec = function (data, successfun, errorfun) {
  setTimeout(myfun, 1);
  function myfun() {
    superagent
    .get(data.url)
    .end(function (err, sres) {
      if (err != null) {
        return errorfun(err);
      }
      var starindex = sres.text.indexOf(starsearch) + starsearch.length;
      var endindex = sres.text.indexOf(endsearch, starindex);
      var jsondata = sres.text.substring(starindex, endindex);
      var datajson = JSON.parse(jsondata);
      successfun(BaiDuFormat.prototype.formatToJson(datajson));
    });
  }
};
/**
 * 格式化成 订餐统一数据
 * {
 * name:店名,
 * id:店id,
 * logo:店图片,
 * phone:电话;
 * category:店家类型(),
 * address:地址,
 * worktime:{begin:,end:}
 * state:店当前营业状态 (1开店 ,2打样),
 * score:评分",
 * invoice:是否支持开发票(1支持,其他不支持),
 * coupon:是否支持在线付款(1支持,其他不支持),
 * takeout_menu:[
 *      {
 *          name:"菜名1",
 *          score:"评分",
 *          tid:"菜id",
 *          price:"价格",
 *          des:"描述",
 *          dish_attr:[{did:,price:,name:,},...],
 *          image:"图片",
 *          onsell:"0,1(是否在售,1:true,0:false,other:false)",
 *          leftnum:"" (剩余数量),
 *          saled_out: (1:还有,2:已经卖光了)
 *      },
 *      {
 *
 *      }
 *      ]
 * }
 * @param data
 */
BaiDuFormat.prototype.formatToJson = function (data) {
  var mjd = {};
  mjd.name = data.shop_name;
  mjd.id = data.shop_id;
  mjd.logo = imageUrl + data.shop_logo;
  mjd.phone = data.shop_phone;
  mjd.category = data.category;
  mjd.address = data.address;
  mjd.worktime = {begin: data.bussiness_hours.start, end: data.bussiness_hours.end};
  mjd.state = (data.bussiness_status == 3 ? 1 : 2);
  mjd.invoice = data.invoice_info.is_support_invoice; //1支持开发票
  mjd.coupon = data.coupon_info.support_coupon; //1支持开发票
  mjd.takeout_menu = [];
  var isInList = [];
  for (var i = 0; i < data.takeout_menu.length; i++) {
    var tagitem = data.takeout_menu[i];
    for (var j = 0; j < tagitem.data.length; j++) {
      var menuitem = tagitem.data[j];
      //去重
      if(isInList[menuitem.item_id] != true){
        var st_menuitem = {};
        st_menuitem.name = menuitem.name;
        st_menuitem.tid = menuitem.item_id;
        st_menuitem.price = menuitem.current_price;
        st_menuitem.image = imageUrl + menuitem.url;
        st_menuitem.des = menuitem.description;
        st_menuitem.onsell = menuitem.on_sale;
        st_menuitem.saled_out = menuitem.saled_out;   // saled_out == 2 卖光
        st_menuitem.leftnum = menuitem.left_num;
        st_menuitem.dish = [];
        if (menuitem.have_attr == 1) {
          var guige = menuitem.dish_attr["规格"];
          for (var k = 0; k < guige.length; k++) {
            var ggitem = guige[k];
            var ditem = {};
            ditem.name = ggitem.name;
            ditem.price = ggitem.price;
            ditem.did = ggitem.dish_attr_id;
            ditem.id = ggitem.id;
            console.log(ditem.did, ditem.id, ggitem.id);
            ditem.onsell = ggitem.saled_out;

            st_menuitem.dish.push(ditem);
          }
        }
        isInList[st_menuitem.tid] = true;
        mjd.takeout_menu.push(st_menuitem);
      }
    }
  }
  return mjd;
};
module.exports = new BaiDuFormat("baiduformat");
/**
 *  "item_id": "501025657173987815",
 "  name": "扁豆烧肉包",
 "  url": "http://t10.baidu.com/it/u=2289615249,2644283047&fm=22",
 "  origin_price": 4,
 "  current_price": 4,
 "  min_order_number": 1,
 "  packge_box_price": "0",
 "  packge_box_number": "1",
 "  saled_out": 2, //已售完
 "  saled": 4323,
 "  on_sale": 1,
 "  description": "温馨提示：图片仅供参考，请以实物为准；高峰时段及恶劣天气，请提前下单。",
 "  rank": "1",
 "  recommend_num": 168,
 "  insert_time": 0,
 "  same_open_time": "1",
 "  have_attr": 0,
 "  dish_attr": [ ],
 "  have_feature": 0,
 "  dish_features": [ ],
 "  dish_type": 1,
 "  left_num": 0,
 "  dish_activity": [ ],
 "  require_category_id": 0,
 "  category_id": "12057670169431176610"

 "data": [
 {
     "item_id": "17815795999833810651",
     "name": "酱大肘",
     "url": "http://t11.baidu.com/it/u=2846963548,3538569361&fm=22",
     "origin_price": 18,
     "current_price": 18,
     "min_order_number": 1,
     "packge_box_price": "0",
     "packge_box_number": "0",
     "saled_out": 1,
     "saled": 850,
     "on_sale": 1,
     "description": "老北京酱货",
     "rank": "31",
     "recommend_num": 51,
     "insert_time": 0,
     "same_open_time": "1",
     "have_attr": 1,
     "dish_attr": {
         "规格": [
             {
                 "id": "17815795999833810651_327126548591343602",
                 "dish_attr_id": "327126548591343602",
                 "name": "一盘",
                 "price": 18,
                 "store_num": "10000000",
                 "left_num": 10000000
             },
             {
                 "id": "17815795999833810651_4435568990447041631",
                 "dish_attr_id": "4435568990447041631",
                 "name": "半个",
                 "price": 38,
                 "store_num": "10000000",
                 "left_num": 10000000
             },
             {
                 "id": "17815795999833810651_8278438375268761143",
                 "dish_attr_id": "8278438375268761143",
                 "name": "整个",
                 "price": 68,
                 "store_num": "10000000",
                 "left_num": 10000000
             }
         ]
     },
     "have_feature": 0,
     "dish_features": [ ],
     "dish_type": 1,
     "left_num": 30000000,
     "dish_activity": [ ],
     "require_category_id": 0,
     "category_id": "2439726024528166119"
 },


 * @type {BaiDuFormat}
 */
//image  http://webmap0.map.bdimg.com/maps/services/thumbnails?width=150&height=150&align=center,center&quality=100&src= + src

/*
 var myformat = function() {
 var s = arguments[0];
 for (var i = 0; i < arguments.length - 1; i++) {
 var reg = new RegExp("\\{" + i + "\\}", "gm");
 s = s.replace(reg, arguments[i + 1]);
 }
 return s;
 };

 var doformat = function(url,callbackfun){
 $.get(url,function(html){
 var $doc = $(html);
 console.log("No.  name  language  star   forks  ");
 $doc.find("ul.repolist li.source").each(function(i,project){
 var $project = $(project);
 var name = $project.find("h3").text().trim();
 var language = $project.find("li:eq(0)").text().trim();
 var star = $project.find("li.stargazers").text().trim();
 var forks = $project.find("li.forks").text().trim();
 var row = myformat("{4} {0}  {1}  {2}  {3}",name,
 language,star,forks,i + 1 );
 callbackfun(row);
 });
 });
 };*/
