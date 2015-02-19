var count = 0;
console.log('主进程开启');
var startTime = new Date().getTime();
 
var https = require('http');
 
/*
启动casperjs读取单个url
*/
function capture(url) {
  console.log('打开URL');
  //count++;


  var spawn = require('child_process').spawn,
  //
 //ls = spawn('casperjs', ['plist.js']);
 ls = spawn('cmd', ['/c','casperjs','plist.js']); //疑惑，为何必须输入一个目录之后才能调用其他API？
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
*/

capture();