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
            <h1>Add Card</h1>
            <div className="section-header-breadcrumb">
              <div className="breadcrumb-item active"><Link to="/">Dashboard</Link></div>
              <div className="breadcrumb-item"><Link to="/wallet">Wallet</Link></div>
              <div className="breadcrumb-item">Add Card</div>
            </div>
          </div>

          <div className="row">
            <div className="col-12 col-sm-12 col-lg-7">
              <div className="card">
                <div className="card-header">
                  <h4>Enter your card information</h4>
                </div>
                <div className="card-body pb-5">
                  <p>For security reasons. this card will be debited with a random amount not more than NGN 50. This amount will be credited to your Kakudi Wallet upon verification</p>

                              <form >

                                  <div id="nav-tab-card" className="tab-pane fade show active">
                                    <form role="form">
                                      <div className="form-group">
                                        <label for="cardNumber">Card number</label>
                                        <div className="input-group">
                                          <input type="text" name="cardNumber" placeholder="Your card number" className="form-control" required />
                                          <div className="input-group-append">
                                            <span className="input-group-text text-muted">
                                                                        <i className="fa fa-cc-visa mx-1"></i>
                                                                        <i className="fa fa-cc-amex mx-1"></i>
                                                                        <i className="fa fa-cc-mastercard mx-1"></i>
                                                                    </span>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="row">
                                        <div className="col-sm-8">
                                          <div className="form-group">
                                            <label><span className="hidden-xs">Expiration</span></label>
                                            <div className="input-group">
                                              <input type="number" placeholder="MM" name="" className="form-control" required />
                                              <input type="number" placeholder="YY" name="" className="form-control" required />
                                            </div>
                                          </div>
                                        </div>
                                        <div className="col-sm-4">
                                          <div className="form-group mb-4">
                                            <label data-toggle="tooltip" title="Three-digits code on the back of your card">CVV
                                                                        <i className="fa fa-question-circle"></i>
                                                                    </label>
                                            <input type="text" required className="form-control" />
                                          </div>
                                        </div>



                                      </div>
                                      <button type="button" className="subscribe btn btn-primary btn-block rounded-pill shadow-sm" data-toggle="modal" data-target="#congratulationModal"> PROCEED  </button>
                                    </form>
                                  </div>


                </form>
                </div>
                </div>
              </div>
            </div>
          



        </section>
        </div>

<div className="modal fade" id="congratulationModal" tabindex="-1" role="dialog" aria-labelledby="congratulationModalLabel" aria-hidden="true">
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
                  <p className="text-center font-weight-bold">Your have successfully added a Debit card to your wallet</p>
                  <Link to="/" className="btn btn-outline-primary py-2 btn-lg btn-block rounded" >Return Home</Link>

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
