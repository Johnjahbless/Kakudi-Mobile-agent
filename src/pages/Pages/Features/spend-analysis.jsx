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
 


      new Chart(document.getElementById("analysisChart"), {
        type: 'bar',
        data: {
          labels: ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEPT','OCT'],
          datasets: [{ 
              data: [86,114,106,106,107,111,133,221,783,2478],
              label: "Airtime Transactions",
              borderColor: "#3449C0",
              backgroundColor: "#3449C0"
            }, { 
              data: [282,350,411,502,635,809,947,1402,3700,5267],
              label: "WALLET WITHDRAWALS",
              borderColor: "#8e5ea2",
              backgroundColor: "#8e5ea2"
            }, { 
              data: [168,170,178,190,203,276,408,547,675,734],
              label: "Data Transactions",
              borderColor: "#27AE60",
              backgroundColor: "#27AE60"
            }
          ]
        },
        options: {
          legend: {
            position: 'bottom',
          }
        }
      
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
            <h1>Spend Analysis</h1>
            <div className="section-header-breadcrumb">
              <div className="breadcrumb-item active"><Link to="/">Dashboard</Link></div>
              <div className="breadcrumb-item">Spend Analysis</div>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-4 col-md-4 col-sm-12">
              <div className="card card-statistic-2">
                <div className="row p-3">
                  <div className="card-stats-title col-6">MONTH  -
                    <div className="dropdown d-inline">
                      <a className="font-weight-600 dropdown-toggle" data-toggle="dropdown" href="#" id="orders-month">August</a>
                      <ul className="dropdown-menu dropdown-menu-sm">
                        <li className="dropdown-title">Select Month</li>
                        <li><a href="#" className="dropdown-item">January</a></li>
                        <li><a href="#" className="dropdown-item">February</a></li>
                        <li><a href="#" className="dropdown-item">March</a></li>
                        <li><a href="#" className="dropdown-item">April</a></li>
                        <li><a href="#" className="dropdown-item">May</a></li>
                        <li><a href="#" className="dropdown-item">June</a></li>
                        <li><a href="#" className="dropdown-item">July</a></li>
                        <li><a href="#" className="dropdown-item active">August</a></li>
                        <li><a href="#" className="dropdown-item">September</a></li>
                        <li><a href="#" className="dropdown-item">October</a></li>
                        <li><a href="#" className="dropdown-item">November</a></li>
                        <li><a href="#" className="dropdown-item">December</a></li>
                      </ul>
                    </div>
                  </div>
                  <div className="card-stats-title col-6">YEAR  -
                    <div className="dropdown d-inline">
                      <a className="font-weight-600 dropdown-toggle" data-toggle="dropdown" href="#" id="orders-month">2020</a>
                      <ul className="dropdown-menu dropdown-menu-sm">
                        <li className="dropdown-title">Select YEAR</li>
                        <li><a href="#" className="dropdown-item">2009</a></li>
                        <li><a href="#" className="dropdown-item">2010</a></li>
                        <li><a href="#" className="dropdown-item">2011</a></li>
                        <li><a href="#" className="dropdown-item">2012</a></li>
                        <li><a href="#" className="dropdown-item">2013</a></li>
                        <li><a href="#" className="dropdown-item">2014</a></li>
                        <li><a href="#" className="dropdown-item">2015</a></li>
                        <li><a href="#" className="dropdown-item">2016</a></li>
                        <li><a href="#" className="dropdown-item">2017</a></li>
                        <li><a href="#" className="dropdown-item">2018</a></li>
                        <li><a href="#" className="dropdown-item">2019</a></li>
                        <li><a href="#" className="dropdown-item active">2020</a></li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="card-icon shadow-primary bg-primary">
                  <i className="fas fa-archive"></i>
                </div>
                <div className="card">
                  <div className="row pt-4">
                    <h6 className="col-md-8 text-muted">Total Orders</h6>
                    <span className="col-md-4 text-success "><span className="text-success"><i className="fas fa-caret-up"></i></span> 7%</span>
                  </div>
                  <div className="card-wrap">
                    <h3>1218</h3>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-12">
              <div className="card card-statistic-2">
                <div className="card-icon shadow-primary bg-primary">
                  <i className="fas fa-shopping-cart"></i>
                </div>
                <div className="card">
                  <div className="row pt-4">
                    <h6 className="col-md-8 text-muted">Total airtime sales</h6>
                    <span className="col-md-4 text-success "><span className="text-success"><i className="fas fa-caret-up"></i></span> 19%</span>
                  </div>
                  <div className="card-wrap">
                    <h3>&#8358;10,579</h3>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-12">
              <div className="card card-statistic-2">
                <div className="card-icon shadow-primary bg-primary">
                  <i className="fas fa-shopping-bag"></i>
                </div>
                <div className="card">
                  <div className="row pt-4">
                    <h6 className="col-md-8 text-muted">Total data sales</h6>
                    <span className="col-md-4 text-danger "><span className="text-danger"><i className="fas fa-caret-down"></i></span> 15%</span>
                  </div>
                  <div className="card-wrap">
                    <h3>&#8358;92,200</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-12 col-sm-12 col-lg-8">
              <div className="card">
                <div className="card-header">
                  <h4>Analysis</h4>
                </div>
                <div className="card-body">
                  <canvas id="analysisChart" width="100%" ></canvas>
                </div>
              </div>
            </div>
          </div>

        </section>

        </div>
    
        
</>
    );
  }
}

export default Profile;
