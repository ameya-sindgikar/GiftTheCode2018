import React from 'react';
import './Landingpage.css';
import '../../Data.js';

class Landingpage extends React.Component {
  constructor(props) {
    super(props);

    const self = this;

    this.start = () => {
      console.log('Heyoooooo');
      self.props.updateStep(self.props.steps.unplugged)
    }

    this.stop = () => {
      self.props.setStartTime()
      self.props.updateStep(self.props.steps.setActivity)
    }
  }
  render() {
    const currentStep = this.props.currentStep;
    
    let button;
    if (currentStep === this.props.steps.landingPage) {
      button = <button type='button' onClick={this.start}>START!</button>;
    } else {
      button = <button type='button' onClick={this.stop}>STOPPP!</button>;
    }
    return (
      <div>
        <h1>This is the Landing Page!!!! Welcome</h1>
        {button}
      </div>
    );
  }
}

export default Landingpage;
