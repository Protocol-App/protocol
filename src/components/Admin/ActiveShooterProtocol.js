import React, { Component } from "react";
import axios from "axios";

class ActiveShooterProtocol extends Component {
  constructor() {
    super();

    this.state = {
      steps: [],
      disabled: true,
      protocolName: "active_shooter",
      newStep: "",
      errMsg: ""
    };
  }

  componentDidMount() {
    this.getProtocol();
  }

  async getProtocol() {
    const { protocolName } = this.state;
    let res = await axios.post("/api/protocol", { protocolName });
    this.setState({
      steps: res.data,
      disabled: true
    });
    console.log(res.data);
  }
  pushProtocolStep() {
    const steps = this.state.steps;
    for (var i = 0; i < steps.length; i++) {
      if (steps[i] === null) {
        steps.splice(i, 1, this.state.newStep);
        break;
      }
    }
    this.setState({ steps: steps });
    this.addProtocolStep();
  }

  async addProtocolStep() {
    console.log("pushed array:", this.state);
    const { protocolName } = this.state;
    await axios.put("/api/protocol", {
      step1: this.state.steps[0],
      step2: this.state.steps[1],
      step3: this.state.steps[2],
      step4: this.state.steps[3],
      step5: this.state.steps[4],
      step6: this.state.steps[5],
      step7: this.state.steps[6],
      step8: this.state.steps[7],
      step9: this.state.steps[8],
      step10: this.state.steps[9],
      protocolName
    });
    this.getProtocol();
  }

  submitValidation = () => {
    const { newStep } = this.state;
    if (newStep) {
      this.pushProtocolStep();
    } else {
      this.setState({
        errMsg: "Please complete protocol field."
      });
    }
  };

  handleInputChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };
  // handleNewStepInput = (e) => {
  //   this.setState({newStep: e.target.value})

  // }
  handleDisableClick() {
    this.setState({
      disabled: !this.state.disabled
    });
  }

  render() {
    return (
      <div className="protocols-container">
        <h1>Active Shooter Protocol</h1>

        {this.state.steps.map((step, index) => {
          if (step) {
            return (
              <div className="protocol-container" key={index}>
                <div className="protocol-number">{index + 1}</div>
                <input
                  type="text"
                  value={step}
                  // onChange={this.handleInputChange(step[index])}
                  disabled={this.state.disabled ? "disabled" : ""}
                />
              </div>
            );
          }
        })}

        {this.state.disabled ? (
          <div>
            <div className="step-entry-container">
              <div />
              <input
                className="step_entry"
                onChange={e => this.setState({ newStep: e.target.value })}
                placeholder="Add new step here..."
                value={this.state.newStep}
              />
              <div
                className="submit_new_step_plus"
                onClick={this.submitValidation}
              />
            </div>
            {/* <button onClick={() => this.editProtocol()}>
              Submit Protocol Changes
            </button> */}
            <p style={{ color: "red", fontSize: "11px", fontFamily: "prompt" }}>
              {this.state.errMsg}
            </p>
          </div>
        ) : null}
      </div>
    );
  }
}

export default ActiveShooterProtocol;
