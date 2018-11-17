import React from 'react';
import './Header.css';
import logo from '../../logo.svg';
import data from '../../Data.js';


class Header extends React.Component{
  constructor(props) {
    super(props);

    data.test(
      function (error, response, body) {
        console.log('error:', error); // Print the error if one occurred
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        console.log('body:', body); // Print the HTML for the Google homepage.
      }
    )

  }
  render() {
    return (
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Total Time: {this.props.totalTime}</p>
        <p>User Count: {this.props.userCount}</p>
      </header>
    );
  }
}

export default Header;
