
// eslint-disable-next-line no-undef
const { User, UserShopConf, UserRank, Item ,UserTalent} = require("../../db.js");

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
router.post('/updateUserRankConf', async (req, res) => {
    console.log('updateUserRankConf', req.body)

    //更新前先查询，是否需要更新排行榜
    let userRank = await getUserRank(req)
    let needUpdate = false
    let data3 = {
        nickname: req.body.nickname,
        avatar: req.body.avatar
    }
    if (req.body.survivalTime > userRank.survivalTime) {
        needUpdate = true
        data3.survivalTime = req.body.survivalTime
    }

    if (req.body.killCount > userRank.killCount) {
        needUpdate = true
        data3.killCount = req.body.killCount
    }

    if (req.body.damageCount > userRank.damageCount) {
        needUpdate = true
        data3.damageCount = req.body.damageCount
    }


    let ret = null
    if (needUpdate) {
        ret = await UserRank.update(data3, {
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

//新增物品
router.post('/addItem', async (req, res) => {
    console.log('addItem', req.body)
    let p = req.body.data
    let isAdd = req.body.isAdd
    //如果是叠加物品，先查询是否有同类型物品，有则叠加
    if (p.isPileUp) {
        let list = await getItemsByType(p.type, p.userID)
        console.log(list, '查询同类型物品，打印List')
        if (list.length > 0) {
            let item = list[0].dataValues

            if (isAdd) {
                item.quantity += p.quantity
            } else {
                item.quantity = p.quantity
            }
            let ret = await Item.update(item, {
                where: {
                    id: item.id,
                    userID: item.userID
                }
            })
            console.log(ret, '更新成功，打印addItem')
            res.send(ret)
            return
        }
    }

    let ret = await Item.create(p)
    console.log(ret, '新增成功，打印addItem')
    res.send(ret)
})

//根据type和用户ID获取物品,返回数组,内部调用
var getItemsByType = async (type, userID) => {
    let ret = await Item.findAll({
        where: {
            type: type,
            userID: userID
        }
    })
    return ret
}

//根据用户ID获取物品,返回数组
router.post('/getItemsByUserID', async (req, res) => {
    // console.log('getItemsByUserID', req.body)
    let ret = await Item.findAll({
        where: {
            userID: req.body.userID
        }
    })
    // console.log(ret, '查询成功，打印getItemsByUserID')
    res.send(ret)
})

//根据用户ID和物品ID更新物品数据
router.post('/updateItem', async (req, res) => {
    console.log('updateItem入参', req.body)
    let ret = await Item.update(req.body.data, {
        where: {
            id: req.body.data.id,
            userID: req.body.userID
        }
    })
    console.log(ret, '更新成功，打印updateItem')
    res.send(ret)
})



//根据类型删除用户物品
router.post('/deleteItemsByType', async (req, res) => {
    console.log('deleteItemsByType', req.body)
    let ret = await Item.destroy({
        where: {
            type: req.body.type,
            userID: req.body.userID
        }
    })
    console.log(ret, '删除成功，打印deleteItemsByType')
    res.send(ret)
})

//根据ID删除用户物品
router.post('/deleteItemsById', async (req, res) => {
    console.log('deleteItemsById', req.body)
    let ret = await Item.destroy({
        where: {
            id: req.body.id,
            userID: req.body.userID
        }
    })
    console.log(ret, '删除成功，打印deleteItemsById')
    if (ret >= 1) {
        res.send({
            code: 200,
            msg: `删除成功,${ret}条`
        })
    } else if (ret == 0) {
        res.send({
            code: 500,
            msg: "删除状态异常"
        })
    }

})


//批量新增物品
router.post('/addItems', async (req, res) => {
    console.log('addItems', req.body)
    let ret = await Item.bulkCreate(req.body)
    console.log(ret, '批量新增成功，打印addItems')
    res.send(ret)
})



//根据用户ID获取天赋数据
router.post('/getTalentByUserID', async (req, res) => {
    console.log('getTalentByUserID', req.body)
    let ret = await UserTalent.findOne({
        where: {
            userID: req.body.userID,
        }
    })
    console.log(ret, '查询成功，打印getTalentByUserID')
    res.send(ret)
})

//根据用户ID更新天赋数据
router.post('/setTalentDataByUserID', async (req, res) => {
    console.log('setTalentDataByUserID', req.body)
    let ret  = null
    let [item, created] = await UserTalent.findOrCreate({
        where: {
            userID: req.body.userID,
        },
        defaults: req.body
    })
    if (!created) {
        console.log('已存在，更新')
        ret = await item.update(req.body, {
            where: {
                userID: req.body.userID
            }
        })
    } else {    
        console.log('不存在，新增')
        ret = item
    }



    console.log(ret, '更新成功，打印setTalentDataByUserID')
    res.send(ret)
})






// eslint-disable-next-line no-undef
module.exports = {
    router
};