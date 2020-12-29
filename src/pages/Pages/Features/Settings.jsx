import React, { Component } from 'react';
import axios from 'axios';
import md5 from 'md5';
import { Link } from 'react-router-dom';
import data from '../../../components/constants';
import Loading from './loader';

export default class Settings extends Component  {
  constructor(props) {
         super(props);
        this.onChangeName = this.onChangeName.bind(this);
         this.onChangeEmail = this.onChangeEmail.bind(this);
         this.onChangePhone = this.onChangePhone.bind(this);
         this.handleImageUpload = this.handleImageUpload.bind(this);
         this.onSubmit = this.onSubmit.bind(this); 
         this.onSelect = this.onSelect.bind(this); 
 
         this.state = {
             image: '',
             name: '',
             email: '',
             phone: '',
             error:'',
             fileName: 'Select profile picture',
             loading: false
         }
     } 

  componentDidMount() {
   
    axios.get(`${data.host}api/v1/agent?token=${data.token}`)
    .then(response => {
      // eslint-disable-next-line
      this.setState({image: response.data[0].image, name: response.data[0].firstname + ' ' + response.data[0].lastname, phone: response.data[0].phone, email: response.data[0].email})
    }).catch((error) => {console.log(error)});
  }


onChangeName(e) {
  this.setState({name: e.target.value});
}
     onChangeEmail(e) {
  this.setState({email: e.target.value});
}
   onChangePhone(e) {
  this.setState({phone: e.target.value});
}
onSelect(e) {
  const { files } = document.querySelector('input[type="file"]');
  
  this.setState({fileName: files[0].name});
}

onSubmit(e) {
     e.preventDefault();
     
     this.setState({loading: true, error: ''});
     const { files } = document.querySelector('input[type="file"]');

     if (files.length !== 0) this.handleImageUpload(); else this.sendToDatabase();
}

        handleImageUpload(e) {
          const { files } = document.querySelector('input[type="file"]')
          const formData = new FormData();
          formData.append('file', files[0]);
          // replace this with your upload preset name
          formData.append('upload_preset', 'dbz1yfes');
          const options = {
            method: 'POST',
            body: formData
          };
      
          return fetch('https://api.Cloudinary.com/v1_1/jdlab-ng/image/upload', options)
            .then(res => res.json())
            .then(res => {
              this.sendToDatabase(res.secure_url)
      
      
            }).catch(err => this.setState({ loading: false, error: err.toString() }));
        }
      
      

        sendToDatabase(imageUrl) {
          const { phone, email, name, image } = this.state;
      
          const details = {
            phone: phone,
            email: email,
            name: name,
            image: imageUrl !== undefined ? imageUrl : image
          }
      
      
       axios.post(`${data.host}api/v1/agent/update?token=${data.token}`, details)
              .then(res => {
                window.location.reload()
                
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
              <form onSubmit={this.onSubmit}>
                <div className="card" id="settings-card">
                  <div className="card-header">
                    <h4>Edit Profile</h4>
                  </div>
                  <div className="card-body">
                    <p className="text-muted">Update your profile information</p>
                    <div className="form-group row align-items-center">
                      <label for="agent_name" className="form-control-label col-sm-3 text-md-right">Name</label>
                      <div className="col-sm-6 col-md-9">
                        <input type="text" name="agent_name" onChange={this.onChangeName} value={this.state.name} className="form-control" id="agent_name" required/>
                      </div>
                    </div>
                    <div className="form-group row align-items-center">
                      <label for="agent_email" className="form-control-label col-sm-3 text-md-right">Email Address</label>
                      <div className="col-sm-6 col-md-9">
                        <input type="email" name="agent_email" onChange={this.onChangeEmail} value={this.state.email}  className="form-control" id="agent_email" required/>
                      </div>
                    </div>

                    <div className="form-group row align-items-center">
                      <label for="agent_number" className="form-control-label col-sm-3 text-md-right">Phone Number</label>
                      <div className="col-sm-6 col-md-9">
                        <input type="number" name="agent_number" onChange={this.onChangePhone} value={this.state.phone} minLength="11" maxLength="11"  className="form-control" id="agent_number" required/>
                      </div>
                    </div>
                    <div className="form-group row align-items-center">
                      <label className="form-control-label col-sm-3 text-md-right">Profile picture</label>
                      <div className="col-sm-6 col-md-9">
                        <div className="custom-file">
                          <input type="file" name="agent_img" onChange={this.onSelect} className="custom-file-input" id="agent_img" accept=".jpg,.png" />
                          <label className="custom-file-label">{this.state.fileName}</label>
                        </div>
                        <div className="form-text text-muted">The image must have a maximum size of 1MB</div>
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
