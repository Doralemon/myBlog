var express = require('express');
var fs = require('fs');
var path = require('path');
// 配置中间件帮忙传req,res的值
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

var app = express();
// 设置默认模板引擎
app.set('view engine', 'ejs');
app.set('views', './views');