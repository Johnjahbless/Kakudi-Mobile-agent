import React, { Component } from "react";
import axios from 'axios';
import $ from 'jquery';
import { Link } from 'react-router-dom';
import Chart from 'chart.js';
import data from '../../../components/constants';
import Loading from './loader';


const Activity = props => (
  <tr>
    <td>
      {props.i}
    </td>
    <td>{props.firstName + ' ' + props.lastName}</td>
    <td>{props.role == 2 ? 'Agent' : 'Customer'}</td>
    <td>{props.kid}</td>
    <td>{props.description}</td>
    <td><div className="badge badge-success">{props.status}</div></td>
    <td><Link to={"/ticket/" + props.userId} className="btn btn-secondary">Details</Link></td>
  </tr>
)

export class Profile extends Component {
   constructor(props) {
         super(props);
 
         this.onChangeSubject = this.onChangeSubject.bind(this);
         this.onChangeCategory = this.onChangeCategory.bind(this);
         this.onChangeDescription = this.onChangeDescription.bind(this);
         this.handleImageUpload = this.handleImageUpload.bind(this);
         this.onSubmit = this.onSubmit.bind(this);
         this.onSelect = this.onSelect.bind(this); 
         
         this.state = {
          subject: '',
          kid: '',
          fileName: 'Choose File',
          category: '0',
          description: '',
          image: '',
          loading: true,
          supports: [],
         }
 }
  componentDidMount() {
   

    axios.get(`${data.host}api/v1/supports?token=${data.token}`)
      .then(response => {
        // eslint-disable-next-line
        $(document).ready(() => {
          $('#table-1').DataTable({
            lengthChange: true,
            dom: 'Bfrtip',
          });

        });
        this.setState({ loading: false, supports: response.data})
      }).catch((error) => { console.log(error) });
}

onChangeSubject(e) {
  this.setState({ subject: e.target.value })
}


onChangeCategory(e) {
  this.setState({ category: e.target.value })
}

onChangeDescription(e) {
  this.setState({ description: e.target.value })
}

onSelect(e) {
  const { files } = document.querySelector('input[type="file"]');
  
  this.setState({fileName: files[0].name});
}

onSubmit(e) {
  e.preventDefault();
  if (this.state.category == '0') return this.setState({ error: 'Please select a category' });
  const { files } = document.querySelector('input[type="file"]');

  if (files.length !== 0) this.handleImageUpload(); else this.sendToDatabase();
}

sendToDatabase(image) {
  const { subject, kid, category, description } = this.state;



  this.setState({ loading: true, error: '' });

  const details = {
    subject: subject,
    category: category,
    description: description,
    image: image
  }

  axios.post(`${data.host}api/v1/issues/add?token=${data.token}`, details)
    .then(res => {
      if (res.data == '200') return this.setState({ loading: false, error: "You're blacklisted"});
      $('#mediumModal').modal('hide');
      this.setState({ error: 'Successfully added' });
      this.getAllSupports()

    }).catch(err => {
      this.setState({ loading: false, error: err.toString() });
    });

}
handleImageUpload(e) {
  this.setState({ loading: true, error: '' })
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


getAllSupports() {
  axios.get(`${data.host}api/v1/supports?token=${data.token}`)
    .then(response => {
      this.setState({ loading: false, supports: response.data})
    }).catch((error) => { console.log(error) });
}


activityView() {
  return this.state.supports.map((t, index) => {
    return <Activity {...t} i={index} key={t.id} />
  })
}

        Loaderview() {
        return this.state.loading? <Loading /> : null
        
    }
  render() {
    return (
        <>
      <div className="main-content">
       
       <section className="section" >
       <div className="section-header">
            <h1>Support and Help</h1>
            <div className="section-header-breadcrumb">
              <div className="breadcrumb-item active"><Link to="/">Dashboard</Link></div>
              <div className="breadcrumb-item">Support and Help</div>
            </div>
          </div>

          <div className="row">
            <div className="col-12 col-lg-8">
              <div className="card">
                <div className="card-header">
                  <h4>Support Tickets</h4>
                  <div className="card-header-action">
                      <button className="btn btn-outline-secondary" data-toggle="modal" data-target="#mediumModal">Create new support Ticket <i className="fas fa-plus-circle"></i></button>
                    </div>
                </div>
                <div className="card-body">
                  <div className="table-responsive">
                  <table className="table table-striped" id="table-1">
                        <thead>
                          <tr>
                            <th className="text-center">
                              #
                    </th>
                            <th>Name</th>
                            <th>Role</th>
                            <th>KiD</th>
                            <th>Subject</th>
                            <th>Status</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {this.activityView()}

                        </tbody>
                      </table>

                      {this.Loaderview()}
                      <div className="text-center p-t-30">
                        <p className="txt1">
                          {this.state.error}
                        </p>
                      </div>
                    
                  </div>
                </div>
              </div>
            </div>


            <div className="col-12 col-sm-12 col-lg-4">
              <div className="card py-5">
                <div className="card-body">
                  <div className="col-12 text-center">
                  <img className="d-block mx-auto" src="../assets/img/Knowledge Center 1.svg" alt="" />
                  <a href="#/" className="btn btn-outline-dark rounded mt-3" type="button">Visit Knowledge Center</a>
                  </div>
                </div>
              </div>
            </div>




          </div>
</section>
        </div>

<div className="modal fade" id="mediumModal" tabindex="-1" role="dialog" aria-labelledby="mediumModalLabel" aria-hidden="true">
<div className="modal-dialog modal-lg" role="document">
  <div className="modal-content">
    <div className="modal-header">
      <button type="button" className="close" data-dismiss="modal" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div className="modal-body">
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <h4>Create a Support Ticket</h4>
            </div>
            <div className="card-body">
              <form onSubmit={this.onSubmit}>
                <div className="form-group row mb-12">
                  <label className="col-form-label text-md-right col-12 col-md-3 col-lg-3">Subject</label>
                  <div className="col-sm-12 col-md-7">
                    <input type="text" className="form-control" onChange={this.onChangeSubject} value={this.state.subject} required />
                  </div>
                </div>
               
                <div className="form-group row mb-4">
                  <label className="col-form-label text-md-right col-12 col-md-3 col-lg-3">Category</label>
                  <div className="col-sm-12 col-md-7">
                    <select className="form-control" onChange={this.onChangeCategory} required>
                      <option value="0">Select</option>
                      <option value="1">Transfer</option>
                      <option value="2">Wallet Topup</option>
                      <option value="4">Airtime Recharge</option>
                      <option value="5">Data Recharge</option>
                      <option value="3">Withdrawal</option>
                      <option value="6">Referral</option>
                    </select>
                  </div>
                </div>
                <div className="form-group row mb-4">
                  <label className="col-form-label text-md-right col-12 col-md-3 col-lg-3">Describe the Issue</label>
                  <div className="col-sm-12 col-md-7">
                    <textarea className="form-control" cols="80" rows="4" onChange={this.onChangeDescription} value={this.state.description} required></textarea>
                  </div>
                </div>
                <div className="form-group row mb-4">
                  <label className="col-form-label text-md-right col-12 col-md-3 col-lg-3">Attach any supporting screenshot</label>
                  <div className="col-sm-12 col-md-7">
                    <div id="image-preview" className="image-preview">
                      <label for="image-upload" id="image-label">{this.state.fileName}</label>
                      <input type="file" name="image" id="image-upload" onChange={this.onSelect} className="form-control" accept=".jpg,.png"/>
                    </div>
                  </div>
                </div>
                {this.state.loading ? this.Loaderview() : <>  <button className="btn btn-primary" type="submit">Submit now</button>
                  <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button></>}

                <div className="text-center p-t-30">
                  <p className="txt1">
                    {this.state.error}
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="modal-footer">

    </div>
  </div>
</div>
</div>

</>

    );
  }
}

export default Profile;
