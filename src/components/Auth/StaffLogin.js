import React, { Component } from "react";
import axios from "axios";

class StaffLogin extends Component {
  constructor() {
    super();

    this.state = {
      userPhoneNumber: "",
      errMsg: ""
    };
  }

  handleStaffInput(val) {
    this.setState({ 
      userPhoneNumber: val,
      errMsg: ""
     });
  }

  generatePin() {
    let randomPin = Math.floor(1000 + Math.random() * 9000);
    return randomPin.toString();
  }
  async submitStaffInput() {
    try {
      await axios.post("/auth/stafflogin", {
        userPhoneNumber: this.state.userPhoneNumber,
        userPin: this.generatePin()
      });
      this.props.history.push("/validate");
    } catch {
      this.setState({
        errMsg: "We can't find that number in our system. Please contact your school administrator to add you to their Protocol database."
      })
    }

  }

  render() {
    console.log(this.state)
    return (
      <div>
        Staff Login
        <input
          onChange={e => this.handleStaffInput(e.target.value)}
          placeholder="phone number"
        />
        <button onClick={() => this.submitStaffInput()}>Send me my pin</button>
       <p>{this.state.errMsg? this.state.errMsg : null}</p>
      </div>
    );
  }
}

export default StaffLogin;
