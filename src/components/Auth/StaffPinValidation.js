import React, { Component } from 'react';

class StaffPinValidation extends Component {
  constructor () {
    super();

    this.state = {
      pinInput: 0
    }
  }

  handlePinInput (value) {
    this.setState({
      pinInput: value
    })

  }

  validatePinInput () {
    //regex
  }

  handlePinSubmit () {

  }


  render() {
    return (
      <div>
        Please enter your 4-digit pin here:
        <input onChange={(e) => this.handlePinInput(e.target.value)}placeholder="PIN" />
        <button onClick={() => this.handlePinSubmit()}>Submit</button>
      </div>
    );
  }
}

export default StaffPinValidation;