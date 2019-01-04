import React, { Component } from 'react';
import { connect } from 'react-redux';
import {updateEmergency, updateActiveEmergency} from '../../dux/reducer';
import axios from 'axios';

class ReportEmergency extends Component {

  async componentDidMount() {
    let res = await axios.get("/api/staffschoolemergency");
    console.log(res.data);
    if (res.data.activeEmergency) {
      this.props.updateActiveEmergency(true);
    }
  }

  handleClick (emergency) {
    this.props.updateEmergency(emergency)
    this.props.history.push('/confirmemergency')
  }

  render() {
    return (
      //if there's an active emergency at their school, automatically redirect to protocol page
      <div>{this.props.activeEmergency ? this.props.history.push('/protocol') :
      <div>
        <p>Logo</p>
         <p>What is the situation?</p>
         <div>
         <button onClick={() => this.handleClick({emergencyName: "active_shooter"})}>Active Shooter</button>
         <button onClick={() => this.handleClick({emergencyName: "bomb_threat"})}>Bomb Threat</button>
         <button onClick={() => this.handleClick({emergencyName: "fire"})}>Fire</button>
         <button onClick={() => this.handleClick({emergencyName: "other"})}>Other</button>
      </div>
      </div>}
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

export default connect(mapStateToProps, {updateEmergency, updateActiveEmergency})(ReportEmergency);