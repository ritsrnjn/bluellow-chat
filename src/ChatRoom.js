import React, { Component } from 'react';
import axios from 'axios';

class ChatRoom extends Component {
  state = {
    text: '',
    messages: []
  }

  handleChange = (e) => {
    this.setState({ text: e.target.value });
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const message = {
      id: this.state.messages.length,
      text: this.state.text,
      sender: 'user'
    }

    this.setState(state => ({
      messages: state.messages.concat(message),
      text: ''
    }));

    axios.post('http://127.0.0.1:5000/api', { userPrompt: this.state.text }) // replace with your API endpoint
      .then(response => {
        const botMessage = {
          id: this.state.messages.length + 1,
          text: response.data, // modify this based on your API response structure
          sender: 'bot'
        }
        this.setState(state => ({
          messages: state.messages.concat(botMessage)
        }));
      })
      .catch(error => {
        console.error("Error:", error);
        const botMessage = {
          id: this.state.messages.length + 1,
          text: "Hurray! Internal Server Error!",
          sender: 'bot'
        }
        this.setState(state => ({
          messages: state.messages.concat(botMessage)
        }));
      });
  }

  render() {
    return (
      <div className="app">
        <header className="app-header">
          <h2>Bluellow Chat</h2>
        </header>
        <div className="chat-room">
          {this.state.messages.map(message => (
            <div key={message.id} className={`message ${message.sender}`}>
              <p>{message.text}</p>
            </div>
          ))}
        </div>
        <form className="input-form" onSubmit={this.handleSubmit}>
          <input
            onChange={this.handleChange}
            value={this.state.text}
            placeholder="Type a message..."
            className="input-field"
          />
          <button type="submit" className="submit-button">Send</button>
        </form>
      </div>
    );
  }
}

export default ChatRoom;
