// eslint-disable-next-line no-undef
const { Sequelize, DataTypes } = require("sequelize");



// 从环境变量中读取数据库配置
// eslint-disable-next-line no-undef
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
    defaultValue: DataTypes.UUIDV4,
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
  },
  inviteCount: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  }

});

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
  }
});


//定义用户排行榜数据模型
const UserRank = sequelize.define("UserRank", {
  userID: {
    type: DataTypes.UUID
  },
  rank: {
    type: DataTypes.INTEGER,
  },
  score: {
    type: DataTypes.INTEGER,
  },
  survivalTime: {
    type: DataTypes.INTEGER,
  },
  //击杀数
  killCount: {
    type: DataTypes.INTEGER,
  },
  //累积伤害
  damageCount: {
    type: DataTypes.BIGINT,
  },
  nickname: {
    type: DataTypes.STRING,
  },
  avatar: {
    type: DataTypes.STRING,
  }
});

//定义物品数据模型
const Item = sequelize.define("Item", {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  userID: {
    type: DataTypes.UUID
  },
  code: {
    type: DataTypes.INTEGER,
  },
  eqAttrKey: {
    type: DataTypes.STRING,
  },
  eq_attr: {
    type: DataTypes.JSON,
  },
  name: {
    type: DataTypes.STRING,
  },
  type: {
    type: DataTypes.STRING,
  },
  description: {
    type: DataTypes.STRING,
  },
  price: {
    type: DataTypes.INTEGER,
  },
  picURL: {
    type: DataTypes.STRING,
  },
  subType: {
    type: DataTypes.STRING,
  },
  level: {
    type: DataTypes.INTEGER,
  },
  status: {
    type: DataTypes.STRING,
  },
  isPileUp: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  isAttack: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },

  quantity: {
    type: DataTypes.INTEGER,
  },
  quality: {
    type: DataTypes.INTEGER,
  },
  bullet: {
    type: DataTypes.STRING,
  },

}
);


// 定义用户天赋数据模型
const UserTalent = sequelize.define("UserTalent", {
  userID: {
    type: DataTypes.UUID
  },
  HP: {
    type: DataTypes.INTEGER,
  },
  attack: {
    type: DataTypes.INTEGER,
  },
  hurtLessen: {
    type: DataTypes.INTEGER,
  },
  addHP: {
    type: DataTypes.INTEGER,
  },
  curLevel:{
    type: DataTypes.STRING
  },
  keyLevel: {
    type: DataTypes.INTEGER
  },
  pickUpRange: {
    type: DataTypes.FLOAT
  },
  recoverHP: {
    type: DataTypes.FLOAT
  },
  moneyAdd: {
    type: DataTypes.FLOAT
  },
  critical: {
    type: DataTypes.FLOAT
  },
  experienceAdd: {
    type: DataTypes.FLOAT
  },
  criticalHurt: {
    type: DataTypes.FLOAT
  },
  levelUpRecoverHP: {
    type: DataTypes.FLOAT
  },
  dropAdd: {
    type: DataTypes.FLOAT
  },
  skillAttack: {
    type: DataTypes.FLOAT
  },
  moveSpeed: {
    type: DataTypes.FLOAT
  },
  attackSpeed: {
    type: DataTypes.FLOAT
  },
  attackInterval: {
    type: DataTypes.FLOAT
  },
  eqsBasicsAdd: {
    type: DataTypes.FLOAT
  },
  bulletSpeed: {
    type: DataTypes.FLOAT
  },
  bulletScale: {
    type: DataTypes.FLOAT
  }
});




// 数据库初始化方法
async function init() {
  await Counter.sync({ alter: true });
  await User.sync({ alter: true });
  await UserShopConf.sync({ alter: true });
  await UserRank.sync({ alter: true });
  await Item.sync({ alter: true });
  await UserTalent.sync({ alter: true });
}

// 导出初始化方法和模型
// eslint-disable-next-line no-undef
module.exports = {
  init,
  Counter,
  User,
  UserShopConf,
  UserRank,
  Item,
  UserTalent
};
