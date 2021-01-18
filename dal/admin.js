var Admin = require('../model').Admin

exports.getAdmin = (where) => {
  return Admin.findOne({
    where: where
  })
}

exports.updatePassword = (where, item) => {
  return Admin.update(item, { where: where })
}
