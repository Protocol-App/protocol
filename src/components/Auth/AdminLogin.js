import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { updateAdmin } from "../../dux/reducer";
import { Link, Route, Switch } from 'react-router-dom';

class AdminLogin extends Component {
  constructor() {
    super();
    this.state = {
      adminEmail: "",
      adminPassword: "",
      errMsg: ""
    };

    this.login = this.login.bind(this);
  }

  componentDidMount() {
    // this.firstInput.focus();
  }

  login() {
    const { adminEmail, adminPassword } = this.state;
    if (adminEmail && adminPassword) {
      axios
        .post("/auth/adminlogin", {
          adminEmail: adminEmail,
          adminPassword: adminPassword
        })
        .then(res => {
          console.log(res.data);
          this.props.updateAdmin(res.data.admin);
          this.props.history.push("/dashboard");
        })
        .catch(err => {
          console.log(err);
          this.setState({
            errMsg: "Invalid email or password."
          })
        });
    } else {
      this.setState({
        errMsg: "Please fill in your email and password."
      })
    }
  }

  render() {
    return (
      <div>
        {/* Admin Login */}
        <div>
          <input
            className='email-input'
            onChange={e => this.setState({ adminEmail: e.target.value, errMsg: "" })}
            placeholder="Email"
            ref={input => {
              this.firstInput = input;
            }}
          />
          <br />
          <input
            className='password-input'
            onChange={e => this.setState({ adminPassword: e.target.value, errMsg: "" })}
            placeholder="Password"
          />
          <p style={{ color: "red", fontFamily: "Prompt", fontSize: "0.7em" }}>{this.state.errMsg}</p>
        </div>
        <div>
          <button
            className='login-button'
            onClick={() => this.login()}>Login</button>
        </div>
        <br/>
        <br/>
        <br/>
        <br/>
        <Link
          className='signup-link'
          to="/signup">Signup your Organization</Link>
      </div>
    );
  }
}

export default connect(null, { updateAdmin })(AdminLogin);
