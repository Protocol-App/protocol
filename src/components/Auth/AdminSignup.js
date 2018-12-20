import React, { Component } from 'react';
// import axios from 'axios'
import { connect } from 'react-redux'
import { updateSchool } from '../../dux/reducer';
import { updateAdmin } from '../../dux/reducer';

// const emptyField = 'Please enter email and password.'

class AdminSignup extends Component {
  state = {
    schoolName: '',
    schoolCity: '',
    schoolState: '',
    adminFirst: '',
    adminLast: '',
    email: '',
    password: ''
  }
  
  componentDidMount() {
    this.firstInput.focus();
  }

  // async signup() {
  //   try {
  //     // console.log(this.state.props.user.userID)
  //     if (!this.state.schoolName ||
  //       !this.state.schoolCity ||
  //       !this.state.schoolState ||
  //       !this.state.adminFirst ||
  //       !this.state.adminLast ||
  //       !this.state.email ||
  //       !this.state.password
  //         ) return alert(emptyField)
  //     await axios.post('/auth/signup', {
  //       schoolName: this.state.schoolName,
  //       schoolCity: this.state.schoolCity,
  //       schoolState: this.state.schoolState,
  //       adminFirst: this.state.adminFirst,
  //       adminLast: this.state.adminLast,
  //       email: this.state.email,
  //       password: this.state.password
  //     })
  //   }
  //   catch (error) {
  //     // alert(error.response.request.response)
  //     console.log("This is broken")
  //   }
  // }

  updateSchoolName(e) {
    this.setState({ schoolName: e.target.value });
  }

  updateSchoolCity(e) {
    this.setState({ schoolCity: e.target.value });
  }

  updateSchoolState(e) {
    this.setState({ schoolState: e.target.value });
  }

  updateAdminFirst(e) {
    this.setState({ adminFirst: e.target.value });
  }

  updateAdminLast(e) {
    this.setState({ adminLast: e.target.value });
  }

  updateEmail(e) {
    this.setState({ email: e.target.value });
  }

  updatePassword(e) {
    this.setState({ password: e.target.value });
  }

  handleKeyPress(e) {
    if (e === 'Enter') {
      this.signup();
    }
  }



  render() {
    return (
      <div>
        Admin Signup
        <form className='signup-form'>
          <input
            className="signup-input"
            onChange={(e) => this.updateSchoolName(e)}
            type="text"
            placeholder="School Name"
            value={this.state.schoolName}
            ref={(input) => { this.firstInput = input; }}
          />
          <input
            className="signup-input"
            onChange={(e) => this.updateSchoolCity(e)}
            type="text"
            placeholder="School City"
            value={this.state.schoolCity}
          />
          <input
            className="signup-input"
            onChange={(e) => this.updateSchoolCity(e)}
            type="text"
            placeholder="School State"
            value={this.state.schoolState}
          />
          <input
            className="signup-input"
            onChange={(e) => this.updateAdminFirst(e)}
            type="text"
            placeholder="First Name"
            value={this.state.adminFirst}
          />
          <input
            className="signup-input"
            onChange={(e) => this.updateAdminLast(e)}
            type="text"
            placeholder="Last Name"
            value={this.state.adminLast}
          />
          <input
            className="signup-input"
            onChange={(e) => this.updateEmail(e)}
            type="text"
            placeholder="Email"
            value={this.state.email}
          />
          <input
            className="signup-input"
            onChange={(e) => this.updatePassword(e)}
            type="text"
            placeholder="Password"
            value={this.state.password}
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