const {getCredential} = require('../dal/credential')
const {jsonSuccess, jsonError} = require('../utils/tool')

exports.queryInfo = async (req, res) => {
  const {fullName, idCard, credentialNumber} = req.body
  let param = {}
  if (fullName) param.fullName = fullName
  if (idCard) param.idCard = idCard
  if (credentialNumber) param.credentialNumber = credentialNumber
  var info = await getCredential(param)
  info ? res.json(jsonSuccess(info)) : res.json(jsonError('没有查询到相关信息'))
}
