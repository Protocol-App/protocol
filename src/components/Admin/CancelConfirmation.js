import React, { Component } from "react";
import AdminHeader from "./AdminHeader";
import {connect} from 'react-redux';
import axios from 'axios';
import openSocket from 'socket.io-client'
const socket = openSocket('http://206.189.65.223:4000/');

class CancelConfirmation extends Component {
  async cancelEmergency() {
    await axios.post('/api/cancelemergency')
    socket.emit('cancelled-emergency')
    this.props.history.push('/dashboard')
  }

  render() {
    return (
      <div>
        <AdminHeader />
        {this.props.activeEmergency ? (
          <div>
            <h1>Cancel Emergency</h1>
            <button onClick={() => this.cancelEmergency()}>
              Cancel Emergency
            </button>
          </div>
        ) : (
          <div>There is no emergency to cancel.</div>
        )}
      </div>
    );
  }
}

function mapStateToProps (state) {
  const {activeEmergency} = state
  return {
    activeEmergency
  }
}

export default connect(mapStateToProps, {})(CancelConfirmation);
