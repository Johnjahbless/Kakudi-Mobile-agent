import React, { Component } from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';
import InputRange from 'react-input-range';
import data from '../../../components/constants';
import Loading from './loader';
import 'react-input-range/lib/css/index.css'

export class Profile extends Component {
  constructor(props) {
    super(props);

    this.onChangeAirtime = this.onChangeAirtime.bind(this);
    this.onChangeData = this.onChangeData.bind(this);
    this.onChangeFinance = this.onChangeFinance.bind(this);

    this.state = {
      value: 100,
      data: 100,
      finance: 100,
      loading: false,
      student: []
    }
  }
  componentDidMount() {

    axios.get(`${data.host}api/v1/student?token=${data.token}`)
      .then(response => {
        // eslint-disable-next-line
        this.setState({ student: response.data[0], state: response.data[0].state, lga: response.data[0].lga, metricNo: response.data[0].metricNo, department: response.data[0].department, programme: response.data[0].programme, gender: response.data[0].gender, image: response.data[0].image, name: response.data[0].firstname + ' ' + response.data[0].othername, logTime: response.data[0].last_logout })
      }).catch((error) => { console.log(error) });



  }

  onChangeAirtime(e) {
    this.setState({ value: e.target.value })
  }

  onChangeData(e) {
    this.setState({ data: e.target.value })
  }

  onChangeFinance(e) {
    this.setState({ finance: e.target.value })
  }
  Loaderview() {
    return this.state.loading ? <Loading /> : null

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
            <div className="col-12 col-sm-12 col-lg-12">
              <div className="card p-5">
                <div className="container">
                  <section>
                    <h3>Airtime Transaction Value</h3>
                    <p>
                      Use the input box below or the slider to enter a desired
                      value
                            </p>


                    <div className='range'>
                      <InputRange
                        maxValue={100000}
                        minValue={0}
                        value={this.state.value}
                        onChange={value => this.setState({ value })} />
                      <input className='form-control' type='number' onChange={this.onChangeAirtime} value={this.state.value} style={{ width: "250px", marginLeft:"10px", marginBottom:"25px" }} />
                    </div>

                  </section>
                </div>
                <div className="container">
                  <section>
                    <h3>Data Transaction Volume</h3>
                    <p>
                      Use the input box below or the slider to enter a desired
                      value
                            </p>

                    <div className='range'>
                      <InputRange
                        maxValue={100000}
                        minValue={0}
                        value={this.state.data}
                        onChange={value => this.setState({ data: value })} />
                      <input className='form-control' type='number' onChange={this.onChangeData} value={this.state.data} style={{ width: "250px", marginLeft:"10px", marginBottom:"25px" }}/>
                    </div>

                  </section>
                </div>
                <div className="container">
                  <section>
                    <h3>Financial Transaction Volume</h3>
                    <p>
                      Use the input box below or the slider to enter a desired
                      value
                            </p>

                    <div className='range'>
                      <InputRange
                        maxValue={100000}
                        minValue={0}
                        value={this.state.finance}
                        onChange={value => this.setState({ finance: value })} />
                      <input className='form-control' type='number' onChange={this.onChangeFinance} value={this.state.finance} style={{ width: "250px", marginLeft:"10px", marginBottom:"25px" }}/>
                    </div>

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
