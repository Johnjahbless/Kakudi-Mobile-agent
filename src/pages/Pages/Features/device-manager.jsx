import React, { Component } from "react";
import axios from 'axios';
import $ from 'jquery';
import moment from 'moment';
import { Link } from 'react-router-dom';
import data from '../../../components/constants';
import Loading from './loader';




const Activity = props => (
  <tr>
  <td>
    {props.i + 1}
  </td>
  <td>{props.firstName + ' ' + props.lastName}</td>
  <td>{props.device}</td>
  <td>{props.kid}</td>
  <td>{moment(props.last_login).format('YYYY MMM DD')}</td>
  <td><div className="badge badge-success">{props.status == 1? 'Active' : 'Blocked'}</div></td>
  {/*<td>{props.status == 1 ? <button onClick={() => { props.deactivate(props.id) }} className="btn btn-secondary">Block device</button> : <button onClick={() => { props.activate(props.id) }} className="btn btn-secondary">Reset device</button>}</td>*/}
</tr>
)
export class Profile extends Component {
   constructor(props) {
         super(props);

         this.onActivate = this.onActivate.bind(this);
         this.onDeActivate = this.onDeActivate.bind(this);
         this.onChangeRole = this.onChangeRole.bind(this);
 
         
         this.state = {
             loading: true,
             users: [],
             years: [],
             active: [],
             blocked: [],
             locked: [],
             devices: [],
             allDevices: []
         }
 }
  componentDidMount() {

    axios.get(`${data.host}api/v1/devices?token=${data.token}`)
      .then(response => {
        this.setState({ devices: response.data, active:response.data.filter(a => a.status == 1).length, blocked: response.data.filter(a => a.status == 3).length, locked: response.data.filter(a => a.status == 2).length, loading: false})
 
        $(document).ready(() => {
        $('#table-1').DataTable({ 
          lengthChange: true,
          dom: 'Bfrtip',
        });
      });
      }).catch((error) => {console.log(error)});

   
    
   }

   onChangeRole(e) {
    $('#table-1').dataTable().fnDestroy();
     const role = e.target.value;
     if(role == '0'){
       this.setState({ devices: this.state.allDevices});
       $(document).ready(() => {
        $('#table-1').DataTable({ 
          lengthChange: true,
          dom: 'Bfrtip',
        });
      });
      return;
     };

     this.setState({ devices: this.state.allDevices.filter(d => d.role == role)});
     $(document).ready(() => {
      $('#table-1').DataTable({ 
        lengthChange: true,
        dom: 'Bfrtip',
      });
    });
   }

   onActivate(id) {
    this.setState({ loading: true, error: '' });

    const details = {id: id};
  
    axios.post(`${data.host}api/v1/device/activate?token=${data.token}`, details)
      .then(res => {
      
        axios.get(`${data.host}api/v1/devices?token=${data.token}`).then(res => {
      
          this.setState({devices: res.data, loading: false})
        } ).catch((error) => {this.setState({error: error.toString(), loading: false})});
  
      }).catch(err => {
        this.setState({ loading: false, error: err.toString() });
      });
   }

   
   onDeActivate(id) {
    this.setState({ loading: true, error: '' });

    const details = {id: id};
  
    axios.post(`${data.host}api/v1/device/deactivate?token=${data.token}`, details)
      .then(res => {
      
        axios.get(`${data.host}api/v1/devices?token=${data.token}`).then(res => {
      
          this.setState({devices: res.data, loading: false})
        } ).catch((error) => {this.setState({error: error.toString(), loading: false})});
  
      }).catch(err => {
        this.setState({ loading: false, error: err.toString() });
      });
   }

activityView() {
  return this.state.devices.map((t, index) => {
       return <Activity {...t} i={index} activate={this.onActivate} deactivate={this.onDeActivate} key={t.id}/>
      })
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
            <h1>Device Manager</h1>
            <div className="section-header-breadcrumb">
              <div className="breadcrumb-item active"><Link to="/">Dashboard</Link></div>
              <div className="breadcrumb-item">Device Manager</div>
            </div>
          </div>


          <div className="row">
            <div className="col-lg-3 col-md-6 col-sm-6 col-12">
              <div className="card card-statistic-1">
                <div className="card-icon bg-primary">
                  <i className="fas fa-wallet"></i>
                </div>
                <div className="card-wrap">
                  <div className="card-header">
                    <h4>Registered Devices</h4>
                  </div>
                  <div className="card-body">
                    {this.state.devices.length}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6 col-12">
              <div className="card card-statistic-1">
                <div className="card-icon bg-danger">
                  <i className="fas fa-ban"></i>
                </div>
                <div className="card-wrap">
                  <div className="card-header">
                    <h4>Blocked</h4>
                  </div>
                  <div className="card-body">
                  {this.state.blocked}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6 col-12">
              <div className="card card-statistic-1">
                <div className="card-icon bg-warning">
                  <i className="fas fa-spinner"></i>
                </div>
                <div className="card-wrap">
                  <div className="card-header">
                    <h4>Locked</h4>
                  </div>
                  <div className="card-body">
                  {this.state.locked}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6 col-12">
              <div className="card card-statistic-1">
                <div className="card-icon bg-success">
                  <i className="fas fa-clipboard-check"></i>
                </div>
                <div className="card-wrap">
                  <div className="card-header">
                    <h4>Active</h4>
                  </div>
                  <div className="card-body">
                  {this.state.active}
                  </div>
                </div>
              </div>
            </div>
          </div>




     <div className="row">
      <div className="col-12">
        <div className="card">
          <div className="card-header">
            <h4>Recent Device Activity</h4>
            
          </div>


          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-striped" id="table-1">
                <thead>
                  <tr>
                    <th className="text-center">
                      #
                    </th>
                    <th>User</th>
                    <th>Device ID</th>
                    <th>KiD</th>
                    <th>Last login</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                {this.activityView()}
                    
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
    </div>




        </section>
        </div>
    
        
</>
    );
  }
}

export default Profile;
