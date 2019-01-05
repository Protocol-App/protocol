import React, { Component } from 'react';
import axios from 'axios';
import {connect} from 'react-redux'

class Protocol extends Component {
  async componentDidMount () {
    let res = await axios.get('/api/emergencyprotocol')
    console.log(res)
  }

  render() {
    return (
      <div>
      {this.props.activeEmergency ? 
        <div>Protocol</div>
        : this.props.history.push('/reportemergency')}
  
    </div>)
  }}

  function mapStateToProps (state) {
    const {activeEmergency} = state
    return {
      activeEmergency
    }
  }
  
  export default connect(mapStateToProps, {})(Protocol);


