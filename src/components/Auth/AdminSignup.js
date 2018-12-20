import React, { Component } from 'react';
import axios from 'axios'
import {connect} from 'react-redux'
import {updateSchool} from '../../dux/reducer';
import {updateAdmin} from '../../dux/reducer';

class AdminSignup extends Component {
  state={
    admin:{},
    school:{}
  }
  render() {
    return (
      <div>
        Admin Signup
      </div>
    );
  }
}
function mapStateToProps(state){
  return{
    admin: state.admin,
    school: state.school
  }
}
let mapDispatchToProps = {updateSchool, updateAdmin}
export default connect(mapStateToProps,mapDispatchToProps)(AdminSignup);