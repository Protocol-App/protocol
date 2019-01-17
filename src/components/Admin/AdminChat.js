import React, { Component } from "react";
import openSocket from "socket.io-client";
import { connect } from "react-redux";
// import { Link } from 'react-router-dom';
import axios from "axios";
import moment from "moment-timezone";
const socket = openSocket(process.env.REACT_APP_SOCKET);

class AdminChat extends Component {
  constructor(props) {
    super(props);

    this.state = {
      chat: [],
      message: "",
      errMsg: ""
    };
    //receiving updated chat trigger from server socket
    socket.on(`get-updated-chat`, async () => {
      let res = await axios.get("/api/chat");
      return this.setState({
        chat: res.data
      });
    });
  }

  async componentDidMount() {
    let res = await axios.get("/api/chat");
    this.setState({
      chat: res.data
    });
  }

  handleInput(e) {
    this.setState({
      message: e,
      errMsg: ''
    });
  }

  assignAuthor() {
    if (this.props.user.userID) {
      return `${this.props.user.userFirstName} ${this.props.user.userLastName}`;
    } else if (this.props.admin.adminID) {
      return `${this.props.admin.adminFirst} ${this.props.admin.adminLast}`;
    }
  }

  async submitMessage() {
    let author = this.assignAuthor();
    if (this.state.message === "") {
      return this.setState({
        errMsg: "Please enter some text."
      });
    } else {
      await axios.post("/api/chat", {
        chatName: author,
        chatMessage: this.state.message,
        timestamp: moment().format("M/DD/YYYY h:mma")
      });
      //tell server something's updated in db
      socket.emit(`chat-update`);
      this.setState({
        message: ""
      });
    }
  }

  render() {
    !this.props.activeEmergency && this.props.history.push("/reportemergency");

    let emergencyChat = this.state.chat.map((message, index) => {
      return (
        <div key={index}>
          <div
            className={
              message.user_id === this.props.admin.adminID
                ? null
                : "their-chat-name"
            }
            
          >
            <p>
              {message.user_id === this.props.admin.adminID
                ? null
                : message.chat_name}
            </p>
          </div>
          <div
            className={
              message.user_id === this.props.admin.adminID
                ? "my-chat-feature"
                : "their-chat-feature"
            }
          >
            <p>{message.chat_message}</p>
            {/* moment is formatted to work with orgs in Utah time zone */}
            <p className={message.user_id === this.props.admin.adminID ? "my-chat-time" : "their-chat-time"}>
              {moment(message.chat_timestamp)
                .tz("America/Denver")
                .format("h:mma")}
            </p>
          </div>
        </div>
      );
    });
    return (
      <div className="admin-chat-page">
    <div>
    <div className="dark-background">
          <div className="sent-messages-container">{emergencyChat}</div>
          <div className="send-message-container">
            <input
              placeholder="Message"
              value={this.state.message}
              onChange={e => this.handleInput(e.target.value)}
            />
            <button
              className="send-button"
              onClick={() => this.submitMessage()}
            >
              Send
            </button>
            <p style={{ color: "red", fontFamily: "Prompt", fontSize: "0.6em" }}>{this.state.errMsg}</p>
          </div>
        </div>
      </div>
          </div>
    );
  }
}

function mapStateToProps(state) {
  let { admin, user, activeEmergency } = state;
  return {
    admin,
    user,
    activeEmergency
  };
}

export default connect(
  mapStateToProps,
  {}
)(AdminChat);
