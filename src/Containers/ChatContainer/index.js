import React, { Component } from "react";
// import { Button } from 'react-bootstrap';
import { connect } from "react-redux";
// import { sendMessage } from './chat';
import { AppBar, Typography, IconButton } from "@material-ui/core";
import { Send } from "@material-ui/icons";

import "./style.css";
// import Bot from './images/bot.png';
// import User from './images/user.png';
// import Robo from './images/robo.png';
// import UserHead from './images/userhead.png';
// import { Gmaps, Marker } from 'react-gmaps';
// import YouTube from 'react-youtube'
// import Ticket from './ticket';
// import Request from 'superagent';
import VoicePlayer from "../../react-voice-components/lib/VoicePlayer";
import Input from "react-speech-recognition-input";
import { dialogFlowClient, myDB } from "../../config";

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      // messages: [{ sender: 'bot', message: 'adfasdfas' }, { sender: 'user', message: 'Hello' }],
      messages: []
    };
  }

  changingstate = e => {
    this.setState({ value: e.target.value });
  };
  keypress = e => {
    if (e.key === "Enter") {
      e.preventDefault();
      this.setState({
        value: ""
      });
    }
  };

  //   }
  //   reset() {
  //     this.setState({
  //       value: '',
  //     });

  //   }

  //   getmap = (lat, lang) => {
  //     console.log(lat, lang);
  //   }
  //   onMapCreated(map) {
  //     map.setOptions({
  //       disableDefaultUI: true
  //     });
  //   }
  //   scrollToBottom = () => {
  //     var elm = document.getElementById("ap");
  //     elm.scrollIntoView();
  //   }

  componentDidMount() {
    // this.scrollToBottom();
  }

  componentDidUpdate() {
    // this.scrollToBottom();
  }
  sendDialog = () => {
    // this.props.sendMessage(this.state.value);
    console.log(this.refs.inputfieldref.value);
    let inputValue = this.refs.inputfieldref.value;

    this.setState({
      messages: [
        ...this.state.messages,
        { sender: "user", message: inputValue }
      ]
    });
    dialogFlowClient
      .textRequest(inputValue)
      .then(response => {
        let dialogmessage = response.result.fulfillment.speech;
        console.log(dialogmessage);
        this.setState({
          messages: [
            ...this.state.messages,
            { sender: "bot", message: dialogmessage }
          ]
        });
      })
      .catch(error => {
        console.log(error);
      });
    this.setState({ value: "" });
  };
  render() {
    // window.setInterval(function () {
    //   var elem = document.getElementById('element');
    //   elem.scrollTop = elem.scrollHeight;
    // }, 2000);
    // var onMapCreated = function (map) {
    //   map.setOptions({
    //     disableDefaultUI: true
    //   });
    // }
    console.log(this.state.messages);
    return (
      <div id="chatContainer">
        <div className="header">
          <p>NIKE</p>
        </div>
        <div className="chatMessages">
          <div className="chatbody">
            {this.state.messages.map(function(entry, a) {
              if (entry.sender === "bot") {
                return (
                  <div className="botPad" key={a}>
                    <br />
                    <div className="stylebot">{entry.message}</div>
                  </div>
                );
              } else if (entry.sender === "user") {
                return (
                  <div className="userPad" key={a}>
                    <br />
                    <div className="styleuser">{entry.message}</div>
                  </div>
                );
              }
            })}
          </div>
        </div>
        <div className="bottomContainer">
          {/* <input ref={"inputfieldref"} />
          <button onClick={this.sendDialog}>Send</button> */}
          <Input
            type="text"
            className="voiceRecorder"
            onChange={value => console.log(value)}
            onEnd={value => {
              this.setState({ value: value });
            }}
          />
          <input
            type="text"
            className="showinput"
            ref={"inputfieldref"}
            value={this.state.value}
            onChange={this.changingstate}
            onKeyDown={e =>
              e.keyCode === 13 ? this.sendDialog : null
            }
            tabIndex="0"
            onKeyPress={this.keypress}
          />
          {/* <button
            className="sendbutton"
            onClick={this.sendDialog}
            disabled={this.state.value == "" ? true : false}
          >
            send
          </button> */}
          <IconButton
            className="sendbutton"
            color="inherit"
            aria-label="Open drawer"
            onClick={this.sendDialog}
            disabled={this.state.value == "" ? true : false}
          >
            <Send />
          </IconButton>
        </div>
      </div>
    );
  }
}

export default Chat;
