const { Sequelize, DataTypes } = require("sequelize");


//定义用户商店配置数据模型
const UserShopConf = sequelize.define("UserShopConf", {
    userID: {
        type: DataTypes.UUID
    },
    dailyShop: {
        type: DataTypes.STRING,
    },
    lastRefreshTime: {
        type: DataTypes.BIGINT,
    },

});



// 导出初始化方法和模型
module.exports = {
    UserShopConf
};