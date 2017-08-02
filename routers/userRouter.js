var express = require('express');
var router = express.Router();

var userCtrl = require("../controller/userCtrl")
router
    .get('/register', userCtrl.showRegisterPage) //访问注册页面
    .post('/register', userCtrl.registerNewUser) //注册新用户
    .get('/login', userCtrl.showLoginPage) //展示登录页
    .post('/login', userCtrl.login) //登录
    .get('/loginOut', userCtrl.loginOut) //用户注销登录


module.exports = router;