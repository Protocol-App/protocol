import React, { Component } from "react";
import axios from "axios";

class BombThreatProtocol extends Component {
  constructor() {
    super();

    this.state = {
      step1: "",
      step2: "",
      step3: "",
      step4: "",
      step5: "",
      step6: "",
      step7: "",
      step8: "",
      step9: "",
      step10: "",
      disabled: true,
      protocolName: "bomb_threat"
    };
  }

  componentDidMount() {
    this.getProtocol();
  }

  async getProtocol() {
    const {protocolName} = this.state
    let res = await axios.post("/api/protocol", {protocolName});
    this.setState({
      step1: res.data.protocol1,
      step2: res.data.protocol2,
      step3: res.data.protocol3,
      step4: res.data.protocol4,
      step5: res.data.protocol5,
      step6: res.data.protocol6,
      step7: res.data.protocol7,
      step8: res.data.protocol8,
      step9: res.data.protocol9,
      step10: res.data.protocol10,
      disabled: true
    });
  }

  async editProtocol() {
    const {protocolName} = this.state
    await axios.put("/api/protocol", {
      step1: this.state.step1,
      step2: this.state.step2,
      step3: this.state.step3,
      step4: this.state.step4,
      step5: this.state.step5,
      step6: this.state.step6,
      step7: this.state.step7,
      step8: this.state.step8,
      step9: this.state.step9,
      step10: this.state.step10,
      protocolName
    });
    this.getProtocol();
  }

  addAdditionalProtocol() {
    const {step1, step2, step3, step4, step5, step6, step7, step8, step9} = this.state;
    if (step9 && step8 && step7 && step6 && step5 && step4 && step3 && step2 && step1) {
      this.setState({
        step10: "Step 10"
      });
    } else if (step8 && step7 && step6 && step5 && step4 && step3 && step2 && step1) {
      this.setState({
        step9: "Step 9"
      });
    } else if (step7 && step6 && step5 && step4 && step3 && step2 && step1) {
      this.setState({
        step8: "Step 8"
      });
    } else if (step6 && step5 && step4 && step3 && step2 && step1) {
      this.setState({
        step7: "Step 7"
      });
    } else if (step5 && step4 && step3 && step2 && step1) {
      this.setState({
        step6: "Step 6"
      });
    } else if (step4 && step3 && step2 && step1) {
      this.setState({
        step5: "Step 5"
      });
    } else if (step3 && step2 && step1) {
      this.setState({
        step4: "Step 4"
      });
    } else if (step2 && step1) {
      this.setState({
        step3: "Step 3"
      });
    } else if (step1) {
      this.setState({
        step2: "Step 2"
      });
    } else {
      this.setState({
        step1: "Step 1"
      });
    }
  }

  handleInputChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  handleDisableClick() {
    this.setState({
      disabled: !this.state.disabled
    });
  }

  render() {
    return (
      <div>
        <h1>Bomb Threat Protocol</h1>
        {this.state.step1 && (
          <div>
            1:{" "}
            <input
              type="text"
              value={this.state.step1}
              onChange={this.handleInputChange("step1")}
              disabled={this.state.disabled ? "disabled" : ""}
            />
          </div>
        )}

        {this.state.step2 && (
          <div>
            2:{" "}
            <input
              type="text"
              value={this.state.step2}
              onChange={this.handleInputChange("step2")}
              disabled={this.state.disabled ? "disabled" : ""}
            />
          </div>
        )}

        {this.state.step3 && (
          <div>
            3:{" "}
            <input
              type="text"
              value={this.state.step3}
              onChange={this.handleInputChange("step3")}
              disabled={this.state.disabled ? "disabled" : ""}
            />
          </div>
        )}

        {this.state.step4 && (
          <div>
            4:{" "}
            <input
              type="text"
              value={this.state.step4}
              onChange={this.handleInputChange("step4")}
              disabled={this.state.disabled ? "disabled" : ""}
            />
          </div>
        )}

        {this.state.step5 && (
          <div>
            5:{" "}
            <input
              type="text"
              value={this.state.step5}
              onChange={this.handleInputChange("step5")}
              disabled={this.state.disabled ? "disabled" : ""}
            />
          </div>
        )}

        {this.state.step6 && (
          <div>
            6:{" "}
            <input
              type="text"
              value={this.state.step6}
              onChange={this.handleInputChange("step6")}
              disabled={this.state.disabled ? "disabled" : ""}
            />
          </div>
        )}

        {this.state.step7 && (
          <div>
            7:{" "}
            <input
              type="text"
              value={this.state.step7}
              onChange={this.handleInputChange("step7")}
              disabled={this.state.disabled ? "disabled" : ""}
            />
          </div>
        )}

        {this.state.step8 && (
          <div>
            8:{" "}
            <input
              type="text"
              value={this.state.step8}
              onChange={this.handleInputChange("step8")}
              disabled={this.state.disabled ? "disabled" : ""}
            />
          </div>
        )}

        {this.state.step9 && (
          <div>
            9:{" "}
            <input
              type="text"
              value={this.state.step9}
              onChange={this.handleInputChange("step9")}
              disabled={this.state.disabled ? "disabled" : ""}
            />
          </div>
        )}

        {this.state.step10 && (
          <div>
            10:{" "}
            <input
              type="text"
              value={this.state.step10}
              onChange={this.handleInputChange("step10")}
              disabled={this.state.disabled ? "disabled" : ""}
            />
          </div>
        )}
          {this.state.disabled && (
          <button onClick={() => this.handleDisableClick()}>
            Edit Protocol
          </button>
        )}
        {!this.state.disabled ? (
          <div>
            <div>
              {!this.state.step10 && (
                <button onClick={() => this.addAdditionalProtocol()}>
                  +
                </button>
              )}
            </div>
            <button onClick={() => this.editProtocol()}>
              Submit Protocol Changes
            </button>
          </div>
        ) : null}
      </div>
    );
  }
}

export default BombThreatProtocol;
