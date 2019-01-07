import React, { Component } from 'react';
import { connect } from 'react-redux';
import openSocket from 'socket.io-client';
import axios from 'axios';
import icon from '../../assets/progress-icons/progress-icon-2.png';
import BackArrow from '../../assets/back-arrow.svg';
import Toggle from "react-switch";
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

    this.state = { checked: false };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(checked) {
    this.setState({ checked });
  }

  countdown() {
    //settimeout to count down 5 seconds, display countdown on screen
    //if and after timeout is done, .post to server, send in emergencyName, userID and schoolID from redux

  }

  async sendEmergency() {
    const { emergencyName } = this.props.emergency
    const { userID, schoolID } = this.props.user
    const swiped = false
    let res = await axios.post('/api/confirmemergency', { emergencyName, userID, schoolID, swiped })
    socket.emit('emergency', res.data)
  }

  unlockSwipe() {
    var theRange = this.value;
    if (theRange == 100) {

      console.log('its working!');
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
    return (
      <div>
          <h3>Are you sure?</h3>
        <button onClick={() => this.sendEmergency()}>Swipe to alarm</button>
        <br></br>
       <button onClick={() => this.cancelEmergency()}>Cancel</button>
      </div>
    );
  }
//     } else {
//       document.init = setInterval(function () {
//         if (document.querySelector("input[type=\"range\"]").value != 0) {
//           document.querySelector("input[type=\"range\"]").value = theRange--;
//         }
//       }, 1);
//     }
//   }

//   document.querySelector("input[type=\"range\"]").onmousedown = function () {
//     clearInterval(document.init);
//   }

// function unlock() {
//   document.querySelector("input[type=\"range\"]").style.opacity = "0";
// }

render() {
  return (
    <div
      className='dark-background'>
      <img className='logo' src={icon} alt="Protocol Logo" />
      <input
        type="range"
        class="slideToUnlock"
        // value="0"
        max="100"
        // onMouseUp={()=> this.unlockSwipe}
      />
      {/* <label htmlFor="toggle-switch">
            <Toggle
              className='toggle'
              checked={this.state.checked}
              onChange={this.handleChange}
              onColor="#0088ff"
              offColor="#0088ff"
              onHandleColor="#ffffff"
              handleDiameter={50}
              uncheckedIcon={false}
              checkedIcon={false}
              // boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
              // activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
              height={24}
              width={200}
            id="toggle-switch"
            />
          </label> */}
      <button onClick={() => this.sendEmergency()}>Emit</button>
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