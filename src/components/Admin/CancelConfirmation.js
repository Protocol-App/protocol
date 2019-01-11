import React, { Component } from "react";
import AdminHeader from "./AdminHeader";
import {connect} from 'react-redux';
import axios from 'axios';
import {Link} from 'react-router-dom';
import openSocket from 'socket.io-client'
const socket = openSocket('http://localhost:4000/');


class CancelConfirmation extends Component {
  async cancelEmergency() {
    try {
      await axios.post('/api/cancelemergency')
      socket.emit('cancelled-emergency')
      this.props.history.push('/dashboard')
    } catch {
      alert('Something went wrong. Please log in again')
      this.props.history.push('/')
    }
  }

  render() {
    return (
      <div>
        <AdminHeader />
        {this.props.activeEmergency ? (
          <div>
            <h1>Are you sure you want to cancel the current emergency?</h1>
            <button onClick={() => this.cancelEmergency()}>
              Cancel Emergency
            </button>
            <button><Link to='/dashboard'>Go Back</Link></button>
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
