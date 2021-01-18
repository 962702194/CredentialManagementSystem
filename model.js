var Sequelize = require('sequelize')
var sequelize = new Sequelize({
  host: 'localhost',
  dialect: 'sqlite',
  pool: {
    max: 10,
    min: 0,
    idle: 20000,
    acquire: 20000
  },
  logging: function (sql) { },
  storage: `${__dirname}/database.db`
})

// 证书信息
var Credential = sequelize.define('credential', {
  fullName: {
    type: Sequelize.STRING,
    allowNull: true
  },
  idCard: {
    type: Sequelize.STRING,
    allowNull: true
  },
  userName: {
    type: Sequelize.STRING,
    allowNull: true
  },
  phoneNumber: {
    type: Sequelize.STRING,
    allowNull: true
  },
  testName: {
    type: Sequelize.STRING,
    allowNull: true
  },
  credentialNumber: {
    type: Sequelize.STRING,
    allowNull: true
  },
  testSchedule: {
    type: Sequelize.STRING,
    allowNull: true
  },
  issueState: {
    type: Sequelize.STRING,
    allowNull: true
  },
  issueDate: {
    type: Sequelize.STRING,
    allowNull: true
  },
  issueUrl: {
    type: Sequelize.STRING,
    allowNull: true
  }
}, {
  freezeTableName: true
})

var Contrast = sequelize.define('contrast', {
  credentialName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  credentialNumber: {
    type: Sequelize.STRING,
    allowNull: false
  }
}, {
  freezeTableName: true
})

var Admin = sequelize.define('admin', {
  account: {
    type: Sequelize.STRING,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  }
}, {
  freezeTableName: true
})

sequelize.sync()
  .then(() => Admin.destroy({
    where: {},
    truncate: true
  }))
  .then(() => Admin.create({
    account: 'admin',
    password: 'ehrchina+catarc'
  }))

exports.Credential = Credential
exports.Contrast = Contrast
exports.Admin = Admin
exports.sequelize = sequelize
