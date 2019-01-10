import React, { Component } from 'react';
import axios from 'axios';
import openSocket from 'socket.io-client';
import { connect } from 'react-redux';
<<<<<<< HEAD
import {updateStatus} from './../../dux/reducer';
import icon from '../../assets/progress-icons/progress-icon-4.png';
=======
import {Link} from 'react-router-dom';
import icon from '../../assets/step-2-status.svg';
import BackArrow from '../../assets/back-arrow.svg';
>>>>>>> 61f0e3f9e662414302529d46190fc4fc52ad5b93
const socket = openSocket('http://localhost:4000/');

//STYLING NOTES: status string lives in props after submitStatus(), so we can use that to make button have a sepcial border if the uses comes back from chat app to know which one is currently active

class Status extends Component {
<<<<<<< HEAD
  
 submitStatus (status) {
    axios.post('/api/status', {status})
    this.props.updateStatus(status)
=======
  constructor () {
    super();

    this.state = {
      protocolName: "",
      status: ""
    }
  }
  async submitStatus (status) {
    let res = await axios.post('/api/status', {status})
    console.log(res.data)
    //update users status to state
>>>>>>> 61f0e3f9e662414302529d46190fc4fc52ad5b93
    socket.emit('staff-update')
    this.props.history.push('/chat')
  }
  async componentDidMount() {
    let res = await axios.get("/api/emergencyprotocol");
    console.log(res.data)
    this.setState({
      protocolName: this.titleCase(res.data.protocolName.replace(/_/, " ")),
      protocolArray: res.data.protocolArray
    });
  }
  titleCase = str => {
    var splitStr = str.toUpperCase().split(" ");
    for (var i = 0; i < splitStr.length; i++) {
      splitStr[i] =
        splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }
    return splitStr.join(" ");
  };

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
        {/* <p
        className='status-text'
        >Stay on this page for the duration of the emergency, once the admin has cleared the situation this screen will automatically return back to the homepage.</p> */}
<<<<<<< HEAD
=======
      {/* <button><Link to='/chat'>Go To Chat</Link></button> */}
>>>>>>> 61f0e3f9e662414302529d46190fc4fc52ad5b93
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