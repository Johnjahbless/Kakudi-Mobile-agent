import React, { Component } from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';
import data from '../../../components/constants';
import Loading from './loader';

export class Profile extends Component {
   constructor(props) {
         super(props);

        this.myFunction = this.myFunction.bind(this);
         
         this.state = { 
             name: '',
             image: '',
             refferalId: '',
             kid: '',
             copy: 'Copy Code',
             referralPoint: 0,
             loading: false
         }
 }
  componentDidMount() {
   
        axios.get(`${data.host}api/v1/agent?token=${data.token}`)
        .then(response => {
          // eslint-disable-next-line
          this.setState({image: response.data[0].image, name: response.data[0].firstname + ' ' + response.data[0].lastname, refferalId: response.data[0].referral, referralPoint: response.data[0].referralPoint, kid: response.data[0].kid})
        }).catch((error) => {});

}

myFunction() {
  var copyText = document.getElementById("myInput");
  copyText.select();
  copyText.setSelectionRange(0, 99999);
  document.execCommand("copy");
  
  this.setState({copy: 'Copied'})
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
                        <img alt="" src={this.state.image} className="rounded-circle w-25 mx-auto d-block" />
                        <div className="profile-widget-name text-center mt-3">{this.state.name} <br/> <div className="text-muted d-inline font-weight-normal">Current points</div>  <span style={{color:"red"}}> {this.state.referralPoint}</span></div>

                      </div>
                      <div className="card-footer text-center w-50 mx-auto">

                        <div className="form-group">
                          <div className="input-group">
                            <input type="text" className="form-control" id="myInput" placeholder={window.location.host+'/auth/signup/?referral='+this.state.kid} value={window.location.host+'/auth/signup/?referral='+this.state.kid} aria-label="" />
                            <div className="input-group-append">
                              <button onClick={this.myFunction} className="btn btn-primary" type="button">{this.state.copy} <i className="fas fa-copy"></i>
                            </button>
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
