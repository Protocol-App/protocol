import React, { Component } from 'react';
import axios from 'axios';
import openSocket from 'socket.io-client';
import { connect } from 'react-redux';
import {updateStatus} from './../../dux/reducer';
// import icon from '../../assets/progress-icons/progress-icon-4.png';
import {Link} from 'react-router-dom';
import icon from '../../assets/step-2-status.svg';
import BackArrow from '../../assets/back-arrow.svg';
const socket = openSocket('http://206.189.65.223:4000/');

//STYLING NOTES: status string lives in props after submitStatus(), so we can use that to make button have a sepcial border if the uses comes back from chat app to know which one is currently active

class Status extends Component {
  constructor () {
    super();

    this.state = {
      protocolName: "",
      status: ""
    }
  }

  titleCase = str => {
    var splitStr = str.toUpperCase().split(" ");
    for (var i = 0; i < splitStr.length; i++) {
      splitStr[i] =
        splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }
    return splitStr.join(" ");
  };

 submitStatus (status) {
    axios.post('/api/status', {status})
    this.props.updateStatus(status)
    socket.emit('staff-update')
    this.props.history.push('/chat')
  }

  async componentDidMount() {
    let res = await axios.get("/api/emergencyprotocol");
    let activeProtocolName = this.titleCase(res.data.protocolName.replace(/_/, " "))
    this.setState({
      protocolName: activeProtocolName,
    });
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
        <Link to="/protocol">
          <img className='back-arrow' src={BackArrow} alt="Protocol Logo" />
        </Link>
          <h1
          className='alarm-text'
          >{this.state.protocolName} EMERGENCY</h1>
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