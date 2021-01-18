var Credential = require('../model').Credential

exports.getCredential = (where) => {
  return Credential.findOne({
    where: where
  })
}
