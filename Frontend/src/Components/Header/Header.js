import React from 'react';
import './Header.css';
import logo from '../../logo2.jpg';
import data from '../../Data.js';
import { Grid, Row, Col } from 'react-bootstrap';
import CountUp from 'react-countup';
import numeral from 'numeral';
import humanizeDuration from 'humanize-duration';


class Header extends React.Component{
  constructor(props) {
    super(props);

    // data.test(
    //   function (error, response, body) {
    //     console.log('error:', error); // Print the error if one occurred
    //     console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    //     console.log('body:', body); // Print the HTML for the Google homepage.
    //   }
    // )

  }
  render() {

    const shortEnglishHumanizer = humanizeDuration.humanizer({
      language: 'shortEn',
      languages: {
        shortEn: {
          y: () => 'y',
          mo: () => 'mo',
          w: () => 'w',
          d: () => 'd',
          h: () => 'h',
          m: () => 'm',
          s: () => 's',
          ms: () => 'ms',
        }
      }
    })

    return (
      <header className="header">
        <Grid>
          <Row className='show-grid'>
            <Col xs={12} md={8}>
              <a href="http://www.unplugtoconnect.ca" target="_blank" ><img src={logo} className="header--logo" alt="logo" /></a>
            </Col>
            <Col xs={12} md={4}>

                <Row>
                  <Col xs={12} md={4}>
                    <div className='header--count'>
                      <CountUp
                        start={0}
                        end={this.props.userCount}
                        duration={3.00}
                        separator=","
                        decimals={2}
                        decimal="."
                        prefix=""
                        suffix=""
                        onEnd={() => console.log('Ended! 👏')}
                        onStart={() => console.log('Started! 💨')}
                        formattingFn={(value) => {
                            return numeral(value).format('0a');
                        }}
                        >
                      </CountUp>
                      <div className='header--count__label'>Participants</div>
                    </div>
                  </Col>
                  <Col xs={12} md={8} mdOffset={0}>
                    <div className='header--count'>
                      <CountUp
                        start={0}
                        end={this.props.totalTime}
                        duration={3.00}
                        separator=","
                        decimals={0}
                        decimal="."
                        prefix=""
                        suffix=""
                        onEnd={() => console.log('Ended! 👏')}
                        onStart={() => console.log('Started! 💨')}
                        formattingFn={(value) => {
                            return shortEnglishHumanizer(value, { units: ['y', 'mo', 'w', 'd', 'h', 'm'], round: true, spacer: '' });
                        }}
                        >
                      </CountUp>
                      <div className='header--count__label'>Time Unplugged</div>
                    </div>
                  </Col>
                </Row>


            {/* <p>Total Time: {this.props.totalTime}</p>
            <p>User Count: {this.props.userCount}</p> */}
            </Col>
          </Row>
        </Grid>


      </header>
    );
  }
}

export default Header;
