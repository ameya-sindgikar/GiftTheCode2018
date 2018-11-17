import React from 'react';
import './share.css';
import {InlineShareButtons} from 'sharethis-reactjs';
import App from '../App/App';

class Share extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        friend: null
    }

    this.setFriend = this.setFriend.bind(this);
  }

  setFriend = (event) => {
      this.setState({friend: event.target.value});
      this.forceUpdate()
  }

  render() {
    return (
      <div>
        <h3>Share</h3>
            <label>Share with a friend</label>
            <input type='text' onKeyDown={this.setFriend} name='friend' />
        <p>Hello thats me{this.state.friend}</p>

        <InlineShareButtons
          config={{
            alignment: 'center',  // alignment of buttons (left, center, right)
            enabled: true,        // show/hide buttons (true, false)
            font_size: 16,        // font size for the buttons
            labels: 'cta',        // button labels (cta, counts, null)
            language: 'en',       // which language to use (see LANGUAGES)
            networks: [           // which networks to include (see SHARING NETWORKS)
              'whatsapp',
              'linkedin',
              'messenger',
              'facebook',
              'twitter'
            ],
            padding: 12,          // padding within buttons (INTEGER)
            radius: 4,            // the corner radius on each button (INTEGER)
            show_total: true,
            size: 40,             // the size of each button (INTEGER)

            // OPTIONAL PARAMETERS
            url: window.location.href, // (defaults to current url)
            image: '',  // (defaults to og:image or twitter:image)
            description: this.props.setActivity,
            title: 'I unplugged with '+ this.state.friend,
            message: 'this is our email message text',     // (only for email sharing)
            subject: 'this is our email subject text',  // (only for email sharing)
            username: this.state.friend // (only for twitter sharing)
          }}
        />

      </div>

    );
  }
}

export default Share;
