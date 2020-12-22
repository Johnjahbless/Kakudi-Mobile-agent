import React, { Component } from "react";
import $ from "jquery";
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';
import Cookies from 'universal-cookie';
import Loading from '../Features/loader';
import data from '../../../components/constants';
const options = { path: '/', maxAge: 60 * 60 * 24 };

const cookies = new Cookies();

export class Login extends Component {

   constructor(props) {
         super(props);
         this.onChangeEmail = this.onChangeEmail.bind(this);
         this.onChangePassword = this.onChangePassword.bind(this);
         this.onSubmit = this.onSubmit.bind(this); 
 
         this.state = {
             email: '',
             password: '',
             error:'',
             loading: false,
             userDetails: '',
             logo: ''
         }
     } 

  componentDidMount() {
    

    $(".needs-validation").submit(function(event) {
      let form = $(this);
      if (form[0].checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
        return false;
      }
      form.addClass("was-validated");
      return true;
    });

       $.getJSON('https://geolocation-db.com/json/')
      .done ((response) => {
        this.setState({userDetails: response})
      });
  }

 onChangeEmail(e) {
    this.setState({email: e.target.value})
   }

   onChangePassword(e) {
     this.setState({password: e.target.value})
   }


   onSubmit(e) {
     e.preventDefault()
     this.setState({loading: true, error: ''});

     const logins = {
      email: this.state.email,
      password: this.state.password,
      userDetails: this.state.userDetails
      }

  axios.post(`${data.host}auth/v1/agent/login`, logins)
          .then(res => {
           return res.data !== '200'?(cookies.set('__sessions', res.data, options), cookies.set('__lockout', {lockout: false}, options),window.location = '/') : this.setState({loading: false, error: 'Your IP Address has been blocked' });
          }).catch(err => {
              this.setState({loading: false, error: 'Invalid email or password' });
          });

   }
    

    Loaderview() {
       return this.state.loading? <Loading /> : null;
        
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
                    <h4>Login</h4>
                  </div>

                  <div className="card-body">
                    <form
                      noValidate
                      className="needs-validation"
                      onSubmit={this.onSubmit}
                    >
                      <div className="form-group">
                        <label htmlFor="appno">Email</label>
                        <input
                          id="appno"
                          type="text"
                          className="form-control"
                          name="appno"
                          tabIndex="1"
                          required
                          autoFocus
                          onChange={this.onChangeEmail} 
                          value={this.state.email}
                        />
                        <div className="invalid-feedback">
                          Please fill in your Email address
                        </div>
                      </div>

                      <div className="form-group">
                        <div className="d-block">
                          <label htmlFor="password" className="control-label">
                            Password
                          </label>
                          <div className="float-right">
                            <Link
                              to="/auth/forget-password"
                              className="text-small"
                            >
                              Forgot Password?
                            </Link>
                          </div>
                        </div>
                        <input
                          id="password"
                          type="password"
                          className="form-control"
                          name="password"
                          tabIndex="2"
                          required
                          onChange={this.onChangePassword} 
                          value={this.state.password}
                        />
                        <div className="invalid-feedback">
                          please fill in your password
                        </div>
                      </div>

                      <div className="form-group">
                        <div className="custom-control custom-checkbox">
                          <input
                            type="checkbox"
                            name="remember"
                            className="custom-control-input"
                            tabIndex="3"
                            id="remember-me"
                          />
                          <label
                            className="custom-control-label"
                            htmlFor="remember-me"
                          >
                            Remember Me
                          </label>
                        </div>
                      </div>

                      <div className="form-group">
                       {this.state.loading? this.Loaderview() : <button
                          type="submit"
                          className="btn btn-primary btn-lg btn-block"
                          tabIndex="4"
                        >
                          Login
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

export default Login;
