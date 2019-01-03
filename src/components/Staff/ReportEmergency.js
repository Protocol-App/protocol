import React, { Component } from 'react';
import { connect } from 'react-redux';
import {updateEmergency} from '../../dux/reducer';

class ReportEmergency extends Component {

  handleClick (emergency) {
    this.props.updateEmergency(emergency)
    this.props.history.push('/confirmemergency')
  }

  render() {
    return (
      <div>
        <p>Logo</p>
         <p>What is the situation?</p>
         <div>
         <button onClick={() => this.handleClick({emergencyName: "active_shooter"})}>Active Shooter</button>
         <button onClick={() => this.handleClick({emergencyName: "bomb_threat"})}>Bomb Threat</button>
         <button onClick={() => this.handleClick({emergencyName: "fire"})}>Fire</button>
         <button onClick={() => this.handleClick({emergencyName: "other"})}>Other</button>
      </div>
      </div>
    );
  }
}

export default connect(null, {updateEmergency})(ReportEmergency);