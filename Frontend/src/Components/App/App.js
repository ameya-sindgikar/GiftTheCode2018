import React from 'react';
import logo from '../../logo.svg';
import './App.css';
import Header from '../Header/Header';
import data from '../../Data.js';
import Landingpage from '../Landingpage/Landingpage';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.steps = {
      landingPage: 'landingPage',
      unplugged: 'unplugged',
      setActivity: 'setActivity',
      setActivityOther: 'setActivityOther',
      share: 'share',
      about: 'about'
    }

    this.state = {
      step: null,
      user: {
        startTime: null,
        endTime: null,
        activity: null,
        socialMedia: null,
        location: null
      },
      global: {
        totalTime: null,
        userCount: 0
      }
    };

    this.updateStep = this.updateStep.bind(this);
    this.setStartTime = this.setStartTime.bind(this);
  }

  updateStep = function(step) {
    this.setState({step: step});
  }

  updateGlobalState = function(global) {
    this.setState({global: global})
  }

  componentDidMount = function() {
    const self = this;
    this.setState({step: this.steps.landingPage})
    data.getGlobalStats(function(response) {
      self.updateGlobalState(response);
    });
  }

  setStartTime() {
    const date = new Date();
    let userData = {
        startTime: date,
        endTime: null,
        activity: null,
        socialMedia: null,
        location: null
    }
    this.setState({user: userData})
  }

  render() {
    return (
      <div className="App">
      <Header
      totalTime={this.state.global.totalTime}
      userCount={this.state.global.userCount} />
      <p>You are {this.state.step}.</p>
      <p>You started at {this.state.user.startTime}</p>
      <Landingpage updateStep={this.updateStep}
      steps={this.steps}
      currentStep={this.state.step}
      setStartTime={this.setStartTime} />
      </div>
    );
  }
}

export default App;
