var md5 = require('blueimp-md5'); //导入加密模块

var userModel = require('../model/userModel.js');

var config = require('../config.js');
module.exports = {
    showRegisterPage(req, res) { //展示注册页面
        res.render('./user/register', {});
    },
    registerNewUser(req, res) { //注册新用户
        var user = req.body;
        userModel.getUserByName(user.username, (err, results) => {
            if (err) return res.json({ err_code: 1, msg: '注册失败' });
            // console.log(results);
            // 判断结果length=0,说明此用户可注册
            if (results.length !== 0) return res.json({ err_code: 1, msg: '此用户名已存在，请更换其它用户名' });
            // 为了提高安全性，在注册之前加密
            user.password = md5(user.password, config.pwdSalt);
            userModel.registerNewUser(user, (err, results) => {
                if (err) return res.json({ err_code: 1, msg: '注册失败' });
                if (results.affectedRows !== 1) return res.json({ err_code: 1, msg: '注册失败' });
                res.json({ err_code: 0 });
            })
        })
    },
    showLoginPage(req, res) { //展示登录页
        res.render('./user/login', {});
    },
    login(req, res) { //登录
        var loginUser = req.body;
        loginUser.password = md5(loginUser.password, config.pwdSalt);
        userModel.login(loginUser, (err, results) => {
            // 登录失败的情况
            if (err || results.length !== 1) return res.json({ err_code: 1, msg: "登录失败，请稍后载试" });
            // 在登录成功之前，保存登录状态到session中
            // console.log(req.session);
            req.session.islogin = true;
            req.session.user = results[0];
            // 登录ok
            res.json({ err_code: 0 })
        })
    },
    loginOut(req, res) { //注销登录
        // req.session.islogin = null;
        // req.session.user = null;
        req.session.destroy(() => {
            res.redirect('/');
        });
    }
}