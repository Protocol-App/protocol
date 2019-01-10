import React, { Component } from "react";
import axios from "axios";
import InputMask from "react-input-mask";
// bugs:
//look into "cannot set headers after they are sent" error, something in controller file
//delete user not hooked up to correct inputs, deleted all my users!
//inputs not hooked up to state, cannot type into e.target.value
//edit phone number input...see bug comment below

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

  // setUser(userId) {

  //   const { Users } = this.state.Users;
  //   const selectedUser = Users.filter(user => user.user_id === userId);
  //   this.setState({ user: selectedUser });
  //   console.log(this.state.user);
  // }

  //BUG!! when you edit a phone number input, it resubmits to the database in the non-formatted version. We need to format it like +16302007685, not 1 (630) 200-7685, because then we wont be able to login.

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
    let formattedNum = this.formatPhoneNumber(this.state.userPhoneNumber)
    if (formattedNum) {
      const {
        userFirstName,
        userLastName,
        userEmail,
        userDefaultLocation,
        userTitle,
        selectedUserId
      } = this.state;
      await axios.put(`/api/user`, {
        userFirstName,
        userLastName,
        formattedNum,
        userEmail,
        userDefaultLocation,
        userTitle,
        selectedUserId
      });
      this.endUpdateUser();
    }
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
  }

  handleInputChange = name => event => {
    this.setState({
      [name]: event.target.value,
      errMsg: ""
    });
  };

  render() {
    return (
      <div>
        <div>
     
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
                    <div className="edit_delete_container">
                      <div
                        className="edit_button_staff"
                        onClick={e => this.editStaffToggle(user)}
                      />
                      <div
                        className="delete_button_staff"
                        onClick={() => this.deleteUser(user.user_id)}
                      />
                    </div>
                  ) : (
                    <div className="edit_delete_container">
                      <div
                        className="save_button_staff"
                        onClick={() => this.updateUser()}
                      />
                      <div
                        className="cancel_button_staff"
                        onClick={() => this.endUpdateUser()}
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          <div>
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
                placeholder="Room #"
                value={this.state.DefaultLocation}
              />
              <input
                className="staff_entry title"
                onChange={e => this.setState({ Title: e.target.value })}
                placeholder="Title"
                value={this.state.Title}
              />
              <div
                className="submit_new_staff_plus"
                onClick={this.submitValidation}
              />
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
