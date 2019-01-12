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
      errMsg: "",
      editedStepIndex: "",
      editedStep: ""
    };
  }

  componentDidMount() {
    this.getProtocol();
  }

  async getProtocol() {
    const { protocolName } = this.state;
    let res = await axios.post("/api/protocol", { protocolName });
    return this.setState({
      steps: res.data,
      disabled: true
    });
  }

  pushProtocolStep() {
    const steps = this.state.steps;
    for (var i = 0; i < steps.length; i++) {
      if (steps[i] === null) {
        steps.splice(i, 1, this.state.newStep);
        break;
      }
    }
    this.setState({ steps: steps, newStep: "" });
    this.addProtocolStep();
  }

  async addProtocolStep() {
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

  updateStateSteps;

  async editStep(index) {
    let updatedSteps = this.state.steps;
    updatedSteps.splice(index, 1, this.state.editedStep);
    console.log("state steps: ", this.state.steps, "index:", index);
    await axios.put(`/api/protocol`, {
      step1: updatedSteps[0] || null,
      step2: updatedSteps[1] || null,
      step3: updatedSteps[2] || null,
      step4: updatedSteps[3] || null,
      step5: updatedSteps[4] || null,
      step6: updatedSteps[5] || null,
      step7: updatedSteps[6] || null,
      step8: updatedSteps[7] || null,
      step9: updatedSteps[8] || null,
      step10: updatedSteps[9] || null,
      protocolName: this.state.protocolName
    });
    // this.getProtocol();
    this.endProtocolEdit();
  }

  async deleteStep(index) {
    console.log(index);
    let updatedSteps = this.state.steps;
    updatedSteps.splice(index, 1);

    await axios.put(`/api/protocol`, {
      step1: updatedSteps[0] || null,
      step2: updatedSteps[1] || null,
      step3: updatedSteps[2] || null,
      step4: updatedSteps[3] || null,
      step5: updatedSteps[4] || null,
      step6: updatedSteps[5] || null,
      step7: updatedSteps[6] || null,
      step8: updatedSteps[7] || null,
      step9: updatedSteps[8] || null,
      step10: updatedSteps[9] || null,
      protocolName: this.state.protocolName
    });
    console.log("state steps: ", this.state.steps, "index", index);

    this.getProtocol();
  }

  handleInputChange(val) {
    this.setState({
      editedStep: val
    });
  }

  handleDisableClick() {
    this.setState({
      disabled: !this.state.disabled
    });
    this.getProtocol();
  }

  editStepToggle(index) {
    this.setState({
      editedStepIndex: index,
      disabled: !this.state.disabled
    });
  }

  endProtocolEdit() {
    this.setState({
      editedStepIndex: "",
      editedStep: "",
      disabled: true
    });
    this.getProtocol();
  }

  cancelProtocolEdit() {
    this.setState({
      editedStepIndex: "",
      editedStep: "",
      disabled: true
    });
    this.getProtocol();
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
                  className="protocol-step"
                  type="text"
                  // value={step}
                  placeholder={step}
                  onChange={e => this.handleInputChange(e.target.value)}
                  disabled={
                    !this.state.disabled && this.state.editedStepIndex === index
                      ? ""
                      : "disabled"
                  }
                />

                {this.state.disabled ? (
                  <div className="edit_delete_container_protocol">
                    <div
                      className="edit_button_step"
                      onClick={() => this.editStepToggle(index)}
                    />
                    <div
                      className="delete_button_step"
                      onClick={() => this.deleteStep(index)}
                    />
                  </div>
                ) : (
                  <div className="edit_delete_container_protocol">
                    <div
                      className={
                        this.state.editedStepIndex === index
                          ? "save_button_step"
                          : "blank"
                      }
                      onClick={() => this.editStep(index)}
                    />
                    <div
                      className={
                        this.state.editedStepIndex === index
                          ? "cancel_button_step"
                          : "blank"
                      }
                      onClick={() => this.cancelProtocolEdit()}
                    />
                  </div>
                )}
              </div>
            );
          }
        })}

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

          <p style={{ color: "red", fontSize: "11px", fontFamily: "prompt" }}>
            {this.state.errMsg}
          </p>
        </div>
      </div>
    );
  }
}

export default ActiveShooterProtocol;
