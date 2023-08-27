
const { User } = require("../../db.js");

const express = require("express");

let router = express.Router();



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


router.post('/addUser', async (req, res) => {
    console.log('addUser', req.body)
    let ret = await User.create(req.body)
    console.log(ret, 'addUser')
    res.send(ret)
});

module.exports = {
    router
};