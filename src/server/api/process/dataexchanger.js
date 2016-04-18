/**
 * Created by Tile on 2015/8/17.
 */
var isbusy = false;
var data = null;
process.on('message', function(data) {
  this.data = data;
  console.log("----------",data);
  var formater;
  console.log(data.doclass);
  formater = require(data.doclass);
  if(formater == null){
    process.send({ret:1,msg:"找不到处理此站的格式工具"});
  }else{
    //返回菜单数据
    formater.exec(data.execdata ,function (successdata) {
      process.send({ret:0,msg:"成功",retdata:successdata});
    },function(errordata){
      process.send({ret:2,msg:"错误",retdata:errordata});
    });
  }
});


