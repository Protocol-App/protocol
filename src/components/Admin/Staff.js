import React, { Component } from "react";
import axios from "axios";

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
      errMsg: ""
    };
    this.submitValidation = this.submitValidation.bind(this);
  }

  componentDidMount() {
    axios.get("/api/users").then(res => {
      this.setState({ Users: res.data });
    });
  }

  submitValidation() {
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
      })
    }
  }

  handleSubmit() {
    const {FirstName, LastName, PhoneNumber, Email, DefaultLocation, Title} = this.state;
    axios.post("/create/user", {
        FirstName,
        LastName,
        PhoneNumber,
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
      });
  }
  render() {
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
                  <div>{user.user_first_name}</div>
                  <div>{user.user_last_name}</div>
                  <div>{user.user_phone_number}</div>
                  <div>{user.user_email}</div>
                  <div>{user.default_location}</div>
                  <div>{user.user_title}</div>
                </div>
              );
            })}
          </div>
          <div>
          <p>Add New Staff Member:</p>
          {/* Do we need this if there's input placeholders? */}
            {/* <div className="inputTitle">
              <div>First Name:</div>
              <div>Last Name:</div>
              <div>Phone Number:</div>
              <div>Email:</div>
              <div>Default Location:</div>
              <div>Title:</div>
            </div> */}
            <div>
              <input
                onChange={e => this.setState({ FirstName: e.target.value })}
                placeholder="First Name"
                value={this.state.FirstName}
              />
              <input
                onChange={e => this.setState({ LastName: e.target.value })}
                placeholder="Last Name"
                value={this.state.LastName}
              />
              <input
                onChange={e => this.setState({ PhoneNumber: e.target.value })}
                placeholder="Phone #"
                value={this.state.PhoneNumber}
              />
              <input
                onChange={e => this.setState({ Email: e.target.value })}
                placeholder="Email"
                value={this.state.Email}
              />
              <input
                onChange={e => this.setState({ DefaultLocation: e.target.value })}
                placeholder="Room Number"
                value={this.state.DefaultLocation}
              />
              <input
                onChange={e => this.setState({ Title: e.target.value })}
                placeholder="Title"
                value={this.state.Title}
              />
            <button onClick={this.submitValidation}>+</button>
            </div>
            <p style={{color: "red", fontSize: "11px"}}>{this.state.errMsg}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default Staff;
