import React from 'react';
import './share.css';
import {
    FacebookShareCount,
    FacebookIcon,
    TwitterShareButton,
    TwitterIcon
  } from 'react-share';
import FacebookShareButton from 'react-share/lib/FacebookShareButton';

class Share extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        friend: 'empty',
        friendSet: false
    }

    this.setFriend = this.setFriend.bind(this);
  }

  setFriend = (event) => {
      this.setState({friend: event.target.value, friendSet: true});
  }

  render() {

    let shareButtons = null;

    

    return (
      <div>
        <h3>Share</h3>
            <label>Share with a friend</label>
            <input type='text' onKeyDown={this.setFriend} name='friend' />
        <p>Hello thats me{this.state.friend}</p>

        <TwitterShareButton
            url={window.location.href}
            title={this.state.friend}
            className="social-icon">
            <TwitterIcon
              size={64}
              round />
          </TwitterShareButton>

          <FacebookShareButton
            url={window.location.href}
            quote={this.state.friend}
            className="social-icon">
            <FacebookIcon
              size={64}
              round />
          </FacebookShareButton>

        

      </div>
    
    );
  }
}

export default Share;
