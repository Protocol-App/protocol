import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateEmergency, updateActiveEmergency } from '../../dux/reducer';
import axios from 'axios';
import icon from '../../assets/progress-icons/progress-icon-1.png';

class ReportEmergency extends Component {

  async componentDidMount() {
    console.log('reportemergency cdm running')
    let res = await axios.get('/api/staffemergency');
    console.log('axios call returned in cdm', res.data)
    if (res.data.activeEmergency) {
      this.props.updateActiveEmergency(true);
    }
  }

  //compare to adminlogin => defaultdashboard, see differences to try to debug
  //SOMETIMES THIS TAKES LIKE 10 SECONDS FOR AXIOS CALL TO RETURN, GET PROPS AND RERENDER - WHY IS DB CALL TAKING SO LONG?

  componentDidUpdate (prevProps) {
    if (prevProps.activeEmergency !== this.props.activeEmergency) {
      if (this.props.activeEmergency) {
        this.props.history.push('/protocol')
      }
    }
  }


  handleClick(emergency) {
    this.props.updateEmergency(emergency)
    this.props.history.push('/confirmemergency')
  }

  async logout() {
    await axios.post("/auth/logout");
    this.props.updateAdmin({});
    this.props.updateUser({});
    this.props.updateEmergency({})
    this.props.updateAllEmergencies([])
    this.props.updateActiveEmergency(false)
    this.props.history.push("/login");
  }

  render() {
    return (
      //if there's an active emergency at their school, automatically redirect to protocol page
      <div
        className='dark-background'
      >
        <div>
          <img className='logo' src={icon} alt="Protocol Logo" />
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
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { activeEmergency } = state
  return {
    activeEmergency
  }
}

export default connect(mapStateToProps, { updateEmergency, updateActiveEmergency })(ReportEmergency);