var {getAdmin, updatePassword} = require('../dal/admin')
const {jsonSuccess, jsonError} = require('../utils/tool')

exports.login = async (req, res) => {
  var {account, password} = req.body
  var admin = await getAdmin({ account, password })
  admin ? res.json(jsonSuccess(admin.id)) : res.json(jsonError('账户或密码错误'))
}

exports.updateAdmin = async (req, res) => {
  var {account, password, newPassword} = req.body
  var admin = await getAdmin({ account, password })
  if (admin) {
    var result = await updatePassword({id: admin.id}, {password: newPassword})
    result ? res.json(jsonSuccess(admin.id)) : res.json(jsonError('修改失败'))
  } else {
    res.json(jsonError('修改失败，密码错误'))
  }
}

exports.test = async (req, res) => {
  res.json('测试通过')
}
