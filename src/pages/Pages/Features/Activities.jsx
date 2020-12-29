import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import data from '../../../components/constants';
import Loading from './loader';


const ViewLists = props => (

                <div className="activity">
                  <div className="activity-icon bg-primary text-white shadow-primary">
                    <i className="fas fa-arrows-alt"></i>
                  </div>
                  <div className="activity-detail">
                    <div className="mb-2">
                      <span className="text-job">{props.log_date.substring(0, 10)}</span>
                      <span className="bullet"></span>
                      <a className="text-job" href="#">
                        View
                      </a>
                      <div className="float-right dropdown">
                       
                        <div className="dropdown-menu">
                          <div className="dropdown-title">Options</div>
                          <a href="#" className="dropdown-item has-icon">
                            <i className="fas fa-eye"></i> View
                          </a>
                          <a href="#" className="dropdown-item has-icon">
                            <i className="fas fa-list"></i> Detail
                          </a>
                          <div className="dropdown-divider"></div>
                          <a
                            href="#"
                            className="dropdown-item has-icon text-danger"
                            data-confirm="Wait, wait, wait...|This action can't be undone. Want to take risks?"
                            data-confirm-text-yes="Yes, IDC"
                          >
                            <i className="fas fa-trash-alt"></i> Archive
                          </a>
                        </div>
                      </div>
                    </div>
                    <p>
                     {props.log_action}
                    </p>
                  </div>
                </div>
) 

export default class Activities extends Component  {

  constructor(props) {
         super(props);
 
         this.state = {
             loading: true,
             activities: []
         }
     } 

   
      componentDidMount() {

        
      axios.get(`${data.host}api/v1/agent/activities?token=${data.token}`)
      .then(response => {
        // eslint-disable-next-line
        this.setState({activities: response.data, loading: false})
      }).catch((error) => {this.setState({ error: error.toString(), loading: false})});

      }

        activityView() {
          return this.state.activities.map((activity, index) => {
               return <ViewLists i={index} {...activity} key={activity.id}/>
              })
      }

       Loaderview() {
        return this.state.loading? <Loading /> : null
        
    }


  render() {
  return (
    <div className="main-content">
      <section className="section">
        <div className="section-header">
          <h1>Activities</h1>
          <div className="section-header-breadcrumb">
            
            <div className="breadcrumb-item">Activities</div>
          </div>
        </div>
        <div className="section-body">
          <h2 className="section-title">Recent Activities</h2>
          <div className="row">
            <div className="col-12">
              <div className="activities">
                {this.activityView()}
                  
              </div>
            </div>
            {this.Loaderview()}
                        <div className="text-center p-t-30">
																	<p className="txt1">
																		{this.state.error}
																	</p>
                                  </div>
          </div>
        </div>
      </section>
    </div>
  );
}
}