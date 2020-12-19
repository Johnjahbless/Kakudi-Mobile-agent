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
   
      axios.get(`${data.host}api/v1/student?token=${data.token}`)
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


 axios.post(`${data.host}api/v1/student/password/update?token=${data.token}`, details)
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
              <div className="breadcrumb-item">Settings</div>
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
                    <li className="nav-item"><a href="#" className="nav-link active">Edit Profile</a></li>
                    <li className="nav-item"><Link to="/change-password" className="nav-link">Change your password</Link></li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-md-8">
              <form id="setting-form">
                <div className="card" id="settings-card">
                  <div className="card-header">
                    <h4>Edit Profile</h4>
                  </div>
                  <div className="card-body">
                    <p className="text-muted">Update your profile information</p>
                    <div className="form-group row align-items-center">
                      <label for="agent_name" className="form-control-label col-sm-3 text-md-right">Name</label>
                      <div className="col-sm-6 col-md-9">
                        <input type="text" name="agent_name" value="Bright Emeka" disabled className="form-control" id="agent_name" />
                      </div>
                    </div>
                    <div className="form-group row align-items-center">
                      <label for="agent_email" className="form-control-label col-sm-3 text-md-right">Email Address</label>
                      <div className="col-sm-6 col-md-9">
                        <input type="email" name="agent_email" value="bright@jdlab.ng" className="form-control" id="agent_email" />
                      </div>
                    </div>

                    <div className="form-group row align-items-center">
                      <label for="agent_number" className="form-control-label col-sm-3 text-md-right">Phone Number</label>
                      <div className="col-sm-6 col-md-9">
                        <input type="number" name="agent_number" value="07036393334" className="form-control" id="agent_number" />
                      </div>
                    </div>
                    <div className="form-group row align-items-center">
                      <label className="form-control-label col-sm-3 text-md-right">Profile picture</label>
                      <div className="col-sm-6 col-md-9">
                        <div className="custom-file">
                          <input type="file" name="agent_img" className="custom-file-input" id="agent_img" />
                          <label className="custom-file-label">Select Profile picture</label>
                        </div>
                        <div className="form-text text-muted">The image must have a minimum size of 1MB</div>
                      </div>
                    </div>

                  </div>

                  <div className="card-footer bg-whitesmoke text-md-right">
                    <button className="btn btn-primary" id="save-btn">Save Changes</button>
                    <button className="btn btn-secondary" type="button">Reset</button>
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
