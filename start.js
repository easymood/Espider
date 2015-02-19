var spider = require('casper').create({
  //clientScripts: ["jquery.js"],
  verbose: false,
  logLevel: 'debug',
  pageSettings: {
    loadImages: false, // The WebPage instance used by Casper will
    loadPlugins: false // use these settings
  }
});
phantom.outputEncoding = "gbk";//解决乱码问题
var productPlist;
//使用CHROME浏览器内核访问
spider.userAgent('Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/40.0.2214.93 Safari/537.36');
//启动浏览器
spider.start();
//打开目标网页
spider.thenOpen('http://www.amazon.com/gp/aag/main?ie=UTF8&asin=&isAmazonFulfilled=&isCBA=&marketplaceID=ATVPDKIKX0DER&orderID=&seller=A8PJP7QGU6HAE'); 
console.log("start finished");  
//访问商品列表

var getList=function(){

  spider.then(function(){
        
      productPlist2 = spider.evaluate(function getPlistFromPage() {  
      var list=document.querySelectorAll(".shoveler-content ul .aagImgLink"); 
      var obj={
        "list":[],
        "next":""
      };
     for (var i=0;i<list.length;i++)
     {
      obj.list[i]=list[i].href
      };
  
     obj.next= document.querySelectorAll(".next-button-link").length;
     return obj
    }); 

console.log(productPlist2.list.length);
     for (var i=0;i<productPlist2.list.length;i++)
      {
       console.log(productPlist2.list[i]);
      };

if (productPlist2.next>0){//如果存在翻页链接

  console.log("next page");
spider.then(function(){spider.click('.next-button-link')});   
}else{
  //spider.exit;
  console.log("exit");
spider.exit; 
}
 

}); 



}




var getALLlist=function(){
spider.then(function getPlist() {  

    getList();
   console.log("start getPlist");  
   //spider.then(function(){getList()});  

   spider.wait(5000,function(){
        spider.then(function(){getALLlist()});  
    });

    });




}

getALLlist()

//查看商品列表
spider.run();


