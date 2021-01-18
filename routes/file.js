const path = require('path')
const fs = require('fs')
const nodeXlsx = require('node-xlsx')
const { createCredentialList, getCredentialAll, deleteCredentialAll, getContrastAll, deleteContrastAll, createContrastList } = require('../dal/files')
const { EN2CN, jsonSuccess, jsonError } = require('../utils/tool')

// const sourcePath = 'C:\\Users\\Administrator\\Desktop\\demo.xlsx'

exports.upload = async (req, res) => {
  const sourcePath = path.join(__dirname, '..', req.file.path)
  if (!req.body.id) {
    fs.unlinkSync(sourcePath)
    return res.json(jsonError('请先登录'))
  }
  const contrastAll = await getContrastAll()
  if (!contrastAll || !contrastAll.length) return res.json(jsonError('请先上传编号关系表'))
  const objList = []
  try {
    const contrast = {}
    for (const value of contrastAll) {
      contrast[value.credentialName] = {
        number: value.credentialNumber,
        count: 0
      }
    }
    const excel = nodeXlsx.parse(sourcePath)
    if (!excel || !excel.length) throw new Error()
    const keys = excel[0].data[0].map(v => EN2CN[v])
    for (const { data } of excel) {
      if (!data || !data.length) continue
      for (let i = 1; i < data.length; i++) {
        if (!data[i].length) continue
        const param = {}
        let testName
        for (let j = 0; j <= keys.length; j++) {
          if (keys[j] === 'credentialNumber') continue
          if (keys[j] === 'testName') testName = data[i][j]
          if (j === keys.length) {
            const newCount = String(++contrast[testName].count)
            const newNumber = ('0000000' + newCount).substr(-7)
            param.credentialNumber = contrast[testName].number + '-' + newNumber
          } else {
            param[keys[j]] = data[i][j]
          }
        }
        objList.push(param)
      }
    }
  } catch (error) {
    fs.unlinkSync(sourcePath)
    return res.json(jsonError('解析excel数据错误'))
  }
  await deleteCredentialAll()
  const result = await createCredentialList(objList)
  result ? res.json(jsonSuccess()) : res.json(jsonError('数据添加到数据库失败，原数据一杯删除，请检查数据是否正确，重新上传'))
  fs.unlinkSync(sourcePath)
}

exports.download = async (req, res) => {
  if (!req.query.id) {
    return res.json(jsonError('请先登录'))
  }
  const result = await getCredentialAll()
  let buffer
  try {
    const data = [Object.keys(result[0].dataValues).map(v => EN2CN[v])]
    for (const { dataValues: value } of result) {
      data.push(Object.values(value))
    }
    buffer = nodeXlsx.build([{ name: 'sheet1', data }])
  } catch (error) {
    return res.json(jsonError(error))
  }

  fs.writeFile(path.join(__dirname, '..', 'public', 'credential.xlsx'), buffer, (err) => {
    if (err) {
      console.log('Write failed: ' + err)
      res.json(jsonError(err))
      return
    }
    res.json(jsonSuccess('credential.xlsx'))
  })
}

exports.uploadContrast = async (req, res) => {
  const sourcePath = path.join(__dirname, '..', req.file.path)
  if (!req.body.id) {
    fs.unlinkSync(sourcePath)
    return res.json(jsonError('请先登录'))
  }
  const objList = []
  try {
    const excel = nodeXlsx.parse(sourcePath)
    if (excel && excel.length) {
      const keys = excel[0].data[0].map(v => EN2CN[v])
      for (const { data } of excel) {
        if (!data || !data.length) continue
        for (let i = 1; i < data.length; i++) {
          if (!data[i].length) continue
          const param = {}
          for (let j = 0; j < keys.length; j++) {
            param[keys[j]] = data[i][j]
          }
          objList.push(param)
        }
      }
    }
  } catch (error) {
    fs.unlinkSync(sourcePath)
    return res.json(jsonError(error))
  }

  await deleteContrastAll()
  const result = await createContrastList(objList)
  result ? res.json(jsonSuccess()) : res.json(jsonError('规则数据添加到数据库失败，原规则已被删除，请检查数据是否正确后，重新上传'))
  fs.unlinkSync(sourcePath)
}
