exports.EN2CN = {
  fullName: '学员姓名',
  idCard: '身份信息',
  userName: '用户名',
  phoneNumber: '手机号',
  testName: '考试名称',
  credentialNumber: '证书编号',
  testSchedule: '考试进度',
  issueState: '发放状态',
  issueDate: '发放日期',
  issueUrl: '发放地址',

  学员姓名: 'fullName',
  身份信息: 'idCard',
  用户名: 'userName',
  手机号: 'phoneNumber',
  考试名称: 'testName',
  证书编号: 'credentialNumber',
  考试进度: 'testSchedule',
  发放状态: 'issueState',
  发放日期: 'issueDate',
  发放地址: 'issueUrl',

  credentialName: '证书名称',
  证书名称: 'credentialName'
}

exports.jsonSuccess = (data = '') => {
  return { data, status: 1, msg: '' }
}

exports.jsonError = (msg = '') => {
  return { data: '', status: -1, msg }
}
