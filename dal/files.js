var { Credential, Contrast, sequelize } = require('../model')

exports.getCredentialAll = () => {
  return Credential.findAll({
    attributes: { exclude: ['id', 'createdAt', 'updatedAt'] }
  })
}

exports.deleteCredentialAll = () => {
  return sequelize.transaction(function (t) {
    return Credential.destroy({
      where: {},
      truncate: true
    }, {
      transaction: t
    })
  })
}

exports.createCredentialList = (objList) => {
  // return Credential.bulkCreate(objList)
  return sequelize.transaction(function (t) {
    return Credential.bulkCreate(objList, { transaction: t }).catch(err => { return false })
  })
}

exports.getContrastAll = () => {
  return Contrast.findAll({
    attributes: { exclude: ['id', 'createdAt', 'updatedAt'] }
  })
}

exports.deleteContrastAll = () => {
  return sequelize.transaction(function (t) {
    return Contrast.destroy({
      where: {},
      truncate: true
    }, {
      transaction: t
    })
  })
}

exports.createContrastList = (objList) => {
  // return Credential.bulkCreate(objList)
  return sequelize.transaction(function (t) {
    return Contrast.bulkCreate(objList, { transaction: t }).catch(err => { return false })
  })
}
