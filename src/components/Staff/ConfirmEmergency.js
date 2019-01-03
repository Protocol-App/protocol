// Swipe button: onSwipe -
// axios.post to server to controller function, req.body: protocol string being passed via props, school id from redux state, user_id from redux state
//  Db.(find correct protocol sql command), select * from protocol where school_id = req.body.school_id and protocol_name = req.body.protocolString
// Return the protocol_id from that row
// Second sql function to .post to the emergency table
// Emergency_id serial primary key
// Protocol_id from prev db response
// Initialized_by_user_id from req.body user_id
// Swiped = true
// RETURN newly created emergency_id as response
// Third sql function to .put to school table
// Change emergency_id from null to int from emergency.emergency_id from prev response object
// link/redirect to Protocol.js on frontend after 200 status
// in redux: 
// user/admin session object (from login):
// school object (from login):
// admin bool (from login): true or false
// alert object:
// emergency object:
// protocol object:
// Cancel button make sure setTimeout gets cleared and won't run, link/redirect to ReportEmergency.js


// MAKE SURE settimeout gets canceled if user presses cancel button


import React, { Component } from 'react';
import {connect} from 'react-redux';
import openSocket from 'socket.io-client';
import axios from 'axios';
const socket = openSocket('http://localhost:4000/');

class ConfirmEmergency extends Component {
  constructor () {
    super();

    this.state = {

    }
  }
  

  countdown () {
    //settimeout to count down 5 seconds, display countdown on screen
    //if and after timeout is done, .post to server, send in emergencyName, userID and schoolID from redux

  }

async sendEmergency() {
    const {emergencyName} = this.props.emergency
    const {userID, schoolID} = this.props.user
    const swiped = false
    let res = await axios.post('/api/confirmemergency', {emergencyName, userID, schoolID, swiped})
    socket.emit('emergency', res.data)
  }
  render() {
    return (
      <div>
        Confirm Emergency
        <button onClick={() => this.sendEmergency()}>Emit</button>
      </div>
    );
  }
}

function mapStateToProps (state) {
  const {emergency, user} = state
  return {
    emergency,
    user
  }
}

export default connect(mapStateToProps, {})(ConfirmEmergency);