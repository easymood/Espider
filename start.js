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


var getALLlist=function(){
spider.then(function getPlist() {  
   console.log("start getPlist");  
    productPlist = spider.evaluate(function getPlistFromPage() {  
    	var list=document.querySelectorAll(".shoveler-content ul .aagImgLink"); 
      var obj={
        "list":[],
        "next":""
      };
     for (var i=0;i<list.length;i++)
     {
      obj.list[i]=list[i].href
      };

     //翻页
    // if (document.querySelector(".next-button-link").className.indexOf("disabled")>0){
        //  console.log("click next");  
          //document.querySelector(".next-button-link").click();
          spider.click('.next-button-link');
     //}else{
      //console.log("pageer END");  
      //spider.exit(); 
    //}
  
      
     return obj
    }); 

    console.log(productPlist.list.length);
     for (var i=0;i<productPlist.list.length;i++)
      {
       console.log(productPlist.list[i]);
      };

  
spider.wait(5000,function(){
        this.echo('wait time over!');
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
  
      
     return obj
    }); 

console.log(productPlist2.list.length);
     for (var i=0;i<productPlist2.list.length;i++)
      {
       console.log(productPlist2.list[i]);
      };


}); 
    //spider.exit(); 
    });

 

}

getALLlist()

//查看商品列表
spider.run();


