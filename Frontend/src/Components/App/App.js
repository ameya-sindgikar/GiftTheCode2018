import React from 'react';
import logo from '../../logo.svg';
import './App.css';
import Header from '../Header/Header';
import Footer from '../Footer/footer';
import data from '../../Data.js';
import Landingpage from '../Landingpage/Landingpage';
import SetActivity from '../Setactivity/Setactivity';
import Share from '../Share/share';
import About from '../About/about';
import { Grid, Row, Col } from 'react-bootstrap';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.debug = window.location.search && window.location.search.indexOf('debug');

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
        startTime: 0,
        endTime: 0,
        duration: 0,
        activity: '',
        socialMedia: null
      },
      global: {
        totalTime: 0,
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
        endTime: 0,
        duration: 0,
        activity: '',
        socialMedia: null
    }
    this.setState({user: userData})
  }

  setEndTime = () => {
    const date = new Date();
    const endTime = date.getTime();
    const duration = endTime - this.state.user.startTime;
    let userData = {
        startTime: this.state.user.startTime,
        endTime: endTime,
        duration: duration,
        activity: this.state.user.activity,
        socialMedia: this.state.user.socialMedia
    }
    this.setState({user: userData})
  }

  setActivity = (activity) => {
    let userData = {
      startTime: this.state.user.startTime,
      endTime: this.state.user.endTime,
      duration: this.state.user.duration,
      activity: activity,
      socialMedia: this.state.user.socialMedia
  }

  this.setState({user: userData})
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
      case this.steps.setActivityOther:
        stepComponent = <SetActivity updateStep={this.updateStep}
                                     steps={this.steps}
                                     currentStep={this.state.step}
                                     setEndTime={this.setEndTime}
                                     duration={this.state.user.duration}
                                     setActivity={this.setActivity}
                                     activity={this.state.user.activity} />
        break;
      //

      // Step 3 - SHARE
      case this.steps.share:
        stepComponent = <Share updateStep={this.updateStep}
                               duration={this.state.user.duration}
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

    let debugViewer = null;

    if(this.debug) {
      const debugJSON = JSON.stringify(this.state, null, 2);
      debugViewer = <pre>{debugJSON}</pre>;
    }

    return (
      <div className="App">

        <Header
          totalTime={this.state.global.totalTime}
          userCount={this.state.global.userCount} />

        {debugViewer}
        

        <div className='app--main'>
          {stepComponent}
        </div>
        
        

        <Footer />

      </div>
    );
  }
}

export default App;
