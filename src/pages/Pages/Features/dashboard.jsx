import React, { Component } from "react";
import axios from 'axios';
import $ from 'jquery';
import { Link } from 'react-router-dom';
import moment from 'moment';
import Chart from 'chart.js';
import data from '../../../components/constants';
import Loading from './loader';


const Transaction = props => (
  <tr>
  <td>
    {props.i}
  </td>
  <td>{props.title}</td>
  <td className="align-middle">{props.transaction_type == 1? 'Transfer' : props.transaction_type == 2? 'Topup' : props.transaction_type == 3? 'Withdraw' : props.transaction_type == 4? 'Airtime recharge' : props.transaction_type == 5? 'Data recharge' : props.transaction_type == 6? 'Unload Commission' : ''} </td>
  <td className="">{props.amount}</td>
  <td>{moment(props.date_added).format('YYYY MMM DD')}</td>
  <td><div className="badge badge-warning">{props.status == 1? 'Successful' : 'Failed'}</div></td>
  <td><a href="#/" className="btn btn-secondary">Detail</a></td>
</tr>

)
export class Profile extends Component {
   constructor(props) {
         super(props);
 
         
         this.state = {
             balance: 0,
             commision: 0,
             loading: true,
             transactions: []
         }
 }
  componentDidMount() {
   
    axios.get(`${data.host}api/v1/transactions?token=${data.token}`)
        .then(response => {
          // eslint-disable-next-line
          this.setState({transactions: response.data, loading: false});
          $(document).ready(() => {
            $('#table-1').DataTable({ 
                lengthChange: true,
                dom: 'Bfrtip',
              });
              
            });
        }).catch((error) => this.setState({error: error.toString(), loading: false}));

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

      axios.get(`${data.host}api/v1/transactions/spent?token=${data.token}`)
      .then(res => {
        axios.get(`${data.host}api/v1/transactions/recieved?token=${data.token}`)
        .then(response => {
          // eslint-disable-next-line
          this.loadchat2(res.data, response.data)
        }).catch((error) => {console.log(error)});
      }).catch((error) => {console.log(error)});


}

loadchat2(spent, received) {
  let transactChart = document.getElementById('transactionsChart').getContext('2d');
  let transactionsChart = new Chart(transactChart, {
      // The type of chart we want to create
      type: 'pie',
  
      // The data for our dataset
      data: {
          labels: ['TOTAL SPENDING', 'TOTAL MONEY RECEIVED'],
          datasets: [{
              label: 'Salary Projection',
              data: [spent, received],
              backgroundColor: [
                  '#FFB946',
                  '#2ED47A'
              ],
              borderColor: [
                  '#FFB946',
                  '#2ED47A'
              ],
              borderWidth: 1
          }]
      },
      options: {}
  });
  
  
  
}

transactionsView() {
  return this.state.transactions.map((t, index) => {
       return <Transaction {...t} i={index}  key={t.id}/>
      })
}

        Loaderview() {
        return this.state.loading? <Loading /> : null
        
    }
  render() {
    return (
      <div className="main-content">
       
       <section className="section">
          <div className="section-header">
            <h1>Dashboard</h1>
            <div className="section-header-breadcrumb">
              <div className="breadcrumb-item active"><Link to="/">Dashboard</Link></div>
              <div className="breadcrumb-item">Home</div>
            </div>
          </div>

          <div className="row">
            <div className="col-12 col-sm-12 col-lg-8">
              <div className="card">
                <div className="card-header">
                  <h4>Quick services</h4>
                </div>
                <div className="card-body pb-5">
                  <div className="card-stats">
                  <div className="card-stats-items">
                    <div className="card-stats-item bg-light py-3 rounded mr-2 mb-5">
                      <Link to="/recharge"><div className=""><img src="../assets/img/phone 1.svg" alt=""/></div>
                      <div className="card-stats-item-count">Buy airtime & data</div></Link>
                    </div>
                    <div className="card-stats-item bg-light py-4 rounded mr-2 mb-5">
                      <Link to=""><div className=""><img src="../assets/img/invoice 1.svg" alt="" /></div>
                      <div className="card-stats-item-count">Pay Bills</div></Link>
                    </div>
                    <div className="card-stats-item bg-light py-4 rounded mr-2 mb-5">
                    <Link to="/ka-kulator">
                      <div className=""><img src="../assets/img/ka-kulator.svg" alt="" /></div>
                      <div className="card-stats-item-count">Ka-Kulator</div></Link>
                    </div>
                    <div className="card-stats-item bg-light py-3 rounded mb-5">
                    <Link to="/withdraw-money">
                      <div className=""><img src="../assets/img/wallet.svg" alt="" /></div>
                      <div className="card-stats-item-count">Withdraw from Wallet</div></Link>
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
      

          <div className="row">
            <div className="col-12 col-lg-8">
              <div className="card">
                <div className="card-header">
                  <h4>Latest transactions</h4>
                </div>
                <div className="card-body">
                  <div className="table-responsive">
                  <table className="table table-striped" id="table-1">
                      <thead>
                        <tr>
                          <th className="text-center">
                            #
                          </th>
                          <th>Description</th>
                          <th>Transaction Type</th>
                          <th>Amount</th>
                          <th>Date</th>
                          <th>Status</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                       {this.transactionsView()}
                      </tbody>
                    </table>
                    {this.Loaderview()}
                        <div className="text-center p-t-30">
																	<p className="txt1">
																		{this.state.error}
																	</p>
                                  </div>
                    
                  </div>
                </div>
              </div>
            </div>


            <div className="col-12 col-sm-12 col-lg-4">
              <div className="card">
                <div className="card-header">
                  <h4>Transactions</h4>
                </div>
                <div className="card-body">
                  <canvas id="transactionsChart" height="302"></canvas>
                </div>
              </div>
            </div>



          </div>

          


          <div className="section-body">
            <a href="#/"><div className="card img-fluid">
                <img className="card-img-top" src="../assets/img/advert_kakudi.jpg" alt="Card" style={{width:"100%"}} />

            </div></a>
          </div>



        </section>
        </div>
    );
  }
}

export default Profile;
