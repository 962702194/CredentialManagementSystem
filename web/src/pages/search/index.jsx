import React from 'react'
import PubSub from 'pubsub-js'
import style from '../index.css'

export default class Search extends React.Component {
  state={
    credentialNumber: '',
    idCard: '',
    fullName: '',
    verify:'',    
    showNum:[]
  }

  componentDidMount=()=>{
    this.draw(this.state.showNum)
  }

  handleChange=(prop, e) => {
    this.setState({ [prop]: e.target.value })
  }

  queryCertification=()=>{
    const showNum = this.state.showNum.join('')
    const value=this.state.verify.toLowerCase()
    if (showNum==='') return window.alert('请输入验证码！')
    else if(showNum===value){
      let num=0,param={}
      const state={credentialNumber:this.state.credentialNumber,idCard:this.state.idCard,fullName:this.state.fullName}
      for(let [key,value] of Object.entries(state)){
        if (value !== '') {
          num++
          param[key]=value
        }
      }
      if(num<2)  return window.alert("请至少输入" + 2 + "个查询条件！")	
      else PubSub.publish('queryInfo',{param})
    }else {
      window.alert('验证码错误！请重新输入！')
      this.setState({value:''})
    }    	
  }

  draw=(showNum)=>{
    let canvas_width=document.getElementById("canvas").width
    let canvas_height=document.getElementById("canvas").height
    let canvas = document.getElementById("canvas");//获取到canvas的对象，演员
    let context = canvas.getContext("2d");//获取到canvas画图的环境，演员表演的舞台
    canvas.width = canvas_width;
    canvas.height = canvas_height;
    // canvas.width = document.getElementById("canvas").width
    // canvas.height = document.getElementById("canvas").height
    let sCode = "a,b,c,d,e,f,g,h,i,j,k,m,n,p,q,r,s,t,u,v,w,x,y,z,A,B,C,E,F,G,H,J,K,L,M,N,P,Q,R,S,T,W,X,Y,Z,1,2,3,4,5,6,7,8,9,0";
    let aCode = sCode.split(",");
    let aLength = aCode.length;//获取到数组的长度
    for (let i = 0; i < 4; i++) { //这里的for循环可以控制验证码位数（如果想显示6位数，4改成6即可）
    let j = Math.floor(Math.random() * aLength);//获取到随机的索引值
    // let deg = Math.random() * 30 * Math.PI / 180;//产生0~30之间的随机弧度
    let deg = Math.random() - 0.5; //产生一个随机弧度
    let txt = aCode[j];//得到随机的一个内容
    showNum[i] = txt.toLowerCase();
    let x = 10 + i * 20;//文字在canvas上的x坐标
    let y = 20 + Math.random() * 8;//文字在canvas上的y坐标
    context.font = "bold 23px 微软雅黑";
    context.translate(x, y);
    context.rotate(deg);
    context.fillStyle = this.randomColor();
    context.fillText(txt, 0, 0);
    context.rotate(-deg);
    context.translate(-x, -y);
    }
    for (let i = 0; i <= 5; i++) { //验证码上显示线条
    context.strokeStyle = this.randomColor();
    context.beginPath();
    context.moveTo(Math.random() * canvas_width, Math.random() * canvas_height);
    context.lineTo(Math.random() * canvas_width, Math.random() * canvas_height);
    context.stroke();
    }
    for (let i = 0; i <= 30; i++) { //验证码上显示小点
    context.strokeStyle = this.randomColor();
    context.beginPath();
    let x = Math.random() * canvas_width;
    let y = Math.random() * canvas_height;
    context.moveTo(x, y);
    context.lineTo(x + 1, y + 1);
    context.stroke();
    }
  }

  randomColor=()=> {
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);
    return "rgb(" + r + "," + g + "," + b + ")";
   }

  handleCanvas=()=>{
    this.draw(this.state.showNum)
  }

  render () {
    const { credentialNumber, idCard, fullName,verify } = this.state
    return (
      <div>
        {/* 查询的 */}
        <div  className={style.border}>
          <p style={{ marginBottom: '10px' }}>
            <span className={style.label}>证件号码：</span>
            <input className={style.input} type='text' value={idCard} onChange={this.handleChange.bind(this, 'idCard')} />
            </p>
          <p style={{ marginBottom: '10px' }}>
            <span className={style.label}>证书编号：</span>
            <input className={style.input} type='text' value={credentialNumber} onChange={this.handleChange.bind(this, 'credentialNumber')}  />
            </p>
          <p style={{ marginBottom: '10px' }}>
            <span  className={style.label}>姓　　名：</span>
            <input className={style.input} type='text'value={fullName} onChange={this.handleChange.bind(this, 'fullName')}/>
          </p>
          <p style={{ marginBottom: '10px' }}>
            <span className={style.label}>验   证   码：</span>
            <input className={style.input} style={{width:'50%'}} type='text' value={verify} onChange={this.handleChange.bind(this, 'verify')}/>
            <span style={{width:'20%',display:'inline-block',textAlign:'left'}}><canvas id='canvas' width='100' height='30' onClick={this.handleCanvas}></canvas></span>            
          </p>
          <p className={style.remark}>
            <span className={style.label} style={{ color: 'transparent' }}> 　　  </span>
            <span style={{ width: '70%' }}>注：以上三项输入任意两项即可查询。</span>
            </p>
          <p className={style.remark}>
            <span className={style.label} style={{ color: 'transparent'}}> 　　  </span>
            <button className={style.button} onClick={this.queryCertification}>查询</button>
            </p>
        </div>
      </div>
    )
  }
}
