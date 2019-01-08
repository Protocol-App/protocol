import React, { Component } from 'react';
import { connect } from 'react-redux';
import openSocket from 'socket.io-client';
import axios from 'axios';
import {updateEmergency} from './../../dux/reducer';
const socket = openSocket('http://localhost:4000/');

class ConfirmEmergency extends Component {
  
  async sendEmergency() {
    const { emergencyName } = this.props.emergency
    const { userID, schoolID } = this.props.user
    const swiped = true
    let res = await axios.post('/api/confirmemergency', { emergencyName, userID, schoolID, swiped })
    //sometimes, this socket.emit doesn't run. That causes no props to change and no component did update, so no redirect. Why doesn't it run? Backend not listening?
    socket.emit('emergency', res.data)
  }


  componentDidUpdate (prevProps) {
    if (prevProps.activeEmergency !== this.props.activeEmergency) {
      if (this.props.activeEmergency) {
        this.props.history.push('/protocol')
      }
    }
  }

  cancelEmergency () {
    this.props.updateEmergency({})
    this.props.history.push('/reportemergency')
  }

  render() {
    console.log(this.props.emergency)
    return (
      <div>
          <h3>Are you sure?</h3>
        <button onClick={() => this.sendEmergency()}>Swipe to alarm</button>
        <br></br>
       <button onClick={() => this.cancelEmergency()}>Cancel</button>
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

export default connect(mapStateToProps, {updateEmergency})(ConfirmEmergency);