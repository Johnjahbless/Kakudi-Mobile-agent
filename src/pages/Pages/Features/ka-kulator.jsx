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
  

      {/*$("#test").inputSliderRange({
        min: 5000,
        max: 100000,
        start: 10000,
        grid: true,
        gridCompression: true,
        step: {
          0: 5000,
          200000: 50000,
          1000000: 500000,
        },
      });
      
      $("#test1").inputSliderRange({
        min: 5000,
        max: 100000,
        start: 10000,
        grid: true,
        gridCompression: true,
        step: {
          0: 5000,
          200000: 50000,
          1000000: 500000,
        },
      });

      $("#test2").inputSliderRange({
        min: 5000,
        max: 100000,
        start: 10000,
        grid: true,
        gridCompression: true,
        step: {
          0: 5000,
          200000: 50000,
          1000000: 500000,
        },
      });*/}

      function updateTextInput(val) {
        document.getElementById('amount').value=val; 
      }

}

        Loaderview() {
        return this.state.loading? <Loading /> : null
        
    }
  render() {
    return (
      <div className="main-content">
       
       <section className="section">
       <div className="section-header">
              <h1>Ka-kulator</h1>
              <div className="section-header-breadcrumb">
                <div className="breadcrumb-item active">
                  <Link to="/">Dashboard</Link>
                </div>
                <div className="breadcrumb-item">Ka-kulator</div>
              </div>
            </div>

            <div className="row">
              <div className="col-12 col-sm-12 col-lg-8">
              <div className="card p-5">
                        <div className="container">
                          <section>
                            <h3>Airtime Transaction Value</h3>
                            <p>
                              Use the input box below or the slider to enter a desired
                              value
                            </p>

                            <form>
                                <div className='range'>
                                  <input className='range__slider col-6' id='slider' max='100000' min='0' oninput='amount.value=slider.value' type='range' value='300' />
                                  <input className='range__amount' id='amount' oninput='slider.value=amount.value' type='text' value='0' />
                                </div>
                              </form>
                          </section>
                        </div>
                        <div className="container">
                          <section>
                            <h3>Data Transaction Volume</h3>
                            <p>
                              Use the input box below or the slider to enter a desired
                              value
                            </p>
                            <form>
                                <div className='range'>
                                  <input className='range__slider col-6' id='slider' max='100000' min='0' oninput='amount.value=slider.value' type='range' value='300' />
                                  <input className='range__amount' id='amount' oninput='slider.value=amount.value' type='text' value='0' />
                                </div>
                              </form>
                          </section>
                        </div>
                        <div className="container">
                          <section>
                            <h3>Financial Transaction Volume</h3>
                            <p>
                              Use the input box below or the slider to enter a desired
                              value
                            </p>
                            <form>
                                <div className='range'>
                                  <input className='range__slider col-6' id='slider' max='100000' min='0' oninput='amount.value=slider.value' type='range' value='300' />
                                  <input className='range__amount' id='amount' oninput='slider.value=amount.value' type='text' value='0' />
                                </div>
                              </form>
                          </section>
                        </div>

                        <div className="row mt-5 text-light bg-dark p-5">
                          <div className="col-sm-6 col-md-4">
                            <div className="panel income db mbm">
                              <div className="panel-body">
                                <p className="description">Transactions Value</p>
                                <h4 className="value">
                                  <span>812</span>
                                </h4>

                              </div>
                            </div>
                          </div>
                          <div className="col-sm-6 col-md-4">
                            <div className="panel profit db mbm">
                              <div className="panel-body">
                                <p className="description">Points Value</p>
                                <h4 className="value">189,000</h4>

                              </div>
                            </div>
                          </div>

                          <div className="col-sm-6 col-md-4">
                            <div className="panel task db mbm">
                              <div className="panel-body">
                                <p className="description">Cash Equivalent</p>
                                <h4 className="value">
                                  <span>155</span>
                                </h4>

                              </div>
                            </div>
                          </div>
                        </div>

                        <p className="mt-4">*Terms and Conditions apply and are subject to change without prior notice.
                          For the current Terms and Conditions, please visit our <Link to="">Terms of Service page.</Link></p>
                      </div>
              </div>
            </div>



        </section>
        </div>
    );
  }
}

export default Profile;
