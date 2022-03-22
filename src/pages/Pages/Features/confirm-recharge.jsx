import React, { Component } from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';
import data from '../../../components/constants';
import Loading from './loader';
import Cookies from 'universal-cookie';
import $ from 'jquery';

const cookies = new Cookies();


const Cards = props => (
  <Link to=""><li onClick={() => { props.pay(props.id) }} className="media mb-3">
    <div className="rounded-circle bg-light p-3 mr-3">
      <i className="fas fa-credit-card"></i>
    </div>
    <div className="media-body">
      <div className="media-title">{props.title}</div>
      <div className="text-small text-muted">{props.card_no.substring(0, 4)}************** <div className="bullet"></div> Expires {props.month}/{props.year}</div>
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
      balanceAmount: 0,
      saveDetails: '',
      loading: false,
      cards: [],
      matches: window.matchMedia("(min-width: 768px)").matches 
    }
  }
  componentDidMount() {

    const handler = e => this.setState({matches: e.matches});
    window.matchMedia("(min-width: 768px)").addListener(handler);
    const rechargeDetails = cookies.get('__recharge');

    if (rechargeDetails !== undefined) this.setState({ phone: rechargeDetails.phone, networkType: rechargeDetails.networkType, purchaseType: rechargeDetails.purchaseType, amount: rechargeDetails.amount }); else return window.location = 'recharge';

    axios.get(`${data.host}api/v1/wallet/balance?token=${data.token}`)
      .then(response => {
        // eslint-disable-next-line
        this.setState({ balance: response.data[0].balance.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'), balanceAmount: response.data[0].balance  })
      }).catch((error) => { console.log(error) });

    axios.get(`${data.host}api/v1/agent/cards?token=${data.token}`)
      .then(response => {
        // eslint-disable-next-line
        this.setState({ cards: response.data })
      }).catch((error) => { console.log(error) });

      axios.get(`${data.host}api/v1/commission/balance?token=${data.token}`)
      .then(response => {
        // eslint-disable-next-line
        this.setState({commision: response.data[0].balance.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')})
      }).catch((error) => {console.log(error)});
  }

  componentWillUnmount() {
    $('#congratulationModal').modal('hide');
  }


  onChangePhone(e) {
    this.setState({ phone: e.target.value });
  }

  onChangePurchaseType(e) {
    this.setState({ purchaseType: e.target.value });
  }

  onChangeNetworkType(e) {
    this.setState({ networkType: e.target.value });
  }

  onChangeAmount(e) {
    this.setState({ amount: e.target.value });
  }

  onChangeSaveDetails(e) {
    this.setState({ saveDetails: e.target.checked });
  }

  onChangeCardNumber(e) {
    this.setState({ cardNumber: e.target.value });
  }

  onChangeCardExpiryMonth(e) {
    this.setState({ month: e.target.value });
  }

  onChangeCardExpiryYear(e) {
    this.setState({ year: e.target.value });
  }

  onChangeCardCvv(e) {
    this.setState({ cvv: e.target.value });
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
              this.setState({ loading: false, error: 'Transaction successfull'});
             
              $('#congratulationModal').modal('show');
            }).catch(err => {
              this.setState({ loading: false, error: err.toString() });
            });


  }

  onPay() {
    const { phone, networkType, purchaseType, amount, balance } = this.state;

    if (Number(balance) < 100) return this.setState({ error: 'Please fund your wallet' })
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
          $('#congratulationModal').modal('show');
        }).catch(err => {
          this.setState({ loading: false, error: err.toString() });
        });


  }


  onPayCard(cardId) {
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
        this.setState({ loading: false });
        $('#congratulationModal').modal('show');
      }).catch(err => {
        this.setState({ loading: false, error: err.toString() });
      });


  }

  cardsView() {
    return this.state.cards.map((t, index) => {
      return <Cards {...t} i={index} pay={this.onPayCard} key={t.id} />
    })
  }


  Loaderview() {
    return this.state.loading ? <Loading /> : null

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
                <div className="breadcrumb-item">Choose your payment method</div>
              </div>
            </div>
            <h4>Choose your payment method</h4>
            <div className="row">
            <div className="col-12 col-sm-12 col-lg-8">
              <div className="card">
                <div className="card-body pb-5">
                  <ul className="nav nav-pills" id="myTab3" role="tablist">
                    {/* <li className="nav-item">
                      <a
                        className="nav-link"
                        id="home-tab3"
                        data-toggle="tab"
                        href="#home3"
                        role="tab"
                        aria-controls="home"
                        aria-selected="true"
                      >
                        Debit Card
                        </a>
                    </li> */}
                    <li className="nav-item">
                      <a
                        className="nav-link active"
                        id="profile-tab3"
                        data-toggle="tab"
                        href="#profile3"
                        role="tab"
                        aria-controls="profile"
                        aria-selected="false"
                      >
                        Pay with Wallet
                        </a>
                    </li>
                    {/* <li className="nav-item">
                      <a
                        className="nav-link"
                        id="contact-tab3"
                        data-toggle="tab"
                        href="#contact3"
                        role="tab"
                        aria-controls="contact"
                        aria-selected="false"
                      >
                        Pay with Saved Cards
                        </a>
                    </li> */}

                  </ul>
                  <div className="tab-content" id="myTabContent2">
                    <div
                      className="tab-pane fade"
                      id="home3"
                      role="tabpanel"
                      aria-labelledby="home-tab3"
                    >

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
                          {this.state.loading ? this.Loaderview() : <button type="submit" className="subscribe btn btn-primary btn-block rounded-pill shadow-sm"> Confirm  </button>}
                        </form>
                        <div className="text-center p-t-30">
                          <p className="txt1">
                            {this.state.error}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div
                      className="tab-pane fade show active"
                      id="profile3"
                      role="tabpanel"
                      aria-labelledby="profile-tab3"
                    >

                      <div id="nav-tab-wallet">
                        <p>Make Purchasing using funds in Your wallet</p>
                        {this.state.amount <= this.state.balanceAmount ? <p><button type="button" onClick={this.onPay} className="btn btn-primary rounded-pill"> Pay with Wallet</button></p> :
                          <p className="text-muted">Please do add funds to your wallet to complete this transaction. <Link to="/add-funds">Add Funds Now</Link></p>}
                        {this.state.loading ? this.Loaderview() : null}
                      </div>


                    </div>
                    <div
                      className="tab-pane fade"
                      id="contact3"
                      role="tabpanel"
                      aria-labelledby="contact-tab3"
                    >
                      <div id="nav-tab-cards">
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

              <div className="col-12 col-sm-12 col-lg-4">
              <div className="card">
                <div className="card-header">
                  <h4>Wallet</h4>
                </div>
                { this.state.matches? <div className="card-body row">
                  <div className="card img-fluid">
                    <img className="card-img-top" src="../assets/img/kakudi_card_bg.svg" alt="Card" style={{width:"100%"}} />
                    <div className="card-img-overlay">
                    <div style={{float: "left"}}>
                      <p className="card-text text-white" style={{fontSize: '8'}}>Current Balance</p>
                      <h6 className="card-title text-white my-3" style={{fontSize: '12'}}>&#8358; <span>{this.state.balance}</span></h6>
                      <p className="card-title text-light mt-3"><Link to="/add-funds" className="text-light">Add funds <i className="fa fa-plus-circle"></i></Link></p>
                      </div>
                      <div style={{float: "right"}}>
                      <p className="card-text text-white" style={{fontSize: '8'}}>Commision Balance</p>
                      <h6 className="card-title text-white my-3" style={{fontSize: '12'}}>&#8358; <span>{this.state.commision}</span></h6>
                      <p className="card-title text-light mt-3"><Link to="/unload" className="text-light">Unload Commission <i className="fa fa-plus-circle"></i></Link></p>
                      </div>
                    </div>
                  </div>
                </div>

:
<> <div className="card-body">
                  <div className="card img-fluid">
                    <img className="card-img-top" src="../assets/img/kakudi_card_bg.svg" alt="Card" style={{ width: "100%" }} />
                    <div className="card-img-overlay">
                      <div style={{ float: "left" }}>
                        <p className="card-text text-white" style={{fontSize: '8'}}>Current Balance</p>
                        <h4 className="card-title text-white my-3">&#8358; <span>{this.state.balance}</span></h4>
                        <p className="card-title text-light mt-3"><Link to="/add-funds" className="text-light">Add funds <i className="fa fa-plus-circle"></i></Link></p>
                      </div>
                    
                    </div>

                  </div>
                </div>

                <div className="card-body">
                  <div className="card img-fluid">
                    <img className="card-img-top" src="../assets/img/kakudi_card_bg.svg" alt="Card" style={{ width: "100%" }} />
                    <div className="card-img-overlay">
                      <div style={{ float: "left" }}>
                        <p className="card-text text-white" style={{fontSize: '8'}}>Commision Balance</p>
                        <h4 className="card-title text-white my-3">&#8358; <span>{this.state.commision}</span></h4>
                        <p className="card-title text-light mt-3"><Link to="/unload" className="text-light">Unload Commission <i className="fa fa-plus-circle"></i></Link></p>
                      </div>
                    </div>

                  </div>
                </div> </>}
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
                    <p className="text-center font-weight-bold">Transaction successful!</p>
                    <a className="btn btn-outline-primary py-2 btn-lg btn-block rounded" href="/">Return Home</a>

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
