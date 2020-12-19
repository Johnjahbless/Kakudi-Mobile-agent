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


      new Chart(document.getElementById("polar-chart"), {
        type: 'polarArea',
        data: {
          labels: ["Suspended Agents", "Active Agents", "Blocked Agents"],
          datasets: [
            {
              label: "Population (millions)",
              backgroundColor: ["#3e95cd", "#8e5ea2","#c45850"],
              data: [2478,5267,4433]
            }
          ]
        },
        options: {
          title: {
            display: false,
            text: 'Kakudi Mobile Agents'
          }
        }
    });


    new Chart(document.getElementById("customerChart"), {
        type: 'polarArea',
        data: {
          labels: ["Suspended Customers", "Active Customers", "Blocked Customers"],
          datasets: [
            {
              label: "Population (millions)",
              backgroundColor: ["#FFC107", "#583CE6","#c45850"],
              data: [1478,5267,433]
            }
          ]
        },
        options: {
          title: {
            display: false,
            text: 'Kakudi Mobile Agents'
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
            <h1>Logs and Statistics</h1>
            <div className="section-header-breadcrumb">
              <div className="breadcrumb-item active"><Link to="/">Dashboard</Link></div>
              <div className="breadcrumb-item">Logs and Statistics</div>
            </div>
          </div>


        <div className="row">
            <div className="col-12 col-sm-12 col-lg-6">
              <div className="card">
                <div className="card-header">
                  <h4>Statistics</h4>
                </div>
                <div className="card-body">
                  <canvas id="analysisChart" width="100%" ></canvas>
                </div>
              </div>
            </div>
       
            <div className="col-12 col-sm-12 col-lg-6">
              <div className="card">
                <div className="card-header">
                  <h4>Agents</h4>
                </div>
                <div className="card-body">
                  <canvas id="polar-chart" width="100%" ></canvas>
                </div>
              </div>
            </div>

        </div>



        <div className="row">
            <div className="col-12 col-lg-8">
              <div className="card">
                <div className="card-header">
                  <h4>Activity Log</h4>
                </div>
                <div className="card-body">
                  <div className="table-responsive">
                    <table className="table table-striped" id="table-1">
                      <thead>
                        <tr>
                          <th className="text-center">
                            #
                          </th>
                          <th>KiD</th>
                          <th>User Name</th>
                          <th>Description</th>
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
                          <td>918341098</td>
                          <td>Salihu Ibrahim </td>
                          <td>9 Mobile Airtime </td>
                          <td>2018-01-20</td>
                          <td><div className="badge badge-warning">Processing</div></td>
                          <td><Link to="/activities/2" className="btn btn-secondary">Detail</Link></td>
                        </tr>
                        
                      </tbody>
                    </table>
                    <Link to="/audit-trail"><div className="card-footer bg-whitesmoke text-center">
                      View Audit Trail  {'>'}
                    </div></Link>
                  </div>
                </div>
              </div>
            </div>


            <div className="col-12 col-sm-12 col-lg-4">
              <div className="card">
                <div className="card-header">
                  <h4>Customers</h4>
                </div>
                <div className="card-body">
                  <canvas id="customerChart" height="302"></canvas>
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
