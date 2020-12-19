import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import IdleTimer from 'react-idle-timer'
import data from '../../constants';
import axios from "axios";
import Cookies from 'universal-cookie';
const options = { path: '/', maxAge: 60 * 60 * 24 };


const cookies = new Cookies();

const userDetails = cookies.get('__lockout');


export class UserDropdown extends Component {
 constructor(props) {
         super(props);
         this.idleTimer = null
    this.handleOnIdle = this.handleOnIdle.bind(this)
 
         this.state = {
             name: '',
             image: '',
             logTime: '',
             message: '',
             error:'',
             button: 'Send Message',
             loading: false
         }
 }

 componentDidMount() {
		 let userDetails = cookies.get('__sessions');
     // eslint-disable-next-line
      //userDetails !== undefined? this.sendDetails() : window.location = '/auth/login';

      axios.get(`${data.host}api/v1/student?token=${data.token}`)
      .then(response => {
        // eslint-disable-next-line
        this.setState({image: response.data[0].image, name: response.data[0].firstname + ' ' + response.data[0].othername, logTime: response.data[0].last_logout})
      }).catch((error) => {console.log(error)});
  
          axios.get(`${data.host}api/v1/student?token=${data.token}`)
      .then(response => {
        // eslint-disable-next-line
        this.setState({image: response.data[0].image, name: response.data[0].firstname + ' ' + response.data[0].othername, logTime: response.data[0].last_logout})
      }).catch((error) => {console.log(error)});
      }

       handleOnAction (event) {
    //console.log('user did something', event)
  }
 
  handleOnActive (event) {
    //console.log('user is active', event)
    //console.log('time remaining', this.idleTimer.getRemainingTime())
  }
 
  handleOnIdle (event) {
   // console.log('user is idle', event)
    //console.log('last active', this.idleTimer.getLastActiveTime())
    cookies.set('__lockout', {lockout: true}, options);
     window.location = '/auth/login'
  }

  logout() {
    //let userDetails = cookies.get('__sessions');
    cookies.remove('__sessions');
    cookies.remove('__lockout');
    window.location = '/auth/login'
  }

   sendDetails() {
      return userDetails.lockout !== undefined && userDetails.lockout === true ?  window.location = '/auth/login' : null;

   }

   

  render() {
    const { userDetail } = this.props;
    return (
      <>
       <IdleTimer
          ref={ref => { this.idleTimer = ref }}
          timeout={1000 * 60000 }
          onIdle={this.handleOnIdle}
          debounce={250}
        />
      <li className="dropdown">
        <a
          href="#/"
          data-toggle="dropdown"
          className="nav-link dropdown-toggle nav-link-lg nav-link-user"
        >
          <img
            alt="student"
            width="20px"
            height="30px"
            src={this.state.image}
            className="rounded-circle mr-1"
          />
          <div className="d-sm-none d-lg-inline-block">
            Hi, {this.state.name}
          </div>
        </a>
        <div className="dropdown-menu dropdown-menu-right">
          <div className="dropdown-title">
          </div>

          {userDetail.datas.map((data, idata) => {
            return (
              <NavLink
                key={idata}
                to={data.link}
                activeStyle={{
                  color: "#6777ef",
                }}
                exact
                className="dropdown-item has-icon"
              >
                <i className={data.icode} /> {data.title}
              </NavLink>
            );
          })}

          <div className="dropdown-divider" />
          <a
            href="#/"
            className="dropdown-item has-icon text-danger"
            onClick={() => {this.logout()}}
          >
            <i className={userDetail.logoutIcon} /> {userDetail.logoutTitle}
          </a>
        </div>
      </li>
      </>
    );
  }
}

export default UserDropdown;
