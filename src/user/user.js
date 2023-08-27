
const { User ,UserShopConf} = require("../../db.js");

const express = require("express");

let router = express.Router();

//初始化用户商店配置
var initUserShopConf = async (data) => {
    let ret = await UserShopConf.create({
        userID: data.data.userID,
        dailyShop: "[1,1,1,1,1,1]",
        lastRefreshTime: Date.now()
    })
    console.log(ret, 'initUserShopConf')
    res.send(ret)
}

router.post('/getUserInfo', async (req, res) => {
    console.log('getUserInfo请求参数openid', req.body.openID)
    let ret = await User.findOne({
        where: {
            openid: req.body.openID
        }
    })
    console.log(ret, '查询结果')
    if (!ret) {
        ret = "null"
    }
    res.send(ret)
});


router.post('/createUser', async (req, res) => {
    console.log('createUser', req.body)
    let ret = await User.create(req.body)
    console.log(ret, 'createUser')
    if (ret) {
        initUserShopConf(ret)
    }
    res.send(ret)
});



module.exports = {
    router
};