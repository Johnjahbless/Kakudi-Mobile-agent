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
            <h1>Withdraw Money</h1>
            <div className="section-header-breadcrumb">
              <div className="breadcrumb-item active"><Link to="/">Dashboard</Link></div>
              <div className="breadcrumb-item active"><Link to="/wallet">Wallet</Link></div>
              <div className="breadcrumb-item">Withdraw Money</div>
            </div>
          </div>

          <div className="row">
            <div className="col-12 col-sm-12 col-lg-8">
              <div className="card">
                <div className="card-header">
                  <h4>Enter bank details</h4>
                </div>
                <div className="card-body pb-5">

                                <form>
                  <div className="row">
                    <div className="form-group col-6">
                      <label for="account_number">Account Number</label>
                      <input id="account_number" placeholder="Enter Beneficiary’s Account Number" required type="number" className="form-control" name="account_number" autofocus />
                    </div>
                    <div className="form-group col-6">
                      <label>Bank Name</label>
                      <select className="form-control selectric">
                        <option>Fidelity Bank</option>
                        <option>Access Bank</option>
                      </select>
                    </div>
                  </div>

                  <div className="row">
                    <div className="form-group col-6">
                      <label for="notes">Personalized note</label>
                      <input id="notes" placeholder="Type in a narration" required type="text" className="form-control" name="notes" />
                    </div>
                    <div className="form-group col-6">
                      <label for="amount">Amount</label>
                      <input id="amount" placeholder="Enter Amount" required type="number" className="form-control" name="amount" />
                    </div>
                  </div>

                  <div className="form-group">
                    <div className="custom-control custom-checkbox">
                      <input type="checkbox" name="save_details" className="custom-control-input" id="save_details" />
                      <label className="custom-control-label" for="save_details">Save bank details</label>
                    </div>
                  </div>

                  <div className="form-group">
                    <button type="submit" className="btn btn-primary btn-lg btn-block" data-toggle="modal" data-target="#mediumModal">
                      Send Money now
                    </button>
                  </div>
                </form>
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
                <div className="card-header">
                  <img className="mx-auto d-block" src="../assets/img/success_icon.svg" alt="" />

                </div>
                <h4 className="mx-auto display-5 py-3">Congratulations!!!</h4>

                <div className="card-body mx-auto">
                  <p className="text-center">Your have successfully sent <br /> <span className="font-weight-bold">amount</span> to <span className="font-weight-bold">Name of Beneficiary</span> </p>
                  <a className="btn btn-outline-primary py-2 btn-lg btn-block rounded" href="index.html">Return Home</a>

                </div>
              </div>
              </div>
            </div>
          </div>
        </div>
</>
    );
  }
}

export default Profile;
