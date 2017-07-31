var express = require('express');
var fs = require('fs');
var path = require('path');
var app = express();
// 配置中间件帮忙传req,res的值
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

var app = express();
// 设置默认模板引擎
app.set('view engine', 'ejs');
app.set('views', './views');
// 托管静态资源
app.use('/node_modules', express.static('node_modules'));
// 导入首页路由
// var indexRouter = require('./routers/indexRouter.js');
// app.use(indexRouter);

// var userrRouter = require('./routers/userRouter.js');
// app.use(userrRouter);
fs.readdir(path.join(__dirname, './routers'), (err, filenames) => {
    if (err) throw err;
    filenames.forEach(filename => {
        var filepath = path.join(__dirname, './routers', filename);
        app.use(require(filepath));

    })
})

app.listen(3000, function() {
    console.log('http://127.0.0.1:3000');
});