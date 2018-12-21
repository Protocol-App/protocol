import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

class StaffLogin extends Component {
  constructor() {
    super();

    this.state = {
      userPhoneNumber: ""
    };
  }

  handleStaffInput(val) {
    this.setState({ userPhoneNumber: val });
  }

  generatePin() {
    let randomPin = Math.floor(1000 + Math.random() * 9000);
    return randomPin.toString();
  }
  async submitStaffInput() {
    await axios.post("/api/auth", {
      userPhoneNumber: this.state.userPhoneNumber,
      userPin: this.generatePin()
    });
    this.props.history.push("/validate");
  }

  render() {
    return (
      <div>
        Staff Login
        <input
          onChange={e => this.handleStaffInput(e.target.value)}
          placeholder="phone number"
        />
        {/* <Link to="/validate"> */}
        <button onClick={() => this.submitStaffInput()}>Send me my pin</button>
        {/* </Link> */}
      </div>
    );
  }
}

export default StaffLogin;
