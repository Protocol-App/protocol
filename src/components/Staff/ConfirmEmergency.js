import React, { Component } from 'react';
import { connect } from 'react-redux';
import openSocket from 'socket.io-client';
import axios from 'axios';
import icon from '../../assets/progress-icons/progress-icon-2.png';
import { updateEmergency } from './../../dux/reducer';
const socket = openSocket('http://localhost:4000/');

class ConfirmEmergency extends Component {

  constructor() {
    super();
    this.state = {
      value: 0
    };
  }

  async sendEmergency() {
    try {
      const { emergencyName } = this.props.emergency
      const { userID, schoolID } = this.props.user
      const swiped = true
      await axios.post('/api/confirmemergency', { emergencyName, userID, schoolID, swiped })
      socket.emit('emergency')
    } catch {
      this.props.history.push('/')
    }
  }

  swipeMovement = (event) => {
    return this.setState({ value: event.target.value })
  }

  unlockSwipe = (event) => {
    if (event.target.value === "100") {
      this.sendEmergency()
      return this.setState({ value: 100 })
    } else { 
    return this.setState({ value: 0 })
  }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.activeEmergency !== this.props.activeEmergency) {
      if (this.props.activeEmergency) {
        this.props.history.push('/protocol')
      }
    }
  }

  cancelEmergency() {
    this.props.updateEmergency({})
    this.props.history.push('/reportemergency')
  }

  render() {
    return (
      <div className='confirm-emergency'>
      <div
        className='dark-background'>
        <img className='logo' src={icon} alt="Protocol Logo" />
        <h1
            className='light-title'
          >Are you sure?</h1>
        <input
          type="range"
          className="slideToUnlock"
          min="0" max="100"
          onMouseUp={this.unlockSwipe}
          value={this.state.value}
          onChange={this.swipeMovement}
        />
        {/* <button onClick={() => this.sendEmergency()}>Emit</button> */}
        <button
          className='cancel-button' onClick={() => this.cancelEmergency()}>Cancel</button>
        
      </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { emergency, user, activeEmergency } = state
  return {
    emergency,
    user,
    activeEmergency
  }
}

export default connect(mapStateToProps, { updateEmergency })(ConfirmEmergency);