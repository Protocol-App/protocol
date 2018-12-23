import React, { Component } from "react";
import axios from "axios";
import InputMask from "react-input-mask";
import { connect } from 'react-redux';
import { updateUser } from '../../dux/reducer';

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

  formatPhoneNumber (phoneNum) {
    if (phoneNum) {
      var formatted = phoneNum.replace(/\D/g, "");
      if (formatted.length !== 11) {
        this.setState({
          errMsg: "Please enter in a valid phone number."
        });
        return null;
      } else {
        return `+${formatted}`;
      }
    } else {
      this.setState({
        errMsg: "Please enter a phone number."
      });
      return null;
    }
  }

  async submitStaffInput() {
    let formattedNum = this.formatPhoneNumber(this.state.userPhoneNumber)
    console.log(formattedNum)
    if (formattedNum) {
      try {
        await axios.post("/auth/stafflogin", {
          userPhoneNumber: formattedNum,
          userPin: this.generatePin()
        });
        this.props.history.push("/validate");
      } catch {
        this.setState({
          errMsg:
          "We can't find that number in our system. Please contact your school administrator to add you to the Protocol staff list."
        });
      }
      this.props.updateUser({userPhoneNumber: formattedNum})
    }
  }
  
  render() {
    console.log(this.state);
    return (
      <div>
        Staff Login
        <InputMask
          mask="+1 (999) 999-9999"
          maskChar={null}
          placeholder="Phone Number"
          onChange={e => this.handleStaffInput(e.target.value)}
          />
        <button onClick={() => this.submitStaffInput()}>Send me a pin</button>
        <p style={{color: "red", fontSize: "0.7em"}}>{this.state.errMsg}</p>
      </div>
    );
  }
}

const mapDispatchToProps = {
  updateUser
}

export default connect(null, mapDispatchToProps)(StaffLogin);