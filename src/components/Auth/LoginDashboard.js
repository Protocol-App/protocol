import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import AdminLogin from './AdminLogin';
import StaffLogin from './StaffLogin';

class LoginDashboard extends Component {
    render() {
      return (
        <div>
          Login Dashboard
          <Link to='/login/admin'>Admin Login</Link>
          <Link to='/login/staff'>Staff Login</Link>
      <Switch>
          <Route path='/login/admin' component={AdminLogin}/>
          <Route path='/login/staff' component={StaffLogin}/>
      </Switch>
        </div>
      );
    }
  }
  
  export default LoginDashboard;

