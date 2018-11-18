import React from 'react';
import './Landingpage.css';
import '../../Data.js';
import {Button, Grid, Row, Col} from 'react-bootstrap';
import screenfull from 'screenfull'
import img from '../../plug.png';


class Landingpage extends React.Component {
  constructor(props) {
    super(props);

    const self = this;

    this.start = () => {
      self.props.setStartTime();
      self.props.updateStep(self.props.steps.unplugged)

      if (screenfull.enabled) {
        const el = document.getElementById('target');
        screenfull.request(el);
      }
    }

    this.stop = () => {
      self.props.updateStep(self.props.steps.setActivity)
    }

    this.state = {
      isFullScreen: false
    }
  }

  componentDidMount = function() {
    var self = this;
    var s = screenfull;

    if (screenfull.enabled) {
      screenfull.on('change', function(e) {
        self.setState({isFullScreen: s.isFullscreen});

          if(!s.isFullscreen && self.props.currentStep === self.props.steps.unplugged) {
            self.stop();
          }
        
      });
    }
  }

  render() {
    const currentStep = this.props.currentStep;
    
    let button;
    let heading;
    let animationClassName = 'landingPage--animation-container';

    if (currentStep === this.props.steps.landingPage) {
      button = <div className="pulse2" id='startBtn' onClick={this.start}>Unplug</div>;
      heading = <h1>Join the movement and unplug!</h1>
    } else {
      button = <div className="pulse" id='stopBtn' onClick={this.stop}>Done</div>;
      heading = <div><h1>Keep this page open, and come back to it once your done!</h1></div>
    }

    if(this.state.isFullScreen) {
      animationClassName += ' full';
    }

    return (
      <div className='landingPage'>
        <Grid>
          <Row>
            <Col className='landingPage--main'>
              <div id="target" className={animationClassName}>
                {heading}
                {button}
              </div>
              
            </Col>
          </Row>
        </Grid>
        <img src={img} className="landingPage--plugImg" alt="unplug" />
      </div>
    );
  }
}

export default Landingpage;
