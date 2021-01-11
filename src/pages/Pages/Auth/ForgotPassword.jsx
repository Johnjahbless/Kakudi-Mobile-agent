import React, { Component } from "react";
import axios from 'axios';
import $ from "jquery";
import Loading from '../Features/loader';
import data from '../../../components/constants';
import { Link } from 'react-router-dom';
import Webcam from "react-webcam";



export class ForgotPassword extends Component {
  constructor(props) {
    super(props); 
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    
    this.state = {
      imgSrc: '',
        image: '',
        error: '',
        email: '',
        metricNo:'',
        lga: '',
        department: '',
        programme: '',
        gender: '',
        logo: '',
        loading: false,
        capture: false,
        userDetails: '',
        student: []
    }

  }

    componentDidMount() {
      $.getJSON('https://geolocation-db.com/json/')
      .done ((response) => {
        this.setState({userDetails: response})
      });
    }


    onChangeEmail(e){
        this.setState({email: e.target.value});
  
      }

      onSubmit(e) {
        e.preventDefault()
        this.setState({loading: true, error: ''});

        const details = { email: this.state.email, userDetails: this.state.userDetails}

        //console.log(details);

        axios.post(`${data.host}api/v1/agent/passwords/verify`, details)
        .then(res => {
          
          return res.data == '200'? this.setState({ loading: false, error: 'This email address is not registered' }) : this.setState({ loading: false, email: '', error: 'Please check your mail to reset your password' });
          
        }).catch(err => {
          this.setState({ loading: false, error: 'An unknown error has occured, please try again' });
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
            <div className="col-12 col-sm-8 offset-sm-2 col-md-6 offset-md-3 col-lg-6 offset-lg-3 col-xl-4 offset-xl-4">
                <div className="login-brand">
                  <img
                    src="/assets/img/kakudi_final.png"
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
                  <p className="text-muted">
                      We will send a link to reset your password
                    </p>
                    <form onSubmit={this.onSubmit}>
                      <div className="form-group">
                        <label for="email">Email</label>
                        <input
                          id="email"
                          type="email"
                          onChange={this.onChangeEmail}
                          value={this.state.email}
                          className="form-control"
                          name="email"
                          tabindex="1"
                          required
                          autofocus
                        />
                      </div>

                      <div className="form-group">
                       { this.state.loading? this.Loaderview() : <button
                          type="submit"
                          className="btn btn-primary btn-lg btn-block"
                          tabindex="4"
                        >
                          Forgot Password
                        </button>}
                      </div>
                      <div className="text-center p-t-30">
																	<p style={{color:"red"}} className="txt1">
																		{this.state.error}
																	</p>
                                  </div>
                    </form>
                  
                     </div>
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
