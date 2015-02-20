var count = 0;
console.log('主进程开启');
var startTime = new Date().getTime();
 
var https = require('http');
/*
启动casperjs读取单个url
*/
function capture(url) {
  console.log('打开URL='+url);
  //count++;


  var spawn = require('child_process').spawn,
  //
 //ls = spawn('casperjs', ['plist.js']);
//URL参数供抽取函数调用
 ls = spawn('cmd', ['/c','casperjs','plist.js',url]); //疑惑，为何必须输入一个目录之后才能调用其他API？
  //var url = system.args[4];
 ls.stdout.on('data', function (data) {
    //do some stuff with each stdout line...
    console.log('stdout: ' + data);
});

 ls.stderr.on('data', function (data) {
    //throw errors
    console.log('stderr: ' + data);
});

 ls.on('close', function (code) {
    console.log('child process exited with code ' + code);
});

}


/*
获取需要采集的url列表
注意URL必须使用ESCAPE函数转义后，才能使用
*/

capture('http://www.amazon.com/gp/aag/main%3Fie%3DUTF8%26asin%3D%26isAmazonFulfilled%3D%26isCBA%3D%26marketplaceID%3DATVPDKIKX0DER%26orderID%3D%26seller%3DA8PJP7QGU6HAE');