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
          <label htmlFor="normal-switch">
            <Toggle
              className='toggle'
              onChange={this.handleChange}
              checked={this.state.checked}
              id="normal-switch"
            />
          </label>
          <h2 className='toggle-text'>Staff</h2>
        </div>
        <Link to='/login/admin'>Admin Login</Link>
        <Link to='/login/staff'>Staff Login</Link>
        <Link to="/signup">Sign up your school</Link>

        <Switch>
          <Route path='/login/admin' component={AdminLogin} />
          <Route path='/login/staff' component={StaffLogin} />
        </Switch>
      </div>
    );
  }
}

export default LoginDashboard;
