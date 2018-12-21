import React, { Component } from 'react';
import axios from 'axios'
import { connect } from 'react-redux'
import { updateSchool } from '../../dux/reducer';
import { updateAdmin } from '../../dux/reducer';

const emptyField = 'Please enter email and password.'


class AdminSignup extends Component {
  state = {
    schoolName: '',
    schoolCity: '',
    schoolState: '',
    adminFirst: '',
    adminLast: '',
    adminPhone: '',
    adminEmail: '',
    adminPassword: ''
  }
  
  componentDidMount() {
    this.firstInput.focus();
  }

  async signup() {
    try {
      if (!this.state.schoolName ||
        !this.state.schoolCity ||
        !this.state.schoolState ||
        !this.state.adminFirst ||
        !this.state.adminLast ||
        !this.state.adminPhone ||
        !this.state.adminEmail ||
        !this.state.adminPassword
          ) return alert(emptyField)
      await axios.post('/auth/signup', {
        schoolName: this.state.schoolName,
        schoolCity: this.state.schoolCity,
        schoolState: this.state.schoolState,
        adminFirst: this.state.adminFirst,
        adminLast: this.state.adminLast,
        adminPhone: this.state.adminPhone,
        adminEmail: this.state.adminEmail,
        adminPassword: this.state.adminPassword
      })
    }
    catch (error) {
      // alert(error.response.request.response)
      console.log("This is broken")
    }
  }

  handleInputChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  handleKeyPress(event) {
    if (event === 'Enter') {
      this.signup();
    }
  }



  render() {
    return (
      <div>
        Admin Signup
        <form>
          <input
            type="text"
            placeholder="School Name"
            value={this.state.schoolName}
            onChange={this.handleInputChange('schoolName')}
            ref={(input) => { this.firstInput = input; }}
          />
          <input
            type="text"
            placeholder="School City"
            value={this.state.schoolCity}
            onChange={this.handleInputChange('schoolCity')}
          />
          <input
            type="text"
            placeholder="School State"
            value={this.state.schoolState}
            onChange={this.handleInputChange('schoolState')}
          />
          <input
            type="text"
            placeholder="First Name"
            value={this.state.adminFirst}
            onChange={this.handleInputChange('adminFirst')}
          />
          <input
            type="text"
            placeholder="Last Name"
            value={this.state.adminLast}
            onChange={this.handleInputChange('adminLast')}
          />
          <input
            type="number"
            placeholder="Phone Number"
            value={this.state.adminPhone}
            onChange={this.handleInputChange('adminPhone')}
          />
          <input
            type="text"
            placeholder="Email"
            value={this.state.adminEmail}
            onChange={this.handleInputChange('adminEmail')}
          />
          <input
            type="text"
            placeholder="Password"
            value={this.state.adminPassword}
            onChange={this.handleInputChange('adminPassword')}
            onKeyPress={(e) => this.handleKeyPress(e.key)}
          />
        </form>
      </div >
    );
  }
}
// function mapStateToProps(state){
//   return{
//     admin: state.admin,
//     school: state.school
//   }
// }
let mapDispatchToProps = { updateSchool, updateAdmin }
export default connect(null, mapDispatchToProps)(AdminSignup);