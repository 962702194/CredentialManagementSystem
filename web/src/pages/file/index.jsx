import React from 'react'
import { Upload, message, Button } from 'antd';
import style from '../index.css'
import { localhostApi } from '../../utils/api.json'
import PubSub from 'pubsub-js'
import { connect } from 'dva'

class File extends React.Component {
  
  backToIndex=()=>{
    window.router.push('/')
  }

  download=()=>{
    PubSub.publish('download',{
      id:this.props.userID,
      callback:(url)=>{
        window.open(localhostApi+'/'+url)
      }
    })
  }

  backToLogin=()=>{
    window.router.push('/login')
  }

  render () {
    const propsInfo = {
      name: 'file',
      action: localhostApi+'/upload',
      headers: {
        authorization: 'authorization-text',
      },
      data:{
        id:this.props.userID
      },
      showUploadList:false,
      accept:'.xlsx,.xls',
      onChange(info) {    
        if (info.file.status === 'done'&&info.file.response.status===1) {
          message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.response&&info.file.response.status===-1) { 
          info.file.status='error'
          return window.alert(info.file.response.msg)
        }
      }
    }
    const propsRegular = {
      name: 'file',
      action: localhostApi+'/uploadContrast',
      headers: {
        authorization: 'authorization-text',
      },
      data:{
        id:this.props.userID
      },
      showUploadList:false,
      accept:'.xlsx,.xls',
      onChange(info) {   
        if (info.file.status === 'done' && info.file.response.status===1) {
          message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.response&&info.file.response.status===-1) { 
          info.file.status='error'
          return window.alert(info.file.response.msg)
        }
      }
    }
    return (
      <div style={{width:'50%',margin:'auto', paddingTop:'40px'}}>
      <div style={{margin:'auto'}}>
        <Upload {...propsRegular}>
          <Button>
              上传规则
          </Button>
        </Upload>
      </div>
        <div style={{margin:'auto',marginTop:'20px'}}>
          <Upload {...propsInfo}>
            <Button>
                上传信息
            </Button>
          </Upload>
        </div>
        <div style={{margin:'auto',marginTop:'20px'}}>
          <Button onClick={this.download}> &nbsp;下 &nbsp;&nbsp;&nbsp; 载 &nbsp;</Button>           
        </div>

        <p className={style.manage}><span onClick={this.backToIndex} style={{cursor:'pointer'}}>返回首页</span></p>
        <p className={style.manage}><span onClick={this.backToLogin} style={{cursor:'pointer'}}>返回登录页</span></p>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    userID: state.download.userID
  }
}

export default connect(mapStateToProps)(File)