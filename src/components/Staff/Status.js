import React, { Component } from 'react';
import axios from 'axios';
import openSocket from 'socket.io-client';
import { connect } from 'react-redux';
import {updateStatus} from './../../dux/reducer';
import icon from '../../assets/progress-icons/progress-icon-4.png';
const socket = openSocket('http://localhost:4000/');

//STYLING NOTES: status string lives in props after submitStatus(), so we can use that to make button have a sepcial border if the uses comes back from chat app to know which one is currently active

class Status extends Component {
  
 submitStatus (status) {
    axios.post('/api/status', {status})
    this.props.updateStatus(status)
    socket.emit('staff-update')
    this.props.history.push('/chat')
  }

  componentDidUpdate (prevProps) {
    if (prevProps.activeEmergency !== this.props.activeEmergency) {
      if (!this.props.activeEmergency) {
        this.props.history.push('/reportemergency')
      }
    }
  }

  render() {
    return (
      <div className='status-page'>
      <div
        className='dark-background'>
        <div className='neon-banner'>
          
          <h1
          className='alarm-text'
          >ACTIVE EMERGENCY!</h1>
        </div>
        <img className='logo' src={icon} alt="Protocol Logo" />
        <h1
        className='light-title
        '>What is your status?</h1>
        <button
          className='problem-button'
          onClick={() => this.submitStatus('problem')}>Problem</button>
        <br/>
        <button
          className='safe-button'
          onClick={() => this.submitStatus('safe')}>
          Safe
          </button>
        {/* <p
        className='status-text'
        >Stay on this page for the duration of the emergency, once the admin has cleared the situation this screen will automatically return back to the homepage.</p> */}
      </div>
      </div>
    );
  }
}

function mapStateToProps (state) {
  let {activeEmergency} = state
  return {
    activeEmergency
  }
}

export default connect(mapStateToProps, {updateStatus})(Status);