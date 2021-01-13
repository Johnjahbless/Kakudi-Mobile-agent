import React, { Component } from "react";
import axios from 'axios';
import $ from 'jquery';
import { Link } from 'react-router-dom';
import data from '../../../components/constants';
import Loading from './loader';




export class Profile extends Component {
  constructor(props) {
    super(props);
    this.onChangeAmount = this.onChangeAmount.bind(this);
    this.onSubmit2 = this.onSubmit2.bind(this);

    this.state = {
        commision: 0,
      amount: 0,
      loading: false,
      cards: []
    }
  }
  componentDidMount() {
  
    axios.get(`${data.host}api/v1/commission/balance?token=${data.token}`)
    .then(response => {
      // eslint-disable-next-line
      this.setState({commision: response.data[0].balance})
    }).catch((error) => {console.log(error)});
  }
  componentWillUnmount() {
    $('#congratulationModal').modal('hide');
  }
  onChangeAmount(e) {
    this.setState({ amount: e.target.value });
  }


  

  onSubmit2(e) {
    e.preventDefault();

    const { amount, commision } = this.state;

    if(amount > commision || amount == 0) return this.setState({ error: 'Please enter an amount lower than your commision' })


    this.setState({ loading: true, error: '' })

    const details = { amount }


    axios.post(`${data.host}api/v1/agent/commision/unload?token=${data.token}`, details)
      .then(res => {
        if(res.data === '200') return this.setState({ loading: false, error: 'Invalid transaction, please try again' });
        this.setState({ loading: false, error: 'Successfull' });
        $('#congratulationModal').modal('show');
      }).catch(err => {
        this.setState({ loading: false, error: err.toString() });
      });


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
              <h1>Unload Commisions</h1>
              <div className="section-header-breadcrumb">
                <div className="breadcrumb-item active"><Link to="/">Dashboard</Link></div>
                <div className="breadcrumb-item"><Link to="/wallet">Wallet</Link></div>
                <div className="breadcrumb-item">Unload Commisions</div>
              </div>
            </div>

            <div className="row">
              <div className="col-12 col-sm-12 col-lg-8">
                <div className="card">
                  <div className="card-header">
                    <h4>Unload Commisions To Wallet</h4>
                  </div>
                  <div className="card-body pb-5">

                    <form onSubmit={this.onSubmit2}>
                      <div className="row">
                        <div className="form-group col-12">
                          <label for="withdrawal_amount">Amount</label>
                          <input id="withdrawal_amount" placeholder="How much do you want to unload" min="10" onChange={this.onChangeAmount} value={this.state.amount} required type="number" className="form-control" name="withdrawal_amount" autofocus />
                        </div>
                      </div>


                      <div className="form-group">
                        {this.state.loading? this.Loaderview() : <button type="submit" className="btn btn-primary btn-lg btn-block">
                          Proceed
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
