import React, { Component } from "react";
import axios from 'axios';
import $ from 'jquery';
import { Link } from 'react-router-dom';
import data from '../../../components/constants';
import Loading from './loader';

export class Profile extends Component {
   constructor(props) {
         super(props);
 
         this.onChangeCardNumber = this.onChangeCardNumber.bind(this);
         this.onChangeCardExpiryMonth = this.onChangeCardExpiryMonth.bind(this);
         this.onChangeCardExpiryYear = this.onChangeCardExpiryYear.bind(this);
         this.onChangeCardCvv = this.onChangeCardCvv.bind(this);
         this.onSubmit = this.onSubmit.bind(this);
         
         this.state = { 
           cardNumber: '',
           month: '',
           year: '',
           cvv: '',
           loading: false
         }
 }
  componentDidMount() {}

  componentWillUnmount() {
    $('#congratulationModal').modal('hide');
   }

   onChangeCardNumber(e) {
    this.setState({cardNumber: e.target.value});
  }
  
  onChangeCardExpiryMonth(e) {
    this.setState({month: e.target.value});
  }
  
  onChangeCardExpiryYear(e) {
    this.setState({year: e.target.value});
  }
  
  onChangeCardCvv(e) {
    this.setState({cvv: e.target.value});
  }
  
  onSubmit(e) {
    e.preventDefault();
  
    const { cardNumber, month, year, cvv } = this.state;
  
     
      
      this.setState({ loading: true, error: '' })
  
      const details = { cardNumber, month, year, cvv }
  
  
   axios.post(`${data.host}api/v1/agent/card/add?token=${data.token}`, details)
          .then(res => {
            if (res.data == '200') return this.setState({ loading: false, error: "This card details already exit"});
            this.setState({ loading: false, error: 'Card Successfully added', cardNumber: '', month: '', year: '', cvv: ''});
            $('#congratulationModal').modal('show');
          }).catch(err => {
            this.setState({ loading: false, error: err.toString() });
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

                            

                                  <div id="nav-tab-card" className="tab-pane fade show active">
                                    <form onSubmit={this.onSubmit}>
                                      <div className="form-group">
                                        <label for="cardNumber">Card number</label>
                                        <div className="input-group">
                                        <input type="text" name="cardNumber" onChange={this.onChangeCardNumber} value={this.state.cardNumber} minLength="15" maxLength="15" placeholder="Your card number" className="form-control" required />
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
                                            <input type="text" placeholder="MM" name="" onChange={this.onChangeCardExpiryMonth} value={this.state.month} maxLength="2" minLength="2" className="form-control" required />
                              <input type="text" placeholder="YY" name="" onChange={this.onChangeCardExpiryYear} value={this.state.year} maxLength="2" minLength="2" className="form-control" required />
                            </div>
                                          </div>
                                        </div>
                                        <div className="col-sm-4">
                                          <div className="form-group mb-4">
                                            <label data-toggle="tooltip" title="Three-digits code on the back of your card">CVV
                                                                        <i className="fa fa-question-circle"></i>
                                                                    </label>
                                                                    <input type="text" required onChange={this.onChangeCardCvv} value={this.state.cvv} maxLength="3" minLength="3" className="form-control" />
                             </div>
                                        </div>



                                      </div>
                                      { this.state.loading? this.Loaderview() : <button type="submit" className="subscribe btn btn-primary btn-block rounded-pill shadow-sm"> PROCEED  </button>}
                                    </form>
                                    <div className="text-center p-t-30">
																	<p className="txt1">
																		{this.state.error}
																	</p>
                                  </div>
                                  </div>

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
                  <p className="text-center font-weight-bold">Your have successfully added a Debit card</p>
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
