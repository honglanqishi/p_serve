const { Sequelize, DataTypes } = require("sequelize");

// 从环境变量中读取数据库配置
const { MYSQL_USERNAME, MYSQL_PASSWORD, MYSQL_ADDRESS = "" } = process.env;

const [host, port] = MYSQL_ADDRESS.split(":");

const sequelize = new Sequelize("nodejs_demo", MYSQL_USERNAME, MYSQL_PASSWORD, {
  host,
  port,
  dialect: "mysql" /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */,
});

// 定义数据模型
const Counter = sequelize.define("Counter", {
  count: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
  },
});

// 定义用户数据模型
const User = sequelize.define("User", {
  openID: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  userID: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4
  },
  currentRole: {
    type: DataTypes.STRING,
  },
  nickname: {
    type: DataTypes.STRING,
  },
  avatar: {
    type: DataTypes.STRING,
  },
  awardGetProgress: {
    type: DataTypes.STRING,
  },
  level: {
    type: DataTypes.INTEGER,
  },
  currentExp: {
    type: DataTypes.INTEGER,
  },
  stamina: {
    type: DataTypes.INTEGER,
  },
  maxStamina: {
    type: DataTypes.INTEGER,
  },
  money: {
    type: DataTypes.BIGINT,
  },
  diamond: {
    type: DataTypes.INTEGER,
  },
  signedInDate: {
    type: DataTypes.BIGINT,
  },
  signedInCount: {
    type: DataTypes.INTEGER,
  },
  lastStaminaRecoveryTime: {
    type: DataTypes.BIGINT,
  },
  empowermentTimer: {
    type: DataTypes.BIGINT,
  },
  stageProgress: {
    type: DataTypes.INTEGER,
  },
  curStageProgress: {
    type: DataTypes.INTEGER,
  },
  quickEMTimer: {
    type: DataTypes.BIGINT,
  },
  quickCount: {
    type: DataTypes.INTEGER,
  },
  quickADTimer: {
    type: DataTypes.BIGINT,
  },
  quickADCount: {
    type: DataTypes.INTEGER,
  },
  audioConf: {
    type: DataTypes.INTEGER,
  },
  shakeConf: {
    type: DataTypes.INTEGER,
  },
  challengeProgress: {
    type: DataTypes.JSON,
    allowNull: false,
    defaultValue: '[]'
  },
  lastLoginTime: {
    type: DataTypes.BIGINT,
  },
  mineChallengeCount: {
    type: DataTypes.INTEGER,
  },
  gemMineChallengeCount: {
    type: DataTypes.INTEGER,
  },
  endlessChallengeCount: {
    type: DataTypes.INTEGER,
  }

});

// 数据库初始化方法
async function init() {
  await Counter.sync({ alter: true });
  await User.sync({ alter: true });
}

// 导出初始化方法和模型
module.exports = {
  init,
  Counter,
  User,
};
