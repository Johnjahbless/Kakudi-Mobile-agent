import React, { Component } from "react";
import axios from 'axios';
import $ from 'jquery';
import { Link } from 'react-router-dom';
import data from '../../../components/constants';
import Loading from './loader';


const Cards = props => (
  <Link to=""><li onClick={() => { props.pay(props.id) }} className="media mb-3">
  <div className="rounded-circle bg-light p-3 mr-3">
    <i className="fas fa-credit-card"></i>
  </div>
  <div className="media-body">
    <div className="media-title">{props.title}</div>
    <div className="text-small text-muted">{props.card_no.substring(0,4)}************** <div className="bullet"></div> Expires {props.month}/{props.year}</div>
  </div>
</li></Link>
)
export class Profile extends Component {
   constructor(props) {
         super(props);
        this.onChangePhone = this.onChangePhone.bind(this);
        this.onChangePurchaseType = this.onChangePurchaseType.bind(this);
        this.onChangeNetworkType = this.onChangeNetworkType.bind(this);
        this.onChangeAmount = this.onChangeAmount.bind(this);
        this.onChangeSaveDetails = this.onChangeSaveDetails.bind(this);
        this.onChangeCardNumber = this.onChangeCardNumber.bind(this);
        this.onChangeCardExpiryMonth = this.onChangeCardExpiryMonth.bind(this);
        this.onChangeCardExpiryYear = this.onChangeCardExpiryYear.bind(this);
        this.onChangeCardCvv = this.onChangeCardCvv.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onSubmit2 = this.onSubmit2.bind(this);
        this.onPay = this.onPay.bind(this);
        this.onPayCard = this.onPayCard.bind(this);
        
         
         this.state = {
             balance: 0,
             commision: 0,
             cardNumber: '',
             month: '',
             year: '',
             cvv: '',
             phone: '',
             purchaseType: '0',
             networkType: '0',
             amount: 0,
             saveDetails: '',
             loading: false,
             cards: []
         }
 }
  componentDidMount() {
   
    axios.get(`${data.host}api/v1/wallet/balance?token=${data.token}`)
      .then(response => {
        // eslint-disable-next-line
        this.setState({balance: Number.parseFloat(response.data[0].balance)})
      }).catch((error) => {console.log(error)});
      axios.get(`${data.host}api/v1/commission/balance?token=${data.token}`)
      .then(response => {
        // eslint-disable-next-line
        this.setState({commision: Number.parseFloat(response.data[0].balance)})
      }).catch((error) => {console.log(error)});
      axios.get(`${data.host}api/v1/agent/cards?token=${data.token}`)
      .then(response => {
        // eslint-disable-next-line
        this.setState({cards: response.data})
      }).catch((error) => {console.log(error)});
}

 componentWillUnmount() {
  $('#mediumModal').modal('hide');
  $('#congratulationModal').modal('hide');
 }

onChangePhone(e) {
  this.setState({phone: e.target.value});
}

onChangePurchaseType(e) {
  this.setState({purchaseType: e.target.value});
}

onChangeNetworkType(e) {
  this.setState({networkType: e.target.value});
}

onChangeAmount(e) {
  this.setState({amount: e.target.value});
}

onChangeSaveDetails(e) {
  this.setState({saveDetails: e.target.checked});
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

  const { phone, networkType, purchaseType, saveDetails, amount } = this.state;

   if(networkType == '0' || purchaseType == '0') return this.setState({ error: 'Invalid form data filled' });

 
  if(saveDetails){
    
    this.setState({ loading: true, error: '' })

    const details = {
      phone: phone,
      networkType: networkType,
      purchaseType: purchaseType,
      amount: amount
    }


 axios.post(`${data.host}api/v1/agent/beneficiary/add?token=${data.token}`, details)
        .then(res => {
          this.setState({ loading: false, error: 'Beneficiary Successfully added'});
          $('#mediumModal').modal('show');
        }).catch(err => {
          this.setState({ loading: false, error: err.toString() });
        });

        return;
  }
  this.setState({error: '' })
  $('#mediumModal').modal('show');

}


onSubmit2(e) {
  e.preventDefault();

  const { cardNumber, month, year, cvv, amount, phone, purchaseType, networkType } = this.state;


    
    this.setState({ loading: true, error: '' })

    const details = {
      phone: phone,
      networkType: networkType,
      purchaseType: purchaseType,
      amount: amount,
      cardNumber: cardNumber,
      month: month,
      year: year,
      cvv: cvv
    }


 axios.post(`${data.host}api/v1/agent/purchase/?token=${data.token}`, details)
        .then(res => {
          this.setState({ loading: false, error: 'Beneficiary Successfully added'});
          $('#mediumModal').modal('hide');
          $('#congratulationModal').modal('show');
        }).catch(err => {
          this.setState({ loading: false, error: err.toString() });
        });


}

onPay(){
  const { phone, networkType, purchaseType, amount, balance } = this.state;

    if(Number(balance) < 100)return this.setState({ error: 'Please fund your wallet' })
    this.setState({ loading: true, error: '' })

    const details = {
      phone: phone,
      networkType: networkType,
      purchaseType: purchaseType,
      amount: amount
    }


 axios.post(`${data.host}api/v1/agent/wallet/pay?token=${data.token}`, details)
        .then(res => {
          this.setState({ loading: false}); 
          $('#mediumModal').modal('hide');
          $('#congratulationModal').modal('show');
        }).catch(err => {
          this.setState({ loading: false, error: err.toString() });
        });


}


onPayCard(cardId){
  const { phone, networkType, purchaseType, amount } = this.state;

    
    this.setState({ loading: true, error: '' })

    const details = {
      phone: phone,
      networkType: networkType,
      purchaseType: purchaseType,
      amount: amount,
      card: cardId
    }


 axios.post(`${data.host}api/v1/agent/card/pay?token=${data.token}`, details)
        .then(res => {
          this.setState({ loading: false}); 
          $('#mediumModal').modal('hide');
          $('#congratulationModal').modal('show');
        }).catch(err => {
          this.setState({ loading: false, error: err.toString() });
        });
 

}

cardsView() {
  return this.state.cards.map((t, index) => {
       return <Cards {...t} i={index} pay={this.onPayCard} key={t.id}/>
      })
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
            <h1>Recharge</h1>
            <div className="section-header-breadcrumb">
              <div className="breadcrumb-item active"><Link to="/">Dashboard</Link></div>
              <div className="breadcrumb-item">Recharge</div>
            </div>
          </div>

          <div className="row">
            <div className="col-12 col-sm-12 col-lg-8">
              <div className="card">
                <div className="card-header">
                  <h4>Buy Airtime & Data</h4>
                </div>
                <div className="card-body pb-5">

                <form onSubmit={this.onSubmit}>
                  <div className="row">
                    <div className="form-group col-6">
                      <label for="account_number">Phone Number</label>
                      <input id="account_number" minLength="11" maxLength="11" onChange={this.onChangePhone} value={this.state.phone} placeholder="Enter Your Phone Number" required type="phone" className="form-control" name="phone_number" autofocus />
                    </div>
                    <div className="form-group col-6">
                      <label>Airtime/ Data Purchase</label>
                      <select className="form-control" onChange={this.onChangePurchaseType} required>
                        <option value="0">Select Purchase Type</option>
                        <option value="4">Airtime</option>
                        <option value="5">Data</option>
                      </select>
                    </div>
                  </div>

                  <div className="row">
                    <div className="form-group col-6">
                      <label>Select Network Provider</label>
                      <select className="form-control"onChange={this.onChangeNetworkType} required>
                      <option value="0">Select Network</option>
                        <option value="1">MTN NG</option>
                        <option value="2">Globalcom</option>
                        <option value="3">Airtel</option>
                        <option value="4">9mobile</option>
                      </select>
                    </div>

                    <div className="form-group col-6">
                      <label for="amount">Amount</label>
                      <input id="amount" placeholder="Enter Amount" min="100" onChange={this.onChangeAmount} value={this.state.amount} required type="number" className="form-control" name="amount" />
                    </div>
                  </div>

                  <div className="form-group">
                    <div className="custom-control custom-checkbox">
                      <input type="checkbox" name="save_details" className="custom-control-input" onChange={this.onChangeSaveDetails} id="save_details" />
                      <label className="custom-control-label" for="save_details">Save beneficiary details</label>
                    </div>
                  </div>

                  <div className="form-group">
                   {this.state.loading? this.Loaderview() : <button type="submit" className="btn btn-primary btn-lg btn-block">
                      Make Purchase
                    </button>}
                  </div>
                </form>
                <div className="text-center p-t-30">
																	<p className="txt1">
																		{this.state.error}
																	</p>
                                  </div>
                </div>
                </div>
            </div>

            <div className="col-12 col-sm-12 col-lg-4">
              <div className="card">
                <div className="card-header">
                  <h4>Wallet</h4>
                </div>
                <div className="card-body">
                  <div className="card img-fluid">
                    <img className="card-img-top" src="../assets/img/kakudi_card_bg.svg" alt="Card" style={{width:"100%"}} />
                    <div className="card-img-overlay">
                    <div style={{float: "left"}}>
                      <p className="card-text text-white">Current Balance</p>
                      <h4 className="card-title text-white my-3">&#8358; <span>{this.state.balance.toFixed(2)}</span></h4>
                      <p className="card-title text-light mt-3"><Link to="/add-funds" className="text-light">Add funds <i className="fa fa-plus-circle"></i></Link></p>
                      </div>
                      <div style={{float: "right"}}>
                      <p className="card-text text-white">Commision Balance</p>
                      <h4 className="card-title text-white my-3">&#8358; <span>{this.state.commision.toFixed(2)}</span></h4>
                      <p className="card-title text-light mt-3"><Link to="/unload" className="text-light">Unload Commission <i className="fa fa-plus-circle"></i></Link></p>
                      </div>
                    </div>
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
      <div className="card-body">
        <div className="container py-5">
          <div className="row">
            <div className="col-lg-12 mx-auto">
              <div className="bg-white rounded-lg shadow-sm p-5">
                <h4>Choose your payment method</h4>
               
                <ul role="tablist" className="nav bg-light nav-pills rounded-pill nav-fill mb-3">
                  <li className="nav-item">
                    <a data-toggle="pill" href="#nav-tab-card" className="nav-link active rounded-pill">
                                        <i className="fa fa-credit-card"></i>
                                        Debit Card
                                    </a>
                  </li>
                  <li className="nav-item">
                    <a data-toggle="pill" href="#nav-tab-wallet" className="nav-link rounded-pill">
                                        <i className="fa fa-wallet"></i>
                                        Pay with Wallet
                                    </a>
                  </li>
                  <li className="nav-item">
                    <a data-toggle="pill" href="#nav-tab-cards" className="nav-link rounded-pill">
                                        <i className="fa fa-credit-card"></i>
                                         Pay with Saved Cards
                                     </a>
                  </li>
                </ul>
               


                
                <div className="tab-content">

                  
                  <div id="nav-tab-card" className="tab-pane fade show active">
                    <form onSubmit={this.onSubmit2}>
                      <div className="form-group">
                        <label for="cardNumber">Card number</label>
                        <div className="input-group"> 
                          <input type="text" name="cardNumber" onChange={this.onChangeCardNumber} value={this.state.cardNumber} minLength="15" maxLength="15" placeholder="Your card number" className="form-control" required />
                          <div className="input-group-append">
                            <span className="input-group-text text-muted">
                                                       {/* <i className="fa fa-cc-visa mx-1"></i>
                                                        <i className="fa fa-cc-amex mx-1"></i>*/}
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
                      { this.state.loading? this.Loaderview() : <button type="submit" className="subscribe btn btn-primary btn-block rounded-pill shadow-sm"> Confirm  </button>}
                    </form>
                    <div className="text-center p-t-30">
																	<p className="txt1">
																		{this.state.error}
																	</p>
                                  </div>
                  </div>
                 

                 
                  <div id="nav-tab-wallet" className="tab-pane fade">
                    <p>Make Purchasing using funds in Your wallet</p>
                    {this.state.amount <= this.state.balance? <p><button type="button" onClick={this.onPay} className="btn btn-primary rounded-pill"> Pay with Wallet</button></p> :
                    <p className="text-muted">Please do add funds to your wallet to complete this transaction. <Link to="/add-funds">Add Funds Now</Link></p>}
                 {this.state.loading? this.Loaderview() : null}
                  </div>
                 
                  <div id="nav-tab-cards" className="tab-pane fade">
                    <div className="summary-item card-body">
                      <ul className="list-unstyled list-unstyled-border">
                       {this.cardsView()}
                      
                      </ul>
                      <Link to="/add-card"><div className="card-footer bg-whitesmoke text-center">
                        Add a new card <i className="fa fa-plus-circle"></i>
                      </div></Link>
                    </div>
                  </div>
                 
                </div>
               

              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
    </div>
  </div>
</div>
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
          <p className="text-center font-weight-bold">Transaction successful!</p>
          <Link className="btn btn-outline-primary py-2 btn-lg btn-block rounded" to="/">Return Home</Link>

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
