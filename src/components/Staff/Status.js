import React, { Component } from 'react';
import axios from 'axios';
import openSocket from 'socket.io-client';
import {connect} from 'react-redux';
const socket = openSocket('http://localhost:4000/');


class Status extends Component {
  async submitStatus (status) {
    let res = await axios.post('/api/status', {status})
    console.log(res.data)
    socket.emit('staff-update')
    console.log('socket emitted')
  }

  componentDidUpdate (prevProps) {
    console.log('status cdu running')
    if (prevProps.activeEmergency !== this.props.activeEmergency) {
      if (!this.props.activeEmergency) {
        this.props.history.push('/reportemergency')
      }
    }
  }

  render() {
    return (
      <div>
        <h1>What is your status?</h1>
        <button onClick={() => this.submitStatus('problem')}>Problem</button>
        <button onClick={() => this.submitStatus('safe')}>Safe</button>
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