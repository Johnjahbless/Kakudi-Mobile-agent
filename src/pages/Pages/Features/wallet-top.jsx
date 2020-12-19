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
            <h1>Wallet Funding</h1>
            <div className="section-header-breadcrumb">
              <div className="breadcrumb-item active"><Link to="/">Dashboard</Link></div>
              <div className="breadcrumb-item">Wallet Funding</div>
            </div>
          </div>


          <div className="row">
            <div className="col-lg-3 col-md-6 col-sm-6 col-12">
              <div className="card card-statistic-1">
                <div className="card-icon bg-primary">
                  <i className="fas fa-wallet"></i>
                </div>
                <div className="card-wrap">
                  <div className="card-header">
                    <h4>Total Funding Requests</h4>
                  </div>
                  <div className="card-body">
                    25,099
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6 col-12">
              <div className="card card-statistic-1">
                <div className="card-icon bg-danger">
                  <i className="fas fa-ban"></i>
                </div>
                <div className="card-wrap">
                  <div className="card-header">
                    <h4>Cancelled Requests</h4>
                  </div>
                  <div className="card-body">
                    92
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6 col-12">
              <div className="card card-statistic-1">
                <div className="card-icon bg-warning">
                  <i className="fas fa-spinner"></i>
                </div>
                <div className="card-wrap">
                  <div className="card-header">
                    <h4>Pending Requests</h4>
                  </div>
                  <div className="card-body">
                    213
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6 col-12">
              <div className="card card-statistic-1">
                <div className="card-icon bg-success">
                  <i className="fas fa-clipboard-check"></i>
                </div>
                <div className="card-wrap">
                  <div className="card-header">
                    <h4>Resolved Requests</h4>
                  </div>
                  <div className="card-body">
                    18,770
                  </div>
                </div>
              </div>
            </div>
          </div>




     <div className="row">
      <div className="col-12">
        <div className="card">
          <div className="card-header">
            <h4>Wallet Transactions</h4>
            <div className="card-header-action">
                <button className="btn btn-outline-secondary" data-toggle="modal" data-target="#mediumModal">Fund Wallet <i className="fas fa-plus-circle"></i></button>
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
                    <th>Amount</th>
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
                    <td>Sale Taujeed</td>
                    <td>&#8358;50,000</td>
                    <td>128589935</td>
                    <td>5 Minutes ago</td>
                    <td><div className="badge badge-success">Resolved</div></td>
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
        <div className="modal fade" id="mediumModal" tabindex="-1" role="dialog" aria-labelledby="mediumModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-lg" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                <div className="card">
                  <div className="card-header"><h4>WALLET FUNDING</h4></div>
    
                  <div className="card-body">
                    <form className="needs-validation" novalidate="">
                      <div className="row">
                        <div className="form-group col-6">
                          <label for="customer_id">Customer KiD</label>
                          <input id="customer_id" placeholder="Enter Customer's KiD" required type="text" className="form-control" name="customer_id" autofocus />
                        </div>
                        <div className="form-group col-6">
                          <label for="funding_amount">Funding Amount</label>
                          <input id="funding_amount" placeholder="Enter Funding Amount" required type="text" className="form-control" name="funding_amount" />
                        </div>                   
    
                      </div>
                      <div className="row">
                        <div className="form-group col-12">
                          <label for="additional_notes">Addition Notes</label>
                          <input id="additional_notes" placeholder="Addition notes" required type="text" className="form-control" name="additional_notes" />
                        </div>
                      </div>                
    
                      <div className="row">
                        <div className="form-group col-6">
                          <label for="password" className="d-block">Admin PIN</label>
                          <input id="password" type="password" className="form-control pwstrength" data-indicator="pwindicator" name="password" />
                          <div id="pwindicator" className="pwindicator">
                            <div className="bar"></div>
                            <div className="label"></div>
                          </div>
                        </div>
                      </div>
    
    
                    
                    </form>
                  </div>
                </div>
                </div>
                <div className="modal-footer">
                  <button type="submit" className="btn btn-primary btn-lg btn-block">
                    Fund Wallet Now
                  </button>
                  <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                </div>
              </div>
            </div>
          </div>
        
</>
    );
  }
}

export default Profile;
