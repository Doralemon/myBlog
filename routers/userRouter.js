var express = require('express');
var router = express.Router();


router.get('/register', (req, res) => { //访问注册页面
    res.render('./user/register', {});
})
module.exports = router;