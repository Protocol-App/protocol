import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { updateSchool, updateAdmin } from "../../dux/reducer";
import InputMask from "react-input-mask";
import Logo from '../../assets/protocol-logo.svg';
import { Link } from 'react-router-dom';



class AdminSignup extends Component {
  state = {
    schoolName: "",
    schoolCity: "",
    schoolState: "",
    adminFirst: "",
    adminLast: "",
    adminPhone: "",
    adminEmail: "",
    adminPassword: "",
    errMsg: ""
  };

  componentDidMount() {
    // this.firstInput.focus();
  }

  noEmptyInputsValidator() {
    if (
      !this.state.schoolName ||
      !this.state.schoolCity ||
      !this.state.schoolState ||
      !this.state.adminFirst ||
      !this.state.adminLast ||
      !this.state.adminPhone ||
      !this.state.adminEmail ||
      !this.state.adminPassword
    ) {
      return null;
    } else {
      return true;
    }
  }

  phoneNumberValidator(phoneNum) {
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
      return null;
    }
  }

  emailValidator(email) {
    if (email.includes("@") && email.includes(".")) {
      return true;
    } else {
      this.setState({
        errMsg: "Please enter a valid email address."
      });
      return null;
    }
  }

  async signup() {
    let filledInputsValidated = this.noEmptyInputsValidator();
    let validPhoneNumber = this.phoneNumberValidator(this.state.adminPhone);
    let validEmail = this.emailValidator(this.state.adminEmail);
    if (filledInputsValidated && validPhoneNumber && validEmail) {
      try {
        let res = await axios.post("/auth/signup", {
          schoolName: this.state.schoolName,
          schoolCity: this.state.schoolCity,
          schoolState: this.state.schoolState,
          adminFirst: this.state.adminFirst,
          adminLast: this.state.adminLast,
          adminPhone: validPhoneNumber,
          adminEmail: this.state.adminEmail,
          adminPassword: this.state.adminPassword
        });
        this.props.updateAdmin(res.data.admin);
        this.props.history.push('/dashboard')
      } catch (err) {
        console.log(err);
        this.setState({
          errMsg:
            "An account under that email already exists. Please log in instead."
        });
      }
    } else if (!filledInputsValidated) {
      this.setState({
        errMsg: "Please fill in all fields above."
      });
    }
  }

  handleInputChange = name => event => {
    this.setState({
      [name]: event.target.value,
      errMsg: ""
    });
  };

  handleKeyPress(event) {
    if (event === "Enter") {
      this.signup();
    }
  }

  render() {
    return (
      <div>
        <img className='logo' src={Logo} alt="Protocol Logo" />
        <h1 className='login-title'>Signup</h1>
        <br/>
        <h1
          className='login-link'
        >Already have an account? </h1>
        <Link
          className='login-link'
          to="/">Login</Link>
        <h2
          className='signup-title'
        >Welcome to Protocol! Let’s get started.</h2>
        <form>
          <input
            className='signup-input'
            type="text"
            placeholder="School Name"
            value={this.state.schoolName}
            onChange={this.handleInputChange("schoolName")}
            ref={input => {
              this.firstInput = input;
            }}
          />
          <input
            className='signup-input'
            type="text"
            placeholder="School City"
            value={this.state.schoolCity}
            onChange={this.handleInputChange("schoolCity")}
          />
          <input
            className='signup-input'
            type="text"
            placeholder="School State"
            value={this.state.schoolState}
            onChange={this.handleInputChange("schoolState")}
          />
          <input
            className='signup-input'
            type="text"
            placeholder="First Name"
            value={this.state.adminFirst}
            onChange={this.handleInputChange("adminFirst")}
          />
          <input
            className='signup-input'
            type="text"
            placeholder="Last Name"
            value={this.state.adminLast}
            onChange={this.handleInputChange("adminLast")}
          />
          <InputMask
            className='signup-input'
            mask="+1 (999) 999-9999"
            maskChar={null}
            placeholder="Phone Number"
            onChange={this.handleInputChange("adminPhone")}
          />
          <input
            className='signup-input'
            type="text"
            placeholder="Email"
            value={this.state.adminEmail}
            onChange={this.handleInputChange("adminEmail")}
          />
          <input
            className='signup-input'
            type="text"
            placeholder="Password"
            value={this.state.adminPassword}
            onChange={this.handleInputChange("adminPassword")}
            onKeyPress={e => this.handleKeyPress(e.key)}
          />
        </form>
        <p style={{ color: "red", fontSize: "0.7em" }}>{this.state.errMsg}</p>
        <button
          className='signup-button'
          onClick={() => this.signup()}>Signup</button>
      </div>
    );
  }
}

let mapDispatchToProps = { updateSchool, updateAdmin };

export default connect(null, mapDispatchToProps)(AdminSignup);
