import React, { Component } from "react";
import axios from 'axios';
import $ from 'jquery';
import { Link } from 'react-router-dom';
import data from '../../../components/constants';
import Loading from './loader';

export class Profile extends Component {
   constructor(props) {
         super(props);
         this.onChangeAccount = this.onChangeAccount.bind(this);
         this.onChangeBank = this.onChangeBank.bind(this);
         this.onChangeNarration = this.onChangeNarration.bind(this);
         this.onChangeAmount = this.onChangeAmount.bind(this);
         this.onChangeSaveDetails = this.onChangeSaveDetails.bind(this);
         this.onSubmit = this.onSubmit.bind(this);
 
         
         this.state = {
          balance: 0,
             account: '',
             bank: '0',
             narration: '',
             amount: '',
             saveDetails: '',
             loading: false,
             banks: []
         }
 }
  componentDidMount() {
 
    axios.get(`${data.host}api/v1/wallet/balance?token=${data.token}`)
      .then(response => {
        // eslint-disable-next-line
        this.setState({balance: response.data[0].balance})
      }).catch((error) => {});
  
      axios.get(`${data.host}api/v1/banks?token=${data.token}`)
      .then(response => {
        // eslint-disable-next-line
        this.setState({banks: response.data})
      }).catch((error) => {});
}

componentWillUnmount() {
  $('#mediumModal').modal('hide');
 }

 onChangeAmount(e) {
  this.setState({amount: e.target.value});
}

onChangeAccount(e) {
  this.setState({account: e.target.value});
}

onChangeBank(e) {
  this.setState({bank: e.target.value});
}

onChangeNarration(e) {
  this.setState({narration: e.target.value});
}

onChangeSaveDetails(e) {
  this.setState({saveDetails: e.target.checked});
}

onSubmit(e) {
  e.preventDefault();

  const { account, bank, narration, saveDetails, amount, balance } = this.state;

   if(bank == '0') return this.setState({ error: 'Please select a bank type' });

  // if(amount >= balance) return this.setState({ error: 'Sorry, insufficient balance please fund your wallet' });

 
  if(saveDetails){
    
    this.setState({ loading: true, error: '' })

    const details = {
      account,
      narration,
      bank,
      amount
    }


 axios.post(`${data.host}api/v1/agent/beneficiary/bank/add?token=${data.token}`, details).then(res => { }).catch(err => {});

        this.performTransaction()
        return;
  }
  this.performTransaction()

}
performTransaction() {

  this.setState({error: ''})
  $('#mediumModal').modal('show');
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

                                <form onSubmit={this.onSubmit}>
                  <div className="row">
                    <div className="form-group col-6">
                      <label for="account_number">Account Number</label>
                      <input id="account_number" onChange={this.onChangeAccount} minLength="10" maxLength="10" value={this.state.account} placeholder="Enter Beneficiary’s Account Number" required type="text" className="form-control" name="account_number" autofocus />
                    </div>
                    <div className="form-group col-6">
                      <label>Bank Name</label>
                      <select className="form-control" onChange={this.onChangeBank} required>
                        <option value="0">Select Bank</option>
                        {this.state.banks.map(b => <option value={b.id}>{b.title}</option>)}
                      </select>
                    </div>
                  </div>

                  <div className="row">
                    <div className="form-group col-6">
                      <label for="notes">Personalized note</label>
                      <input id="notes" placeholder="Type in a narration" onChange={this.onChangeNarration} value={this.state.narration} required type="text" className="form-control" name="notes" />
                    </div>
                    <div className="form-group col-6">
                      <label for="amount">Amount</label>
                      <input id="amount" placeholder="Enter Amount" min="1000" onChange={this.onChangeAmount} value={this.state.amount} required type="number" className="form-control" name="amount" />
                    </div>
                  </div>

                  <div className="form-group">
                    <div className="custom-control custom-checkbox">
                      <input type="checkbox" name="save_details" className="custom-control-input" id="save_details" onChange={this.onChangeSaveDetails} />
                      <label className="custom-control-label" for="save_details">Save bank details</label>
                    </div>
                  </div>

                  <div className="form-group">
                  {this.state.loading? this.Loaderview() : <button type="submit" className="btn btn-primary btn-lg btn-block">
                      Send Money now
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
                  <p className="text-center">Your have successfully sent <br /> <span className="font-weight-bold">N {this.state.amount}</span> to <span className="font-weight-bold">Name of Beneficiary</span> </p>
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
