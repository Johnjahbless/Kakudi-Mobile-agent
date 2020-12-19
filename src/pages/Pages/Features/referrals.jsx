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
       
       <section className="section" >
       <div className="section-header">
            <h1>Referrals & Points</h1>
            <div className="section-header-breadcrumb">
              <div className="breadcrumb-item active"><Link to="/">Dashboard</Link></div>
              <div className="breadcrumb-item">Referrals & Points</div>
            </div>
          </div>

          <div className="row" >
            <div className="col-12 col-sm-12 col-lg-8">
              <div className="card">
                <div className="row mt-sm-4">
                  <div className="col-12 col-md-12 col-lg-12">
                    <div className="profile-widget">
                      <div className="profile-widget-description">
                        <img alt="image" src="../assets/img/avatar/avatar-1.png" className="rounded-circle w-25 mx-auto d-block" />
                        <div className="profile-widget-name text-center mt-3">Bright Chidiebere Emeka <br/> <div className="text-muted d-inline font-weight-normal">Current points</div>  <span style={{color:"red"}}> 12</span></div>

                      </div>
                      <div className="card-footer text-center w-50 mx-auto">

                        <div className="form-group">
                          <div className="input-group mb-3">
                            <input type="text" className="form-control" placeholder="1125445635541" disabled value="1125445635541" aria-label="" />
                            <div className="input-group-append">
                              <button href="#" className="btn btn-primary" type="button">Copy Code <i className="fas fa-copy"></i></button>
                            </div>
                          </div>
                        </div>

                        <div className="font-weight-bold mb-2">Invite your friends with your referal code to earn points!</div>
                        <button className="btn btn-outline-dark rounded m-5" type="button">Click to Share</button>
                      </div>

                    </div>
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
