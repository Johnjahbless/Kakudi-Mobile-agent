import React, { Component } from 'react';
import axios from 'axios';
import md5 from 'md5';
import { Link } from 'react-router-dom';
import data from '../../../components/constants';
import Loading from './loader';

export default class Settings extends Component  {
  constructor(props) {
         super(props);
        this.onChangeNewPassword = this.onChangeNewPassword.bind(this);
         this.onChangeConfirmPassword = this.onChangeConfirmPassword.bind(this);
         this.onChangeOldPassword = this.onChangeOldPassword.bind(this);
         this.onSubmit = this.onSubmit.bind(this); 
 
         this.state = {
             newPassword: '',
             oldPassword: '',
             confirmPassword: '',
             recentPassword: '',
             error:'',
             loading: false
         }
     } 

  componentDidMount() {
   
      axios.get(`${data.host}api/v1/agent?token=${data.token}`)
      .then(response => {
        // eslint-disable-next-line
        this.setState({recentPassword: response.data[0].password, loading: false})
      }).catch((error) => {console.log(error)});
  }


onChangeConfirmPassword(e) {
  this.setState({confirmPassword: e.target.value});
}
     onChangeNewPassword(e) {
  this.setState({newPassword: e.target.value});
}
   onChangeOldPassword(e) {
  this.setState({oldPassword: e.target.value});
}
onSubmit(e) {
     e.preventDefault();
     const { oldPassword, newPassword, recentPassword, confirmPassword} = this.state;
 if (md5(oldPassword) !== recentPassword) return this.setState({ error: 'Invalid password'});
 if (newPassword !== confirmPassword) return this.setState({ error: 'Your passwords does not match'});

    this.setState({loading: true, error: ''});
    const details = {
      password: newPassword
    }


 axios.post(`${data.host}api/v1/agent/password/update?token=${data.token}`, details)
        .then(res => {
          this.setState({ loading: false, error: 'Successfully updated', oldPassword: '', newPassword: '', confirmPassword: '' });
          
        }).catch(err => {
          this.setState({ loading: false, error: err.toString() });
        });

      
}
     Loaderview() {
        return this.state.loading? <Loading /> : null
        
    }
render() {
  return (
    <div className="main-content">
      <section className="section">
      <div className="section-header">
            <h1>Settings</h1>
            <div className="section-header-breadcrumb">
              <div className="breadcrumb-item active"><Link to="/">Dashboard</Link></div>
              <div className="breadcrumb-item"><Link to="/settings">Settings</Link></div>
              <div className="breadcrumb-item">Change Password</div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-4">
              <div className="card">
                <div className="card-header">
                  <h4>Profile Settings</h4>
                </div>
                <div className="card-body">
                  <ul className="nav nav-pills flex-column">
                    <li className="nav-item"><Link to="/settings" className="nav-link">Edit Profile</Link></li>
                    <li className="nav-item"><a href="#" className="nav-link active">Change your password</a></li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-md-8">
              <form onSubmit={this.onSubmit}>
                <div className="card" id="settings-card">
                  <div className="card-header">
                    <h4>Password</h4>
                  </div>
                  <div className="card-body">
                    <p className="text-muted">Please provide your current password and choose a new password</p>
                    <div className="form-group row align-items-center">
                      <label for="current_password" className="form-control-label col-sm-3 text-md-right">Current Password</label>
                      <div className="col-sm-6 col-md-9">
                        <input type="password" name="current_password" onChange={this.onChangeOldPassword} value={this.state.oldPassword} className="form-control" id="current_password" autofocus required/>
                      </div>
                    </div>
                    <div className="form-group row align-items-center">
                      <label for="agent_email" className="form-control-label col-sm-3 text-md-right">New Password</label>
                      <div className="col-sm-6 col-md-9">
                        <input type="password" name="new_password"  onChange={this.onChangeNewPassword} value={this.state.newPassword} className="form-control" id="new_password" required/>
                        <div className="form-text text-muted">Your password should be atleast 6 characters long</div>
                      </div>
                    </div>

                    <div className="form-group row align-items-center">
                      <label for="confirm_password" className="form-control-label col-sm-3 text-md-right">Confirm Password</label>
                      <div className="col-sm-6 col-md-9">
                        <input type="password" name="confirm_password"  onChange={this.onChangeConfirmPassword} value={this.state.confirmPassword} className="form-control" id="confirm_password" required/>
                      </div>
                    </div>

                  </div>

                  <div className="card-footer bg-whitesmoke text-md-right">
                    {this.state.loading? this.Loaderview() : <button className="btn btn-primary" type="submit" id="save-btn">Save Changes</button>
                    }
                  </div>
                </div>
              </form>
            </div>
          </div>

      </section>
    </div>
  );
}
}
