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
  

      var transactChart = document.getElementById('transactionsChart').getContext('2d');
var transactionsChart = new Chart(transactChart, {
    // The type of chart we want to create
    type: 'pie',

    // The data for our dataset
    data: {
        labels: ['TOTAL SPENDING', 'TOTAL MONEY RECEIVED'],
        datasets: [{
            label: 'Salary Projection',
            data: [65, 35],
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

        Loaderview() {
        return this.state.loading? <Loading /> : null
        
    }
  render() {
    return (
        
      <div className="main-content">
       
       <section className="section" >
       <div className="section-header">
            <h1>Transactions</h1>
            <div className="section-header-breadcrumb">
              <div className="breadcrumb-item active"><Link to="/">Dashboard</Link></div>
              <div className="breadcrumb-item">Transactions</div>
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



        </section>
        </div>



    );
  }
}

export default Profile;
