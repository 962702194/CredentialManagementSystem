import React from 'react'
import { Row, Col} from 'antd';
import PubSub from 'pubsub-js'
import { connect } from 'dva'

const name={
  fullName: '学员姓名',
  idCard:'身份证信息',
  userName: '用户名',
  phoneNumber: '手机号',
  testName: '考试名称',
  credentialNumber: '证书编号',
  testSchedule: '考试进度',
  issueState: '发放状态',
  issueDate: '发放日期',
  issueUrl: '发放地址'
}

 class Result extends React.Component {
  state={
    open:false,
    data:[],
    result:{}
  }

  componentWillReceiveProps =(np)=>{
    if(np.result !== this.props.result) {
      const data=Object.keys(np.result)   
      this.setState({data,result:np.result,open:true})   
    }
  }

  renderResult=(data,result)=>{
    return data.map((item,i)=>{
      if(item === 'id' || item ==='createdAt' || item ==='updatedAt') return
      if (item === 'issueUrl') {
        return (
          <div key={i} style={{textAlign:'left',marginBottom:'10px',fontSize:'20px',color:'#000',fontFamily:'auto',wordBreak:'break-all'}}><span style={{fontWeight:'bold'}}>{name[item]}</span>:&nbsp;&nbsp;<a href={result[item]} target='blank'>{result[item]}</a></div>
        )
      }
      else return (
      <div key={i} style={{textAlign:'left',marginBottom:'10px',fontSize:'20px',color:'#000',fontFamily:'auto',wordBreak:'break-all'}}><span style={{fontWeight:'bold'}}>{name[item]}</span>:&nbsp;&nbsp;{result[item]}</div>
      )
    })
  }

  render () {
    const {open, data,result}=this.state
    return (
      <div style={{paddingTop:'40px'}}>
        {
          open
          ? <Row style={{marginTop:'20px'}}>
          <Col span={12} >
            <div style={{border:'1px solid #A4D8EC',borderRadius:'3px',padding:'15px',width:'80%',margin:'auto'}}>              
            {this.renderResult(data,result)}
            </div>
          </Col>
          <Col span={12}>
            <img src={result['issueUrl']} alt="111"/>
          </Col>
        </Row>
        :
        null
        }         
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    result: state.result.result
  }
}

export default connect(mapStateToProps)(Result)
