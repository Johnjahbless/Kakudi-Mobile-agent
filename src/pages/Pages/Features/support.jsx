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
                </div>
                <div className="card-body">
                  <div className="table-responsive">
                    <table className="table table-striped" id="table-1">
                      <thead>
                        <tr>
                          <th className="text-center">
                            #
                          </th>
                          <th>Subject</th>
                          <th>Ticket ID</th>
                          <th>Description</th>
                          <th>Last Update</th>
                          <th>Status</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>
                            1
                          </td>
                          <td>Suspended account </td>
                          <td>#23421235 </td>
                          <td className="">My account was suspended...</td>
                          <td>2018-01-20</td>
                          <td><div className="badge badge-warning">Processing</div></td>
                          <td><a href="#" className="btn btn-secondary">Detail</a></td>
                        </tr>
                        
                      </tbody>
                    </table>
                    
                  </div>
                </div>
              </div>
            </div>


            <div className="col-12 col-sm-12 col-lg-4">
              <div className="card py-5">
                <div className="card-body">
                  <div className="col-12 text-center">
                  <img className="d-block mx-auto" src="../assets/img/Knowledge Center 1.svg" alt="" />
                  <a href="#" className="btn btn-outline-dark rounded mt-3" type="button">Visit Knowledge Center</a>
                  </div>
                </div>
              </div>
            </div>




          </div>

          <div className="section-body">
            <div className="row">
              <div className="col-8">
                <div className="card">
                  <div className="card-header">
                    <h4>Create a Support Ticket</h4>
                  </div>
                  <div className="card-body">
                  <div className="row">
                    <div className="form-group col-6">
                      <label for="account_number">Subject</label>
                      <input id="account_number" placeholder="Enter Your Phone Number" required type="text" className="form-control" name="phone_number" autofocus />
                    </div>
                    <div className="form-group col-6">
                      <label>Category</label>
                      <select className="form-control selectric">
                        <option>Select Category Type</option>
                        <option>Airtime Recharge</option>
                          <option>Data Recharge</option>
                          <option>Withdrawal</option>
                          <option>Referall</option>
                      </select>
                    </div>
                  </div>
                  <div className="row">
                    <div className="form-group col-6">
                      <label for="account_number">Describe the Issue</label>
                      <textarea className="form-control" name="description" rows="8" cols="80"></textarea>
                    </div>
                    <div className="form-group col-6">
                      <label>Attach any supporting screenshot</label>
                      <input id="account_number" placeholder="Enter Your Phone Number" required type="file" className="form-control" name="picture" autofocus />
                    </div>
                  </div>
                   
                   
                    <div className="form-group row mb-12">
                      
                      <div className="col-md-12">
                        <button className="btn btn-primary form-control">Submit now</button>
                      </div>
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

export default Profile;
