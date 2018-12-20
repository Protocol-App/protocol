import React, { Component } from 'react';
import axios from 'axios'
import {connect} from 'react-redux'
import {updateSchool, updateAdmin} from '../../dux/reducer';

class AdminSignup extends Component {
  render() {
    return (
      <div>
        Admin Signup
      </div>
    );
  }
}
let mapDispatchToProps = {updateSchool, updateAdmin}
export default connect(mapDispatchToProps)(AdminSignup);