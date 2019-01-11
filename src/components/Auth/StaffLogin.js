import React, { Component } from "react";
import axios from "axios";
import InputMask from "react-input-mask";
import { connect } from 'react-redux';
import { updateUser } from '../../dux/reducer';
import { withRouter } from 'react-router-dom';
import { generatePin, formatPhoneNumber } from './../../Logic/logic_stephanie';


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

  async submitStaffInput() {
    let formattedNum = formatPhoneNumber(this.state.userPhoneNumber)
    if (formattedNum) {
      try {
        await axios.post("/auth/stafflogin", {
          userPhoneNumber: formattedNum,
          userPin: generatePin()
        });
        this.props.history.push("/validate");
      } catch {
        this.setState({
          errMsg:
            "We can't find that number in our system. Please contact your school administrator to add you to the Protocol staff list."
        });
      }
      this.props.updateUser({ userPhoneNumber: formattedNum })
    } else {
      this.setState({
        errMsg: "Please enter a valid phone number."
      })
    }
  }

  handleKeyPress(e) {
    if (e === 'Enter') {
      this.submitStaffInput()
    }
  }

  render() {
    return (
      <div className="staff-login">
        <InputMask
          className='phone-input'
          mask="+1 (999) 999-9999"
          maskChar={null}
          placeholder="Phone Number"
          onChange={e => this.handleStaffInput(e.target.value)}
          onKeyPress={(e) => this.handleKeyPress(e.key)}
        />
        <div className='toggle-group'>
          <p
            className='signup-text'>We will use your phone number to determine the organization you are affiliated with and send you a text message with a pin number.</p>
        </div>
        <br />
        <button
          className='login-button'
          onClick={() => this.submitStaffInput()}
        >Send me a pin</button>
        <p style={{ color: "red", fontSize: "0.7em" }}>{this.state.errMsg}</p>
      </div>
    );
  }
}

const mapDispatchToProps = {
  updateUser
}

export default withRouter(connect(null, mapDispatchToProps)(StaffLogin));