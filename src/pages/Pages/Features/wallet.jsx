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
        
      <div className="main-content">
       
       <section className="section">
       <div className="section-header">
            <h1>Kakudi Wallet</h1>
            <div className="section-header-breadcrumb">
              <div className="breadcrumb-item active"><Link to="#">Dashboard</Link></div>
              <div className="breadcrumb-item">Home</div>
            </div>
          </div>

          <div className="row">
            <div className="col-12 col-sm-12 col-lg-5">
              <div className="card">
                <div className="card-header">
                  <h4>Wallet</h4>
                </div>
                <div className="card-body">
                  <div className="card img-fluid">
                    <img className="card-img-top" src="../assets/img/kakudi_card_bg.svg" alt="Card image" style={{width:"100%"}} />
                    <div className="card-img-overlay">
                      <p className="card-text text-white">Current Balance</p>
                      <h4 className="card-title text-white my-4">&#8358; 5,000.00</h4>
                      <p className="card-title text-light mt-5"><Link to="/add-funds" className="text-light">Add funds <i className="fa fa-plus-circle"></i></Link></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-12 col-sm-12 col-lg-5">
              <div className="card">
                <div className="card-header">
                  <h4>Saved Cards</h4>
                </div>
                <div className="summary-item card-body">
                  <ul className="list-unstyled list-unstyled-border">
                    <li className="media">
                      <div className="rounded-circle bg-light p-3 mr-3">
                        <i className="fas fa-credit-card"></i>
                      </div>
                      <div className="media-body">
                        <div className="media-right"><a href="#" className="text-danger">Delete Card<i className="fas fa-trash-alt text-danger"></i></a></div>
                        <div className="media-title">Ecobank Nigeria</div>
                        <div className="text-small text-muted">5123**********1234 <div className="bullet"></div> Expires 01/25</div>
                      </div>
                    </li>
                    <li className="media">
                      <div className="rounded-circle bg-light p-3 mr-3">
                        <i className="fas fa-credit-card"></i>
                      </div>
                      <div className="media-body">
                        <div className="media-right"><a href="#" className="text-danger">Delete Card<i className="fas fa-trash-alt text-danger"></i></a></div>
                        <div className="media-title">GT Bank Plc</div>
                        <div className="text-small text-muted">4123**********1235 <div className="bullet"></div> Expires 02/23</div>
                      </div>
                    </li>
                  </ul>
                  <Link to="/add-card"><div className="card-footer bg-whitesmoke text-center">
                    Add a new card <i className="fa fa-plus-circle"></i>
                  </div></Link>
                </div>
              </div>
            </div>



            <div className="col-12 col-sm-12 col-lg-2">
              <div className="mx-auto">
                <div className="card-stats-item bg-light mx-auto py-4 rounded mb-5">
                <Link to="/withdraw-money">
                  <div className="mx-auto text-center"><img src="../assets/img/wallet.svg" /></div>
                  <div className="card-stats-item-count text-center">Withdraw from Wallet</div></Link>
                </div>
              </div>
          </div>

        </div>






        <div className="row">
          <div className="col-12 col-md-12">
            <div className="card">
              <div className="card-header">
                <h4>Latest transactions</h4>
              </div>
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table table-striped col-md-12" id="table-1">
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
                      <tr>
                        <td>
                          1
                        </td>
                        <td>Airtime purchase</td>
                        <td className="align-middle">9 Mobile Airtime </td>
                        <td className="">5,000</td>
                        <td>2018-01-20</td>
                        <td><div className="badge badge-warning">Processing</div></td>
                        <td><a href="#" className="btn btn-secondary">Detail</a></td>
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


    );
  }
}

export default Profile;
