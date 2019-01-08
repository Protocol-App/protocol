import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import icon from '../../assets/progress-icons/progress-icon-3.png';

class Protocol extends Component {
  constructor() {
    super();

    this.state = {
      protocolName: "",
      protocolArray: []
    };
  }

  titleCase = str => {
    var splitStr = str.toLowerCase().split(" ");
    for (var i = 0; i < splitStr.length; i++) {
      splitStr[i] =
        splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }
    return splitStr.join(" ");
  };

  async componentDidMount() {
    let res = await axios.get("/api/emergencyprotocol");
    this.setState({
      protocolName: this.titleCase(res.data.protocolName.replace(/_/, " ")),
      protocolArray: res.data.protocolArray
    });
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
    this.props.history.push('/status')
  }

  render() {
    let protocolNum = 0;
    let protocolList = this.state.protocolArray.map(protocol => {
      if (protocol) {
        protocolNum++
        return (
          <div
          className="protocol-list"
          >
            {protocolNum}. {protocol}
          </div>
        );
      } else {
        return null
      }
    });
    return (
      <div
        className='dark-background'>
        <div className='neon-banner'>
          <h1
          className='alarm-text'
          >ACTIVE EMERGENCY!</h1>
        </div>
        <img className='logo' src={icon} alt="Protocol Logo" />
        {this.props.activeEmergency ? (
          <div>
            <h1
            className='light-title'
            >{this.state.protocolName} Protocols:</h1>
            {protocolList}
            {/* <button onClick={() => this.completeProtocol()}>Continue</button> */}
            <button
              className='logout-button' onClick={() => this.completeProtocol()}>Continue</button>
          </div>
        ) : (
          this.props.history.push("/reportemergency")
        )}
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
  {}
)(Protocol);
