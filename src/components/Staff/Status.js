import React, { Component } from 'react';
import axios from 'axios';
import openSocket from 'socket.io-client';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import icon from '../../assets/progress-icons/progress-icon-4.png';
const socket = openSocket('http://localhost:4000/');


class Status extends Component {
  constructor () {
    super();

    this.state = {
      status: ""
    }
  }
  async submitStatus (status) {
    let res = await axios.post('/api/status', {status})
    console.log(res.data)
    //update users status to state
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
        {/* <img className='logo' src={icon} alt="Protocol Logo" /> */}
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
        <p
        className='status-text'
        >Stay on this page for the duration of the emergency, once the admin has cleared the situation this screen will automatically return back to the homepage.</p>
      <button><Link to='/chat'>Go To Chat</Link></button>
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

export default connect(mapStateToProps, {})(Status);