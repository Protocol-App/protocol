import React, { Component } from "react";
import axios from "axios";
import InputMask from "react-input-mask";

class Staff extends Component {
  constructor() {
    super();

    this.state = {
      FirstName: "",
      LastName: "",
      PhoneNumber: "",
      Email: "",
      DefaultLocation: "",
      Title: "",
      Users: [],
      errMsg: "",
      editStaff: false,
      disabled: true,
      selectedUserId: "",
      userFirstName: "",
      userLastName: "",
      userPhoneNumber: "",
      userEmail: "",
      userDefaultLocation: "",
      userTitle: ""
    };
    // this.submitValidation = this.submitValidation.bind(this);
  }

  componentDidMount() {
    axios
      .get("/api/users")
      .then(res => {
        this.setState({ Users: res.data });
      })
      .catch(err => console.log("error: ", err));
  }

  formatPhoneNumber(phoneNum) {
    if (phoneNum) {
      var formatted = phoneNum.replace(/\D/g, "");
      if (formatted.length !== 11) {
        this.setState({
          errMsg: "Please enter in a valid phone number."
        });
        return null;
      } else {
        return `+${formatted}`;
      }
    } else {
      this.setState({
        errMsg: "Please enter a phone number."
      });
      return null;
    }
  }

  submitValidation = () => {
    const {
      FirstName,
      LastName,
      PhoneNumber,
      Email,
      DefaultLocation,
      Title
    } = this.state;
    if (
      FirstName &&
      LastName &&
      PhoneNumber &&
      Email &&
      DefaultLocation &&
      Title
    ) {
      this.handleSubmit();
    } else {
      this.setState({
        errMsg: "Please complete all the fields."
      });
    }
  };

  handleSubmit() {
    let formattedPhoneNumber = this.formatPhoneNumber(this.state.PhoneNumber);
    if (formattedPhoneNumber) {
      const { FirstName, LastName, Email, DefaultLocation, Title } = this.state;
      axios
        .post("/create/user", {
          FirstName,
          LastName,
          formattedPhoneNumber,
          Email,
          DefaultLocation,
          Title
        })
        .then(() => {
          console.log("User has been created");
          axios.get("/api/users").then(res => {
            this.setState({
              Users: res.data,
              FirstName: "",
              LastName: "",
              PhoneNumber: "",
              Email: "",
              DefaultLocation: "",
              Title: "",
              errMsg: ""
            });
          });
        })
        .catch(err => {
          console.log(err);
        });
    }
  }

  editStaffToggle(user) {
    this.setState({
      selectedUserId: user.user_id,
      userFirstName: user.user_first_name,
      userLastName: user.user_last_name,
      userPhoneNumber: user.user_phone_number,
      userEmail: user.user_email,
      userDefaultLocation: user.default_location,
      userTitle: user.user_title,
      disabled: !this.state.disabled
    });
  }

  async updateUser() {
    const {
      userFirstName,
      userLastName,
      userPhoneNumber,
      userEmail,
      userDefaultLocation,
      userTitle,
      selectedUserId
    } = this.state;
    await axios.put(`/api/user`, {
      userFirstName,
      userLastName,
      userPhoneNumber,
      userEmail,
      userDefaultLocation,
      userTitle,
      selectedUserId
    });
    this.componentDidMount();
    this.endUpdateUser();
  }
  async deleteUser(userId) {
    console.log(userId);
    await axios.delete(`/api/user/${userId}`);
    this.componentDidMount();
    this.setState({
      selectedUserId: "",
      disabled: true
    });
  }

  endUpdateUser() {
    this.componentDidMount();
    this.setState({
      selectedUserId: "",
      disabled: true
    });
    // });
  }

  handleInputChange = name => event => {
    this.setState({
      [name]: event.target.value,
      errMsg: ""
    });
    console.log(this.state);
  };

  render() {
    console.log(this.state.Users);
    return (
      <div>
        <div>
          <div className="inputTitle">
            <div>First Name:</div>
            <div>Last Name:</div>
            <div>Phone Number:</div>
            <div>Email:</div>
            <div>Default Location:</div>
            <div>Title:</div>
          </div>
          <div>
            {this.state.Users.map(user => {
              return (
                <div className="listOfUsers" key={user.user_id}>
                  <input
                    className="title"
                    placeholder={`${user.user_first_name}`}
                    disabled={
                      !this.state.disabled &&
                      this.state.selectedUserId === user.user_id
                        ? ""
                        : "disabled"
                    }
                    onChange={this.handleInputChange("userFirstName")}
                  />
                  <input
                    className="title"
                    placeholder={`${user.user_last_name}`}
                    disabled={
                      !this.state.disabled &&
                      this.state.selectedUserId === user.user_id
                        ? ""
                        : "disabled"
                    }
                    onChange={this.handleInputChange("userLastName")}
                  />
                  <InputMask
                    mask="+1 (999) 999-9999"
                    maskChar={null}
                    className="title"
                    placeholder={`${user.user_phone_number}`}
                    onChange={this.handleInputChange("userPhoneNumber")}
                    disabled={
                      !this.state.disabled &&
                      this.state.selectedUserId === user.user_id
                        ? ""
                        : "disabled"
                    }
                  />
                  <input
                    className="title"
                    placeholder={`${user.user_email}`}
                    disabled={
                      !this.state.disabled &&
                      this.state.selectedUserId === user.user_id
                        ? ""
                        : "disabled"
                    }
                    onChange={this.handleInputChange("userEmail")}
                  />
                  <input
                    className="title"
                    placeholder={`${user.default_location}`}
                    disabled={
                      !this.state.disabled &&
                      this.state.selectedUserId === user.user_id
                        ? ""
                        : "disabled"
                    }
                    onChange={this.handleInputChange("userDefaultLocation")}
                  />
                  <input
                    className="title"
                    placeholder={`${user.user_title}`}
                    disabled={
                      !this.state.disabled &&
                      this.state.selectedUserId === user.user_id
                        ? ""
                        : "disabled"
                    }
                    onChange={this.handleInputChange("userTitle")}
                  />
                  {this.state.disabled ? (
                    <div>
                      <button onClick={e => this.editStaffToggle(user)}>
                        edit staff
                      </button>
                      <button onClick={() => this.deleteUser(user.user_id)}>
                        delete
                      </button>
                    </div>
                  ) : (
                    <div>
                      <button onClick={() => this.updateUser()}>save</button>
                      <button onClick={() => this.endUpdateUser()}>
                        cancel
                      </button>
                    </div>
                  )}
                  {/* <button onClick={e => this.setUser(user.user_id)}>
                    edit staff
                  </button> */}
                </div>
              );
            })}
          </div>
          <div>
            {/* <p>Add New Staff Member:</p> */}
            {/* Do we need this if there's input placeholders? */}
            {/* <div className="inputTitle">
              <div>First Name:</div>
              <div>Last Name:</div>
              <div>Phone Number:</div>
              <div>Email:</div>
              <div>Default Location:</div>
              <div>Title:</div>
            </div> */}
            <div className="staff_entry_container">
              <input
                className="staff_entry first"
                onChange={e => this.setState({ FirstName: e.target.value })}
                placeholder="First Name"
                value={this.state.FirstName}
              />
              <input
                className="staff_entry last"
                onChange={e => this.setState({ LastName: e.target.value })}
                placeholder="Last Name"
                value={this.state.LastName}
              />
              <InputMask
                className="staff_entry phone"
                mask="+1 (999) 999-9999"
                maskChar={null}
                placeholder="Phone #"
                value={this.state.PhoneNumber}
                onChange={e => this.setState({ PhoneNumber: e.target.value })}
              />
              <input
                className="staff_entry email"
                onChange={e => this.setState({ Email: e.target.value })}
                placeholder="Email"
                value={this.state.Email}
              />
              <input
                className="staff_entry location"
                onChange={e =>
                  this.setState({ DefaultLocation: e.target.value })
                }
                placeholder="Room Number"
                value={this.state.DefaultLocation}
              />
              <input
                className="staff_entry title"
                onChange={e => this.setState({ Title: e.target.value })}
                placeholder="Title"
                value={this.state.Title}
              />
              <h2
                className="submit_new_staff_plus"
                onClick={this.submitValidation}
              >
                +
              </h2>
            </div>
            <p style={{ color: "red", fontSize: "11px", fontFamily: "prompt" }}>
              {this.state.errMsg}
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default Staff;
