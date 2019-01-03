import React, { Component } from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import AdminLogin from './AdminLogin';
import StaffLogin from './StaffLogin';
import Logo from '../../assets/protocol-logo.svg';
import '../Auth/auth.css';
import Toggle from "react-switch";

class LoginDashboard extends Component {
  constructor() {
    super();
    this.state = { checked: false };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(checked) {
    this.setState({ checked });
  }
  render() {
    return (
      <div>
        <img className='logo' src={Logo} alt="Protocol Logo" />
        <h1 className='login-title'>Login</h1>
        <div className='toggle-group'>
          <h2 className='toggle-text'>Admin</h2>
          <label htmlFor="toggle-switch">
            <Toggle
              className='toggle'
              checked={this.state.checked}
              onChange={this.handleChange}
              onColor="#0088ff"
              offColor="#0088ff"
              onHandleColor="#ffffff"
              handleDiameter={20}
              uncheckedIcon={false}
              checkedIcon={false}
              // boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
              // activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
              height={24}
              width={45}
              id="toggle-switch"
            />
          </label>
          <h2 className='toggle-text' style={{marginRight: "16px"}}>Staff</h2>
        </div>

        {this.state.checked ? <StaffLogin /> : <AdminLogin />}

        {/* <Link to='/login/admin'>Admin Login</Link>
        <Link to='/login/staff'>Staff Login</Link> */}

        {/* <Switch>
          <Route exact path='/login/admin' component={AdminLogin} />
          <Route exact path='/login/staff' component={StaffLogin} />
        </Switch> */}
      </div>
    );
  }
}

export default LoginDashboard;
