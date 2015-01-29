var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');
var iconv = require('iconv-lite');
var BufferHelper = require('bufferhelper');
var http = require('http');



//抓取商品列表内容
var casper = require('casper').create();

casper.start('http://www.baidu.com/', function() {
   this.echo(this.getTitle());
});

casper.run();





http.get("http://www.amazon.com/senlips-light-bar-13-5inch-combo/dp/B00NYK0FNA/ref=aag_m_pw_dp?ie=UTF8&m=A1ZH4LPYESDYR6", function(res) {
    var bufferHelper = new BufferHelper();

    res.on('data', function(chunk) {

      bufferHelper.concat(chunk);
      //console.log(bufferHelper.concat(chunk))
    });
    res.on('end', function() {
      //getWebsiteContent(bufferHelper, objName);
       var html=bufferHelper.toBuffer().toString();



       $ = cheerio.load(html);
       var Pname=$("#btAsinTitle").text();
       var sku
       console.log(Pname);
       //console.log($('#soldByThirdParty span').text());

    });
  })