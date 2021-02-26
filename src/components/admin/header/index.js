/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import data from '../../constants';
import axios from "axios";
import ToggleData from "./ToggleData";
import { EnvelopData, NotifyData, userDetail } from "./Data";
import UserDropdown from "./UserDropdown";

export default class AcademicInfo extends Component {
  constructor(props) {
      super(props);
      this.state = {
        notices: []
    }
}  

componentDidMount(){
  axios.get(`${data.host}api/v1/student/notices?token=${data.token}`)
  .then(response => {
    // eslint-disable-next-line
    NotifyData.content = response.data;
    
    this.setState({notice: response.data})
  }).catch((error) => {});
}
render() {
  return (
    <div>
      <div className="navbar-bg" />
      <nav className="navbar navbar-expand-lg main-navbar">
        <form className="form-inline mr-auto">
          <ul className="navbar-nav mr-3">
            <li>
              <a
                href="#/"
                data-toggle="sidebar"
                className="nav-link nav-link-lg"
              >
                <i className="fas fa-bars" />
              </a>
            </li>

          { /* <li>
              <a
                href="#/"
                data-toggle="search"
                className="nav-link nav-link-lg d-sm-none"
              >
                <i className="fas fa-search" />
              </a>
            </li>*/}
          </ul>
          {/*<Search searchResultData={searchResultData} />*/}
        </form>
        <ul className="navbar-nav navbar-right">
          {/*<ToggleData data={EnvelopData} />*/}
          <ToggleData data={NotifyData} />

          <p style={{color: "#fff"}}>Active   </p><div style={{	width: "16px", height: "16px", borderRadius: "50px",
	lineHeight: "16px",
	background: "#d9232b",
	fontSize: "10px",
  marginTop: "5px",
  marginLeft: "5px"}}></div>
          <UserDropdown userDetail={userDetail} />
        </ul>
      </nav>
    </div>
  );
};
}
