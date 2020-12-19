import React, { Component } from "react";
import axios from 'axios';
import $ from 'jquery';
import { Link } from 'react-router-dom';
import Chart from 'chart.js';
import data from '../../../components/constants';
import Loading from './loader';

export class Profile extends Component {
   constructor(props) {
         super(props);
 
         
         this.state = {
             name: '',
             image: '',
             logTime: '',
             state: '',
             metricNo:'',
             lga: '',
             department: '',
             programme: '',
             gender: '',
             loading: false,
             student: []
         }
 }
  componentDidMount() {
   
    $(document).ready(() => {
        $('#table-1').DataTable({ 
            lengthChange: true,
            dom: 'Bfrtip',
          });
          
        });

      axios.get(`${data.host}api/v1/student?token=${data.token}`)
      .then(response => {
        // eslint-disable-next-line
        this.setState({student: response.data[0], state:response.data[0].state, lga: response.data[0].lga, metricNo: response.data[0].metricNo, department: response.data[0].department, programme: response.data[0].programme, gender: response.data[0].gender, image: response.data[0].image, name: response.data[0].firstname + ' ' + response.data[0].othername, logTime: response.data[0].last_logout})
      }).catch((error) => {console.log(error)});
 



}

        Loaderview() {
        return this.state.loading? <Loading /> : null
        
    }
  render() {
    return (
        <>
      <div className="main-content">
       
       <section className="section">
  
       <div className="section-header">
            <h1>John Profile</h1>
            <div className="section-header-breadcrumb">
              <div className="breadcrumb-item active"><Link to="/">Dashboard</Link></div>
              <div className="breadcrumb-item">User Profile</div>
            </div>
          </div>

          <div className="row mt-sm-4">
            <div className="col-12 col-md-12 col-lg-5">
              <div className="card profile-widget">
                <div className="profile-widget-header">
                  <img alt="image" src="../assets/img/avatar/avatar-1.png" className="rounded-circle profile-widget-picture" />
                  <div className="profile-widget-items">
                    <div className="profile-widget-item">
                      <div className="profile-widget-item-label">Wallet Balance</div>
                      <div className="profile-widget-item-value">18,700</div>
                    </div>
                    <div className="profile-widget-item">
                      <div className="profile-widget-item-label">Completed Transactions</div>
                      <div className="profile-widget-item-value">68</div>
                    </div>
                  </div>
                </div>
                <div className="profile-widget-description">
                  <div className="profile-widget-name">Ujang Maman <div className="text-muted d-inline font-weight-normal"><div className="slash"></div> Kakudi Mobile Customer</div></div>
                </div>
              </div>
            </div>
     
            <div className="col-12 col-md-12 col-lg-7">
              <div className="card">
                <form className="needs-validation" novalidate="">
                  <div className="card-header">
                    <h4>Edit Profile</h4>
                  </div>
                  <div className="card-body">
                      <div className="row">
                        <div className="form-group col-md-6 col-12">
                          <label>First Name</label>
                          <input type="text" className="form-control" value="Ujang" required="" />
                          <div className="invalid-feedback">
                            Please fill in the first name
                          </div>
                        </div>
                        <div className="form-group col-md-6 col-12">
                          <label>Last Name</label>
                          <input type="text" className="form-control" value="Maman" required="" />
                          <div className="invalid-feedback">
                            Please fill in the last name
                          </div>
                        </div>
                      </div>
                
                      <div className="row">
                        <div className="form-group col-md-6 col-12">
                          <label>KiD</label>
                          <input type="text" className="form-control" disabled value="12354535123" required="" />
                          <div className="invalid-feedback">
                            Please fill in the KiD
                          </div>
                        </div>
                        <div className="form-group col-md-6 col-12">
                          <label>Status</label>
                          <select className="form-control" >
                            <option>Active</option>
                            <option>Suspended</option>
                            <option>Blocked</option>
                          </select>
                          <div className="invalid-feedback">
                            Please fill in the last name
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="form-group col-md-7 col-12">
                          <label>Email</label>
                          <input type="email" className="form-control" value="ujang@maman.com" required="" />
                          <div className="invalid-feedback">
                            Please fill in the email
                          </div>
                        </div>
                        <div className="form-group col-md-5 col-12">
                          <label>Phone</label>
                          <input type="tel" className="form-control" value="" />
                        </div>
                      </div>
                  
                  <div className="card-footer text-right">
                    <button className="btn btn-primary">Save Changes</button>
                    <button className="btn btn-secondary" type="button">Reset Password</button>
                  </div>
                  </div>
                </form>
              </div>
            </div>
          </div>

        
          

     <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <h4>Recent Activity</h4>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-striped" id="table-1">
                  <thead>
                    <tr>
                      <th className="text-center">
                        #
                      </th>
                      <th>Transaction ID</th>
                      <th>Description</th>
                      <th>Date</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        1
                      </td>
                      <td>128589935</td>
                      <td>MTN Airtime Recharge</td>
                      <td>5 Minutes ago</td>
                      <td><div className="badge badge-success">Completed</div></td>
                      <td><Link to="/" className="btn btn-secondary">Detail</Link></td>
                    </tr>
                    
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
  




        </section>
        </div>
        
        
</>
    );
  }
}

export default Profile;
