import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class StaffLogin extends Component {
  render() {
    return (
      <div>
        Staff Login
        <Link to='/validate'>Send me my pin</Link>
      </div>
    );
  }
}

export default StaffLogin;