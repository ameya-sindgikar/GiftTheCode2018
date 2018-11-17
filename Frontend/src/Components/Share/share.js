import React from 'react';
import './share.css';
import {InlineShareButtons} from 'sharethis-reactjs';

class Share extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        friend: null
    }

    this.setFriend = this.setFriend.bind(this);
  }

  setFriend = (event) => {
      this.state.friend = event.target.value;
  }

  render() {
    return (
      <div>
        <h3>Share</h3>
        <form>
            <label>Share with a friend</label>
            <input type='text' onKeyDown={this.setFriend} name='friend' />
        </form>

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
            description: 'This is our custom description',       // (defaults to og:description or twitter:description)
            title: 'this is our title',            // (defaults to og:title or twitter:title)
            message: 'this is our email message text',     // (only for email sharing)
            subject: 'this is our email subject text',  // (only for email sharing)
            username: 'this is our custom twitter username/handle' // (only for twitter sharing)
          }}
        />
        
      </div>

    );
  }
}

export default Share;
