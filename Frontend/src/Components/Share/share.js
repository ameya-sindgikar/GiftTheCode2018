import React from 'react';
import './share.css';
import humanizeDuration from 'humanize-duration';
import {
    FacebookShareCount,
    FacebookIcon,
    TwitterShareButton,
    TwitterIcon
  } from 'react-share';
import FacebookShareButton from 'react-share/lib/FacebookShareButton';
import { Grid, Row, Col, FormGroup, FormControl, InputGroup, InputGroupAddon, InputGroupAddonProps } from 'react-bootstrap';

class Share extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        friend: ''
    }

    this.setFriend = this.setFriend.bind(this);
  }

  setFriend = (event) => {
      this.setState({friend: event.target.value});
  }

  render() {
    let socialTitle = null;
    const durationPretty = humanizeDuration(this.props.duration, { units: ['y', 'mo', 'w', 'd', 'h', 'm', 's'], round: true});

    if(this.state.friend) {
      socialTitle = 'I just spent '+durationPretty+' unplugged, I challenge @'+this.state.friend+' to beat my score! Goodluck!';
    } else {
      socialTitle = 'I just spent '+durationPretty+' unplugged, try beating my score!';
    }

    return (
      <div className='social'>
        <Grid>
          <Row>
            <Col>
              <div className='social--main'>
              <h1>You spent {durationPretty} unplugged. Share and challenge a friend!</h1>

              <FormGroup>
                <InputGroup>
                  <InputGroup.Addon>@</InputGroup.Addon>
                  <FormControl placeholder="testing" type="text" onChange={this.setFriend}/>
                </InputGroup>
              </FormGroup>


              <TwitterShareButton
                  url={window.location.href}
                  title={socialTitle}
                  className="social-icon">
                  <TwitterIcon
                    size={64}
                    round />
                </TwitterShareButton>

                <FacebookShareButton
                  url={window.location.href}
                  quote={socialTitle}
                  className="social-icon">
                  <FacebookIcon
                    size={64}
                    round />
                </FacebookShareButton>
              </div>
            </Col>
          </Row>
        </Grid>

        

      </div>
    
    );
  }
}

export default Share;