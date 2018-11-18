import React from 'react';
import './Setactivity.css';
import data from '../../Data.js';
import { Button, Grid, Row, Col, FormGroup, FormControl } from 'react-bootstrap';
import humanizeDuration from 'humanize-duration';

class Setactivity extends React.Component {
  constructor(props) {
    super(props);


    this.handleOtherSubmit = this.handleOtherSubmit.bind(this);
    this.handleOtherInput = this.handleOtherInput.bind(this);
  }

  componentDidMount() {
    this.props.setEndTime();
  }

  selectActivity = (activity) => {

    if(activity === 'Other') {
      this.props.updateStep(this.props.steps.setActivityOther);
    } else {
      this.setActivity(activity);
    }
  }

  setActivity(activity) {
    var self = this;
    this.props.setActivity(activity);
    data.saveActivity(activity, this.props.duration, function(error, response, body) {
      //callback
      self.props.updateStep(self.props.steps.share);
    })
  }

  handleOtherInput(event) {
    this.props.setActivity(event.target.value);
  }

  handleOtherSubmit(event) {
    this.setActivity(this.props.activity); //activity will already be populated onChange
    event.preventDefault();
  }


  render() {
    
    const durationPretty = humanizeDuration(this.props.duration, { units: ['y', 'mo', 'w', 'd', 'h', 'm', 's'], round: true});
    return (
      <div className='setActivity'>

        {this.props.currentStep === this.props.steps.setActivity &&
          <Grid>
            <Row>
              <Col>
                <div className='setActivity--main'>
                  <h1>Amazing! You unplugged for <big>{durationPretty}</big>! What did you do?</h1>
                  <Row>
                    <Col md={5}>
                      <Button onClick={this.selectActivity.bind(null, 'Physical Activity')}>Physical Activity</Button>
                    </Col>
                    <Col md={5} mdOffset={2}>
                      <Button onClick={this.selectActivity.bind(null, 'Family Time')}>Family Time</Button>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={5}>
                      <Button onClick={this.selectActivity.bind(null, 'Personal Time')}>Personal Time</Button>
                    </Col>
                    <Col md={5} mdOffset={2}>
                      <Button onClick={this.selectActivity.bind(null, 'Community Activity')}>Community Activity</Button>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={5}>
                      <Button onClick={this.selectActivity.bind(null, 'Socializing')}>Socializing</Button>
                    </Col>
                    <Col md={5} mdOffset={2}>
                      <Button onClick={this.selectActivity.bind(null, 'Other')}>Other</Button>
                    </Col>
                  </Row>
                </div>
              
              </Col>
            </Row>
          </Grid>
        }
        {this.props.currentStep === this.props.steps.setActivityOther &&
        <Grid>
          <Row>
            <Col>
              <div className='setActivityOther--main'>
                <h1>Amazing! You unplugged for <big>{durationPretty}</big>! What did you do?</h1>
                <form onSubmit={this.handleOtherSubmit}>
                  <FormGroup controlId="formControlsTextarea">
                    <FormControl componentClass="textarea" onChange={this.handleOtherInput} placeholder="textarea" />
                  </FormGroup>
                  <Button type="submit">Submit</Button>
                </form>
              </div>
            </Col>
          </Row>
        </Grid>
        
        }
        
      </div>

    );
  }
}

export default Setactivity;
