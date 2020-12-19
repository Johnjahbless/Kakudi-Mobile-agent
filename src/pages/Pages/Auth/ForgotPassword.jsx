import React, { Component } from "react";
import axios from 'axios';
import Loading from '../Features/loader';
import data from '../../../components/constants';
//import { Link } from 'react-router-dom';
import Webcam from "react-webcam";



export class ForgotPassword extends Component {
  constructor(props) {
    super(props); 
    this.webcamRef = React.createRef();
    this.capture = this.capture.bind(this);
    this.submit = this.submit.bind(this);
    
    this.state = {
      imgSrc: '',
        image: '',
        error: '',
        state: '',
        metricNo:'',
        lga: '',
        department: '',
        programme: '',
        gender: '',
        logo: '',
        loading: false,
        capture: false,
        student: []
    }

  }

    componentDidMount() {
      axios.get(`${data.host}api/v1/auth/school-info`)
      .then(response => {
        // eslint-disable-next-line
        
        this.setState({logo: response.data})
      }).catch((error) => {});
    }
    capture(){
        const imageSrc = this.webcamRef.current.getScreenshot();
        //setimgSrc(imageSrc);
        this.setState({imgSrc: imageSrc, capture: true})
  
      }

      submit() {
        this.setState({loading: true, error: ''});

        const details = { image: this.state.imgSrc }

        console.log(details);

        axios.post(`${data.host}api/v1/student/photo/verify`, details)
        .then(res => {
          this.setState({ loading: false, error: 'Successfully verified' });
          
        }).catch(err => {
          this.setState({ loading: false, error: 'Sorry Image does not match any image in our database' });
        });
      }
  

    
      Loaderview() {
        return this.state.loading? <Loading /> : null
        
    }

  render() {
    return (
      <div id="app">
        <section className="section">
          <div className="container mt-5">
            <div className="row">
            <div className="col-12 col-sm-8 offset-sm-2 col-md-6 offset-md-3 col-lg-6 offset-lg-2 col-xl-8 offset-xl-2">
                <div className="login-brand">
                  <img
                    src={this.state.logo}
                    alt="logo"
                    width="100"
                    className="shadow-light"
                  />
                </div>

                <div className="card card-primary">
                  <div className="card-header">
                    <h4>Forgot Password</h4>
                  </div>

                  <div className="card-body">

                  
                  <Webcam
        audio={false}
        height={100}
        ref={this.webcamRef}
        screenshotFormat="image/jpeg"
        width={150}
      />
      
      {this.state.imgSrc && (<img alt=" " height="100" width = "150" src = {this.state.imgSrc}/>) }
      { this.state.capture? <button className="btn btn-primary btn-icon icon-left" onClick={this.submit}><i className="fas fa-credit-card"></i>Submit photo</button> : <button className="btn btn-primary btn-icon icon-left" onClick={this.capture}><i className="fas fa-credit-card"></i>Capture photo</button>}
                  </div>
                </div>
                {this.Loaderview()}
                        <div className="text-center p-t-30">
																	<p className="txt1">
																		{this.state.error}
																	</p>
                                  </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default ForgotPassword;
