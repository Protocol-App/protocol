import React, { Component } from 'react';
import axios from 'axios';

class Protocol extends Component {
  async componentDidMount () {
    let res = await axios.get('/api/emergencyprotocol')
    console.log(res)
  }

  render() {
    return (
      <div>Protocol</div>
    )
    }
  }
  
  export default Protocol;


  // {!this.props.activeEmergency ? <div>Unauthorized</div> : <div>Protocol</div>}