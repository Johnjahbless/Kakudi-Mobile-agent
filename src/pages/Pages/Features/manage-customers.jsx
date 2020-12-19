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
 


      var customerChart = document.getElementById('customersChart').getContext('2d');
var customersChart = new Chart(customerChart, {
    title:{
		text: "Customers Chart",
		verticalAlign: "center",
		dockInsidePlotArea: true
	},
    // The type of chart we want to create
    type: 'doughnut',
    showInLegend: true,

    // The data for our dataset
    data: {
        labels: ['ACTIVE CUSTOMERS', 'SUSPENDED CUSTOMERS'],
        datasets: [{
            label: 'Salary Projection',
            data: [85, 15],
            backgroundColor: [
                '#5E3DF2',
                '#2ED47A'
            ],
            borderColor: [
                '#5E3DF2',
                '#2ED47A'
            ],
            borderWidth: 1
        }]
    },
    options: {}
});



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
            <h1>Customer Management</h1>
            <div className="section-header-breadcrumb">
              <div className="breadcrumb-item active"><Link to="/">Dashboard</Link></div>
              <div className="breadcrumb-item">Customer Management</div>
            </div>
          </div>


          <div className="row">
              
            <div className="col-12 col-sm-12 col-lg-4">
                <div className="card">
                  <div className="card-header">
                    <h4>CUSTOMERS</h4>
                    <div className="card-header-action">
                        <button className="btn btn-outline-secondary" data-toggle="modal" data-target="#mediumModal">Add Customer <i className="fas fa-plus-circle"></i></button>
                      </div>
                  </div>
                  <div className="card-body">
                    <canvas id="customersChart" height="302"></canvas>
                  </div>
                </div>
              </div>

          </div>

     

     <div className="row">
      <div className="col-12">
        <div className="card">
          <div className="card-header">
            <h4>Recent User Activity</h4>
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
                    <th>Description</th>
                    <th>KiD</th>
                    <th>Recent Activity</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      1
                    </td>
                    <td>Ibrahim Aliyu</td>
                    <td>MTN Airtime Recharge</td>
                    <td>128589935</td>
                    <td>5 Minutes ago</td>
                    <td><div className="badge badge-success">Active</div></td>
                    <td><Link to="/customer-profile" className="btn btn-secondary">Detail</Link></td>
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

        <div className="modal fade" id="mediumModal" tabindex="-1" role="dialog" aria-labelledby="mediumModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-lg" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                <div className="card card-primary">
                  <div className="card-header"><h4>SIGN UP</h4></div>
    
                  <div className="card-body">
                    <form className="needs-validation" novalidate="">
                      <div className="row">
                        <div className="form-group col-6">
                          <label for="first_name">First Name</label>
                          <input id="first_name" placeholder="Enter first name" required type="text" className="form-control" name="first_name" autofocus />
                        </div>
                        <div className="form-group col-6">
                          <label for="last_name">Last Name</label>
                          <input id="last_name" placeholder="Enter Your last name" required type="text" className="form-control" name="last_name" />
                        </div>                   
    
                      </div>
                      <div className="row">
                        <div className="form-group col-6">
                          <label for="phone_number">Phone Number</label>
                          <input id="phone_number" placeholder="Enter Your Phone Number" required type="number" className="form-control" name="phone_number" />
                        </div>
                        <div className="form-group col-6">
                          <label for="email_address">Email Address</label>
                          <input id="email_address" placeholder="Enter Your email" required type="email" className="form-control" name="email_address" />
                        </div>
                      </div>
    
                      <div className="row">
                        <div className="form-group col-12">
                          <label for="referral_method">How did you hear about us</label>
                          <input id="referral_method" placeholder="Facebook / Twitter / Email / Radio Advert / TV Advert / Kakudi Agent" required type="text" className="form-control" name="referral_method" />
                        </div>
                      </div>                
    
                      <div className="row">
                        <div className="form-group col-6">
                          <label for="password" className="d-block">PIN</label>
                          <input id="password" type="password" className="form-control pwstrength" data-indicator="pwindicator" name="password" />
                          <div id="pwindicator" className="pwindicator">
                            <div className="bar"></div>
                            <div className="label"></div>
                          </div>
                        </div>
                        <div className="form-group col-6">
                          <label for="password2" className="d-block">PIN Confirmation</label>
                          <input id="password2" type="password" className="form-control" name="password-confirm" />
                        </div>
                      </div>
    
                      <div className="form-group">
                        <div className="custom-control custom-checkbox">
                          <input type="checkbox" name="agree" className="custom-control-input" id="agree" />
                          <label className="custom-control-label" for="agree">I agree with the terms and conditions</label>
                        </div>
                      </div>
    
                      <button type="submit" className="btn btn-primary">
                          Register
                        </button>
                        
                  <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                    </form>
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
