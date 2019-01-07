import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";

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
          <div>
            {protocolNum}. {protocol}
          </div>
        );
      } else {
        return null
      }
    });
    return (
      <div>
        {this.props.activeEmergency ? (
          <div>
            <h1>{this.state.protocolName} Protocol</h1>
            {protocolList}
            <button onClick={() => this.completeProtocol()}>Continue</button>
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
