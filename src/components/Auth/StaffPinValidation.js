import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { updateUser } from "../../dux/reducer";
import axios from "axios";
import BackArrow from '../../assets/back-arrow.svg';

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

  handleKeyPress(e) {
    if (e === 'Enter') {
      this.handlePinSubmit()
    }
  }

  render() {
    return (
      <div className="pinValidation">
        <Link to="/">
          <img className='back-arrow' src={BackArrow} alt="Protocol Logo" />
        </Link>
        <br />
        <h1
          className='verify-title'
        >Verify</h1>

        <h3
          className='regular-text'
        >Enter the 4-digit PIN number that has been texted to your phone number</h3>
        <input
          className='pin-input'
          onChange={e => this.handlePinInput(e.target.value)}
          placeholder="PIN"
          onKeyPress={(e) => this.handleKeyPress(e.key)}
        />
        <br />
        <button
          className='login-button' onClick={() => this.handlePinSubmit()}>Submit</button>
        <p style={{ color: "red", fontSize: "0.7em" }}>
          {this.state.errMsg ? this.state.errMsg : null}
        </p>
        <Link
          className='no-pin-link'
          to="/">
          Didn't recieve a PIN?
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
