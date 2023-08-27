
// eslint-disable-next-line no-undef
const { User, UserShopConf, UserRank } = require("../../db.js");

// eslint-disable-next-line no-undef
const { v4: uuidv4 } = require("uuid")

// eslint-disable-next-line no-undef
const express = require("express");

let router = express.Router();

//初始化用户商店配置
var initUserShopConf = async (data) => {
    let ret = await UserShopConf.create({
        userID: data.userID,
        dailyShop: "[1,1,1,1,1,1]",
        lastRefreshTime: Date.now()
    })
    console.log(ret, 'initUserShopConf')
}

//初始化用户排行榜
var initUserRank = async (data) => {
    let ret = await UserRank.create({
        userID: data.userID,
        rank: 0,
        score: 0,
        survivalTime: 0,
        killCount: 0,
        damageCount: 0,
        nickname: data.nickname,
        avatar: data.avatar
    })
    console.log(ret, 'initUserRank')
}

var getUserRank = async (data) => {
    let ret = await UserRank.findOne({
        where: {
            userID: data.body.userID
        }
    })
    return ret
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

    req.body.userID = uuidv4()
    let ret = await User.create(req.body)
    console.log(ret, '创建成功，打印createUser')
    if (ret) {
        initUserShopConf(ret)
        initUserRank(ret)
    }
    res.send(ret)
});

router.post('/updateUserInfo', async (req, res) => {
    console.log('updateUserInfo', req.body)
    let ret = await User.update(req.body, {
        where: {
            userID: req.body.userID
        }
    })
    console.log(ret, '更新成功，打印updateUserInfo')
    res.send(ret)
})


//获取用户商店配置
router.post('/getUserShopConf', async (req, res) => {
    console.log('getUserShopConf', req.body)
    let ret = await UserShopConf.findOne({
        where: {
            userID: req.body.userID
        }
    })
    console.log(ret, '查询成功，打印getUserShopConf')
    res.send(ret)
})

//更新用户商店配置
router.post('/updateUserShopConf', async (req, res) => {
    console.log('updateUserShopConf', req.body)
    let ret = await UserShopConf.update(req.body, {
        where: {
            userID: req.body.userID
        }
    })
    console.log(ret, '更新成功，打印updateUserShopConf')
    res.send(ret)
})

//获取用户排行榜
router.post('/getUserRank', async (req, res) => {
    console.log('getUserRank', req.body)
    let ret = await getUserRank(req)
    console.log(ret, '查询成功，打印getUserRank')
    res.send(ret)
})

//更新用户排行榜
router.post('/updateUserRank', async (req, res) => {
    console.log('updateUserRank', req.body)

    //更新前先查询，是否需要更新排行榜
    let userRank = await getUserRank(req)
    let needUpdate = false
    if (req.body.survivalTime > userRank.survivalTime || req.body.killCount > userRank.killCount || req.body.damageCount > userRank.damageCount) {
        needUpdate = true
    }
    let ret = null
    if (needUpdate) {
        ret = await UserRank.update(req.body, {
            where: {
                userID: req.body.userID
            }
        })
    } else {
        ret = "no need update"
    }


    console.log(ret, '更新成功，打印updateUserRank')
    res.send(ret)
})


// eslint-disable-next-line no-undef
module.exports = {
    router
};