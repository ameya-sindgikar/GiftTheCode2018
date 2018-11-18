import React from 'react';
import './footer.css';
import logo from '../../logo.png';
import { Grid, Row, Col } from 'react-bootstrap';



class Footer extends React.Component{
  constructor(props) {
    super(props);

  }
  render() {


    return (
      <footer className="footer">
        <Grid>
          <Row className='show-grid'>
            <Col xs={12} md={8}>
              <div className="footer--copy">
              © 2018 Boys and Girls Clubs of Canada 
              </div>
                
            </Col>
            <Col xs={12} md={4}>
              <img src={logo} className="footer--logo" alt="logo" />
            </Col>
          </Row>
        </Grid>
        
       
      </footer>
    );
  }
}

export default Footer;
