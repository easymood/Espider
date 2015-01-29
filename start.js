var spider = require('casper').create();
var productPlist;
//使用CHROME浏览器内核访问
spider.userAgent('Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/40.0.2214.93 Safari/537.36');
//启动浏览器
spider.start();
//打开目标网页
spider.thenOpen('http://www.amazon.com/gp/aag/main?ie=UTF8&asin=&isAmazonFulfilled=&isCBA=&marketplaceID=ATVPDKIKX0DER&orderID=&seller=A1ZH4LPYESDYR6'); 
 console.log("start finished");  
//访问商品列表
spider.then(function getPlist() {  
   console.log("start getPlist");  
    productPlist = spider.evaluate(function getPlistFromPage() {  
        return  Plist = document.querySelector(".shoveler-content").innerHTML;  
    });  
  
    console.log(productPlist);  
    spider.exit(); 
});  
//查看商品列表
spider.run();


