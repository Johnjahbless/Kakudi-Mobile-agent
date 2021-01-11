import React, { Component } from "react";
import axios from 'axios';
import Loading from '../Features/loader';
import data from '../../../components/constants';
import { error } from "jquery";

export class ResetPassword extends Component {
  constructor(props) {
    super(props); 
    this.email = this.email.bind(this);
    this.newPassword = this.newPassword.bind(this);
    this.confirmPassword = this.confirmPassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    
    this.state = {
        loading: false,
        newPassword: '',
        confirmPassword: '',
        email: ''
    }

  }

    componentDidMount() {
    }

    email(e){this.setState({email: e.target.value})}

    newPassword(e){this.setState({newPassword: e.target.value})}

    confirmPassword(e){this.setState({confirmPassword: e.target.value})}

      onSubmit(e) {
        e.preventDefault()
        const { email, newPassword, confirmPassword } = this.state;

        if(newPassword !== confirmPassword) return this.setState({error: 'Passwords does not match'});

        this.setState({loading: true, error: ''});

        const details = { email, newPassword, confirmPassword}

        //console.log(details);

        axios.post(`${data.host}api/v1/agent/passwords/update?token=${data.token}`, details)
        .then(res => {
          return res.data == '200'? this.setState({ loading: false, error: 'This user is not registered' }) : window.location = '/auth/login'
          
        }).catch(err => {
          this.setState({ loading: false, error: 'Access Denied!' });
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
                    <h4>Reset Password</h4>
                  </div>

                  <div className="card-body">
                    <p className="text-muted">
                      Create your new password
                    </p>
                    <form onSubmit={this.onSubmit}>
                        

                      <div className="form-group">
                        <label for="password">New Password</label>
                        <input
                          id="password"
                          type="password"
                          minLength="6"
                          onChange={this.newPassword}
                          value={this.state.newPassword}
                          className="form-control pwstrength"
                          data-indicator="pwindicator"
                          name="password"
                          tabindex="2"
                          required
                        />
                        <div id="pwindicator" className="pwindicator">
                          <div className="bar"></div>
                          <div className="label"></div>
                        </div>
                      </div>

                      <div className="form-group">
                        <label for="password-confirm">Confirm Password</label>
                        <input
                          id="password-confirm"
                          type="password"
                          minLength="6"
                          onChange={this.confirmPassword}
                          value={this.state.confirmPassword}
                          className="form-control"
                          name="confirm-password"
                          tabindex="2"
                          required
                        />
                      </div>

                      <div className="form-group">
                       {this.state.loading? this.Loaderview() : <button
                          type="submit"
                          className="btn btn-primary btn-lg btn-block"
                          tabindex="4"
                        >
                          Reset Password
                        </button>}
                      </div>
                    </form>
                    <div className="text-center p-t-30">
																	<p style={{color:"red"}} className="txt1">
																		{this.state.error}
																	</p>
                                  </div>
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

export default ResetPassword;
