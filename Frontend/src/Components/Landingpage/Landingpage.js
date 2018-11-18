import React from 'react';
import './Landingpage.css';
import '../../Data.js';
import {Button, Grid, Row, Col} from 'react-bootstrap';

class Landingpage extends React.Component {
  constructor(props) {
    super(props);

    const self = this;

    this.start = () => {
      self.props.setStartTime();
      self.props.updateStep(self.props.steps.unplugged)
    }

    this.stop = () => {
      self.props.updateStep(self.props.steps.setActivity)
    }
  }
  render() {
    const currentStep = this.props.currentStep;
    
    let button;
    let heading;

    if (currentStep === this.props.steps.landingPage) {
      button = <Button bsStyle='success' onClick={this.start}>Unplug</Button>;
      heading = <h1>Join the movement and unplug!</h1>
    } else {
      button = <Button bsStyle='danger' onClick={this.stop}>Done</Button>;
      heading = <h1>Keep this page open, and come back to it once your done!</h1>
    }
    return (
      <div className='landingPage'>
        <Grid>
          <Row>
            <Col className='landingPage--main'>

              {heading}

              <div className='landingPage--animation-container'></div>

              {button}
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default Landingpage;
