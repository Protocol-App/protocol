import React, { Component } from 'react';
import { connect } from 'react-redux';
import {updateAdmin, updateUser, updateEmergency, updateSchoolEmergency, updateActiveEmergency} from '../../dux/reducer';
import axios from 'axios';
// import icon from '../../assets/progress-icons/progress-icon-1.png';

class ReportEmergency extends Component {

  async componentDidMount() {
    let res = await axios.get('/api/schoolemergency');
    if (res.data.activeEmergency) {
      this.props.updateActiveEmergency(true);
    }
  }

  handleClick(emergency) {
    this.props.updateEmergency(emergency)
    this.props.history.push('/confirmemergency')
  }
  
  logout() {
    axios.post("/auth/logout");
    this.props.updateAdmin({});
    this.props.updateUser({});
    this.props.updateEmergency({})
    this.props.updateSchoolEmergency({})
    this.props.updateActiveEmergency(false)
    this.props.history.push("/");
  }

  render() {
    return (
      <div className='report-emergency-page'>
      {this.props.activeEmergency ? this.props.history.push('/protocol') : <div
        className='dark-background'
      >
        <div>
          {/* <img className='logo' src={icon} alt="Protocol Logo" /> */}
          <h1
            className='light-title'
          >What is the situation?</h1>
          <div>
            <button
              className='emergency-button'
              onClick={() => this.handleClick({ emergencyName: "active_shooter" })}>Active Shooter</button>
            <button
              className='emergency-button'
              onClick={() => this.handleClick({ emergencyName: "bomb_threat" })}>Bomb Threat</button>
            <button
              className='emergency-button'
              onClick={() => this.handleClick({ emergencyName: "fire" })}>Fire</button>
            <button
              className='emergency-button'
              onClick={() => this.handleClick({ emergencyName: "other" })}>Other</button>
            <button
              className='logout-button' onClick={() => this.logout()}>Logout</button>
          </div>
        </div>
      </div> }</div>
      
    );
  }
}

function mapStateToProps(state) {
  const { activeEmergency } = state
  return {
    activeEmergency
  }
}

export default connect(mapStateToProps, {updateAdmin, updateUser, updateEmergency, updateSchoolEmergency, updateActiveEmergency})(ReportEmergency);