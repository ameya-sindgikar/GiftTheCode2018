import React from 'react';
import logo from '../../logo.svg';
import './App.css';
import Header from '../Header/Header';
import data from '../../Data.js';
import Landingpage from '../Landingpage/Landingpage';
import SetActivity from '../Setactivity/Setactivity';
import Share from '../Share/share';
import About from '../About/about';

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
        socialMedia: null
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
        startTime: date.getTime(),
        endTime: null,
        activity: null,
        socialMedia: null
    }
    this.setState({user: userData})
  }

    setEndTime = () => {
    const date = new Date();
    let userData = {
        startTime: this.state.user.startTime,
        endTime: date.getTime(),
        activity: this.state.user.activity,
        socialMedia: this.state.user.socialMedia
    }
    this.setState({user: userData})
  }

  getDuration = () => {
    const duration = this.state.user.endTime - this.state.user.startTime;
    return duration;
  }


  render() {
    const step = this.state.step;
    let stepComponent = null;

    switch(step) {
      case this.steps.landingPage:
      case this.steps.unplugged:
      // Step 1 - UNPLUG/PLUG
        stepComponent = <Landingpage updateStep={this.updateStep}
                                    steps={this.steps}
                                    currentStep={this.state.step}
                                    setStartTime={this.setStartTime} />
        break;
      //

      // Step 2 - Set Activity
      case this.steps.setActivity:
        stepComponent = <SetActivity updateStep={this.updateStep}
                                     steps={this.steps}
                                     setEndTime={this.setEndTime}
                                     getDuration={this.getDuration} />
        break;
      //

      // Step 3 - SHARE
      case this.steps.share:
        stepComponent = <Share updateStep={this.updateStep}
                               steps={this.steps} />
        break;
      //

      // Step 4 - ABOUT
      case this.steps.about:
        stepComponent = <About updateStep={this.updateStep}
                                steps={this.steps} />
        break;
      //

      // ???
      default: 
        stepComponent = <h1>Component not found</h1>
        break;
    }

    return (
      <div className="App">
        <Header
          totalTime={this.state.global.totalTime}
          userCount={this.state.global.userCount} />

        <div>
          <p>You are {this.state.step}</p>
          <p>You started at {this.state.user.startTime}</p>
        </div>

        {stepComponent}
        
      </div>
    );
  }
}

export default App;
