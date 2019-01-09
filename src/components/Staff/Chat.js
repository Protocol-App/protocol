import React, { Component } from 'react';
import openSocket from 'socket.io-client';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
// import axios from 'axios';
const socket = openSocket('http://localhost:4000/');


class Chat extends Component {
    constructor (props) {
        super(props);

        this.state = {
            chat: [],
            schoolID: (this.props.user.schoolID || this.props.admin.schoolID),
            author: (this.props.adminFirst || this.props.user.userFirstName)
        }
        //receiving updated chat trigger from server socket
        socket.on(`get-updated-chat`, (chatData) => {
            console.log('making another axios call to get updated chat')
            //axios call
            //set state with res.data, updated chat array
            // this.setState({
            //     chat: chatData
            // })
        })
    }

    componentDidMount() {
        //grab current chat data from db on mounting, set to state
        
    }



    submitMessage(){
        //axios call to post new msg to db, {schoolID: this.state.schoolID, author: this.state.author, chatMsg: this.state.chatMsg})
        //tell server something's updated in db
        socket.emit(`chat-update`)
    }

  render() {
      console.log(this.state)
     let emergencyChat = this.state.chat.map((message, index) => {
          return (
              <div key={index}>
              <p>{message.author}</p>
              <p>{message.message}</p>
              </div>
          )
      })
    return (
      <div>
          {this.props.activeEmergency ?  
          <div>Chat
          {emergencyChat}
          <button><Link to='/status'>Change Status</Link></button>
          </div> 
          : <p>There is no active emergency.</p>}
      
      </div>
    );
  }
}

function mapStateToProps (state) {
  let {admin, user, activeEmergency} = state
  return {
      admin,
      user,
    activeEmergency
  }
}

export default connect(mapStateToProps, {})(Chat);