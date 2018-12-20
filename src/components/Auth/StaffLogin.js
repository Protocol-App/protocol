import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class StaffLogin extends Component {
  constructor () {
    super ();

    this.state = {
      input: ""
    }

  }

handleStaffInput () {

}

submitStaffInput () {

}

  render() {
    return (
      <div>
        Staff Login
        <input onChange={() => this.handleStaffInput()} placeholder="phone number"/>
        <button onClick={() => this.submitStaffInput()}><Link to='/validate'>Send me my pin</Link></button>
      </div>
    );
  }
}

export default StaffLogin;