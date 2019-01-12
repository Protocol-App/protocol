import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import icon from '../../assets/step-1-protocol.svg';
import {updateUser, updateAdmin, updateEmergency, updateSchoolEmergency, updateActiveEmergency} from './../../dux/reducer';
import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:4000/');



class Protocol extends Component {
  constructor() {
    super();

    this.state = {
      protocolName: "",
      protocolArray: []
    };
  }

  titleCase = str => {
    var splitStr = str.toUpperCase().split(" ");
    for (var i = 0; i < splitStr.length; i++) {
      splitStr[i] =
        splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }
    return splitStr.join(" ");
  };

  async componentDidMount() {
    try {
      let res = await axios.get("/api/emergencyprotocol");
      if (res.data.protocolName) {
        let activeProtocol = this.titleCase(res.data.protocolName.replace(/_/, " "))
        this.setState({
          protocolName: activeProtocol,
          protocolArray: res.data.protocolArray
        });
      } 
    } catch {
      this.props.history.push('/reportemergency')
    }
    }

  componentDidUpdate (prevProps) {
    if (prevProps.activeEmergency !== this.props.activeEmergency) {
      if (!this.props.activeEmergency) {
        this.props.history.push('/reportemergency')
      }
    }
  }

  async completeProtocol () {
    await axios.post('/api/completeprotocol')
    socket.emit('staff-update')
    this.props.history.push('/status')
  }

  logout() {
    axios.post("/auth/logout");
    this.props.updateAdmin({});
    this.props.updateUser({});
    this.props.updateEmergency({})
    this.props.updateSchoolEmergency({})
    this.props.updateActiveEmergency(false)
    this.props.history.push("/");
  }

  render() {
    let protocolNum = 0;
    let protocolList = this.state.protocolArray.map((protocol, index) => {
      if (protocol) {
        protocolNum++
        return (
          <div
          className="protocol-list" key={index}
          >
            {protocolNum}. {protocol}
          </div>
        );
      } else {
        return null
      }
    });
    return (
      <div className='protocol-page'>
      <div
        className='dark-background'>
        <div className='neon-banner'>
          <h1
          className='alarm-text'
          >{this.state.protocolName} EMERGENCY</h1>
        </div>
        <img className='logo' src={icon} alt="Protocol Logo" />
        {this.props.activeEmergency ? (
          <div>
            <h1
            className='light-title'
            > Complete The Following:</h1>
            {protocolList}
            <button
              className='logout-button' onClick={() => this.completeProtocol()}>Continue</button>
          </div>
        ) : (
          this.props.history.push("/reportemergency")
        )}
        {/* <button className='logout-button' onClick={() => this.logout()}>Logout</button> */}
      </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { activeEmergency } = state;
  return {
    activeEmergency
  };
}



export default connect(
  mapStateToProps,
  {updateUser, updateAdmin, updateEmergency, updateSchoolEmergency, updateActiveEmergency}
)(Protocol);
