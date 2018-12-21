import React, { Component } from 'react';

class AdminLogin extends Component {
  constructor(){
    super();
    this.state={
      
    }
    
  }
  componentDidMount(){
    this.firstInput.focus();
  }
  
  
  render() {
    return (
      <div>
        Admin Login
        <div>
          <input placeholder='Username' ref={(input)=>{
            this.firstInput=input;
          }}/>
          <input placeholder='Password'/>
        </div>
      </div>
    );
  }
}

export default AdminLogin;
