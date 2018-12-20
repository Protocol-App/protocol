import React, { Component } from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import AdminLogin from './AdminLogin';
import StaffLogin from './StaffLogin';

class LoginDashboard extends Component {
    render() {
      return (
        <div>
          Login Dashboard
          <Link to='/login/admin'>Admin Login</Link>
          <Link to='/login/staff'>Staff Login</Link>
          <Link to="/signup">Sign up your school</Link>

          <Switch>
          <Route path='/login/admin' component={AdminLogin}/>
        <Route path='/login/staff' component={StaffLogin}/>
          </Switch>
        </div>
      );
    }
  }
  
  export default LoginDashboard;

