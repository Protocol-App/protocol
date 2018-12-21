import React, { Component } from 'react';
import axios from 'axios'

class AdminLogin extends Component {
  constructor(){
    super();
    this.state={
      adminEmail: '',
      password: '',
    }

    this.login=this.login.bind(this)
    
  }
  componentDidMount(){
    this.firstInput.focus();
  }

  // login(){
  //   const {adminEmail, password}=this.state
  //   if (adminEmail && password){
  //     axios.post('/auth/adminlogin',{adminEmail: adminEmail,password: password}).then(res=>{
  //       console.log(res.data)
  //       if (res.data.length !==0){
  //         this.props.history.push('./dashboard')
  //       }else {alert('Please provide correct email and password')}
  //     })
  //   }
  // }
  login() {
    const { adminEmail, password } = this.state
    if (adminEmail && password) {
      console.log(adminEmail,password)
        axios.post('/auth/adminlogin', { adminEmail: adminEmail, password: password }).then(res => {
            console.log(res.data)
            if (res.data) {
                this.props.history.push('/dashboard')
            } else {
                alert('Wrong')
            }
        }).catch()
    } else {
        alert('Please fill in both fields')
    }
}
  
  
  render() {
    console.log()
    return (
      <div>
        Admin Login
        <div>
          <input onChange={(e)=> this.setState({adminEmail: e.target.value})} placeholder='Email' ref={(input)=>{
            this.firstInput=input;
          }}/>
          <input onChange={(e)=> this.setState({password: e.target.value})} placeholder='Password'/>
        </div>
        <div>
          <button onClick={()=>this.login()}>Login</button>
          
        </div>
      </div>
    );
  }
}

export default AdminLogin;
