
import React from 'react'
import Result from './result/index'
import Search from './search/index'
import style from './index.css'



export default class Index extends React.Component {

  administratorLogin=()=>{
    window.router.push('/login')
  }

  render () {
    return (
      <div style={{paddingTop:'40px'}}>
        <Search />
        <p className={style.manage}><span onClick={this.administratorLogin} style={{cursor:'pointer'}}>管理员登录</span></p>
        <Result />
      </div>
    )
  }
}


