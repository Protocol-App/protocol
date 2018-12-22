import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { updateUser } from "../../dux/reducer";
import axios from "axios";

class StaffPinValidation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pinInput: "",
      errMsg: ""
    };
  }

  handlePinInput(value) {
    this.setState({
      pinInput: value,
      errMsg: ""
    });
  }

  validatePinInput(pin) {
    if (pin) {
      if (pin.length !== 4) {
        this.setState({
          errMsg: "Your pin must be 4 digits."
        });
        return null;
      } else {
        return pin;
      }
    } else {
      this.setState({
        errMsg: "Please enter your pin."
      });
      return null;
    }
  }

  async handlePinSubmit() {
    let validPin = this.validatePinInput(this.state.pinInput);
    try {
      if (this.props.user.userPhoneNumber && validPin) {
        let res = await axios.post("/auth/staffpin", {
          userPhoneNumber: this.props.user.userPhoneNumber,
          userPin: validPin
        });
        this.props.updateUser(res.data.user);
        this.props.history.push('/reportemergency')
      }
    } catch (err) {
      console.log(err);
      this.setState({
        errMsg: "Invalid pin."
      });
    }
  }

  render() {
    // console.log(this.state)
    // console.log(this.props)
    return (
      <div>
        <h3>Please enter your 4-digit pin here:</h3>
        <input
          onChange={e => this.handlePinInput(e.target.value)}
          placeholder="PIN"
        />
        <button onClick={() => this.handlePinSubmit()}>Submit</button>
        <p style={{ color: "red", fontSize: "0.7em" }}>
          {this.state.errMsg ? this.state.errMsg : null}
        </p>
        <p>Do not refresh this page.</p>
        Not working?
        <Link to="/login/staff">
          <button>Re-enter your phone number</button>
        </Link>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { user } = state;
  return {
    user
  };
}

export default connect(
  mapStateToProps,
  { updateUser }
)(StaffPinValidation);
