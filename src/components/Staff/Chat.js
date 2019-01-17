import React, { Component } from "react";
import openSocket from "socket.io-client";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import BackArrow from "../../assets/back-arrow.svg";
import moment from "moment-timezone";
import SafeStatusToggle from "../../assets/toggle-status-safe.svg";
import ProblemStatusToggle from "../../assets/toggle-status-problem.svg";
const socket = openSocket(process.env.REACT_APP_SOCKET);

class Chat extends Component {
  constructor(props) {
    super(props);

    this.state = {
      chat: [],
      message: "",
      protocolName: "",
      toggle: true
    };
    socket.on(`get-updated-chat`, async () => {
      let res = await axios.get("/api/chat");
      return this.setState({
        chat: res.data
      });
    });
  }

  titleCase = str => {
    var splitStr = str.toUpperCase().split(" ");
    for (var i = 0; i < splitStr.length; i++) {
      splitStr[i] =
        splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }
    return splitStr.join(" ");
  };

  async componentDidMount() {
    let res = await axios.get("/api/chat");
    this.setState({
      chat: res.data
    });
    let title = await axios.get("/api/emergencyprotocol");
    let activeProtocolName = this.titleCase(
      title.data.protocolName.replace(/_/, " ")
    );
    this.setState({
      protocolName: activeProtocolName
    });
  }

  handleInput(e) {
    this.setState({
      message: e
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
      alert('Please enter some text.')
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
              message.user_id === this.props.user.userID
                ? null
                : "their-chat-name"
            }
          >
            <p>
              {message.user_id === this.props.user.userID
                ? null
                : message.chat_name}
            </p>
          </div>
          <div
            className={
              message.user_id === this.props.user.userID
                ? "my-chat-feature"
                : "their-chat-feature"
            }
          >
            <p>{message.chat_message}</p>
            {/* moment is formatted to work with orgs in Utah time zone */}
            <p
              className={
                message.user_id === this.props.user.userID
                  ? "my-chat-time"
                  : "their-chat-time"
              }
            >
              {moment(message.chat_timestamp)
                .tz("America/Denver")
                .format("h:mma")}
            </p>
          </div>
        </div>
      );
    });
    return (
      <div className="chat-page">
          <div className="banner">
              <Link to="/status">
                <img className="back-arrow" src={BackArrow} alt="Chat Page" />
              </Link>
            <h1 className="alarm-text">{this.state.protocolName} EMERGENCY</h1>
            {this.props.status === "safe" ? (
              <img
                className="status-toggle"
                src={SafeStatusToggle}
                alt="SafeStatus"
              />
            ) : (
              <img
                className="status-toggle"
                src={ProblemStatusToggle}
                alt="SafeStatus"
              />
            )}
          </div>
     
            <div className="sent-messages-container">
            {emergencyChat}
            </div>
          
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
          </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  let { admin, user, activeEmergency, status } = state;
  return {
    admin,
    user,
    activeEmergency,
    status
  };
}

export default connect(
  mapStateToProps,
  {}
)(Chat);
