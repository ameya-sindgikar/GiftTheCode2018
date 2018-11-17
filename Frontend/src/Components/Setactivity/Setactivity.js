import React from 'react';
import './Setactivity.css';
import data from '../../Data.js';

class Setactivity extends React.Component {
  constructor(props) {
    super(props);


  }

  selectActivity = (activity) => {
    const self = this;
    self.props.setEndTime();
    const duration = this.props.getDuration();
    data.saveActivity(activity, duration, function(error, response, body) {
      //callback
      self.props.updateStep(self.props.steps.share);
    })
  }

  render() {
    return (
      <div>
        <h3>Set Activity!</h3>
        <a href='javascript:;' onClick={this.selectActivity.bind(null, 'A')}>Option A</a>
        <a href='javascript:;' onClick={this.selectActivity.bind(null, 'B')}>Option B</a>
        <a href='javascript:;' onClick={this.selectActivity.bind(null, 'C')}>Option C</a>
        <a href='javascript:;' onClick={this.selectActivity.bind(null, 'D')}>Option D</a>
      </div>

    );
  }
}

export default Setactivity;
