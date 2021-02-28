import React, { Component } from "react";
import axios from 'axios';
import $ from 'jquery';
import { Link } from 'react-router-dom';
import moment from 'moment';
import data from '../../../components/constants';
import Loading from './loader';


const Transaction = props => (
  <tr>
  <td>
    {props.i + 1}
  </td>
  <td>{props.title}</td>
  <td className="align-middle">{props.transaction_type == 1? 'Transfer' : props.transaction_type == 2? 'Topup' : props.transaction_type == 3? 'Withdraw' : props.transaction_type == 4? 'Airtime recharge' : props.transaction_type == 5? 'Data recharge' : props.transaction_type == 6? 'Unload Commission' : ''} </td>
  <td className="">{props.amount}</td>
  <td>{moment(props.date_added).format('YYYY MMM DD')}</td>
  <td><div className="badge badge-warning">{props.status == 1? 'Successful' : 'Failed'}</div></td>
  <td><a href="#/" className="btn btn-secondary">Detail</a></td>
</tr>

)

const Cards = props => (
  <>
  <li className="media mb-3">
  <div className="rounded-circle bg-light p-3 mr-3">
    <i className="fas fa-credit-card"></i>
  </div>
  <div className="media-body">
  <div className="media-right"><a href="#delete" onClick={()=> {props.showDelete(props.id, props.token)}} className="text-danger">Delete Card<i className="fas fa-trash-alt text-danger"></i></a></div>
    <div className="media-title">{props.title}</div>
    <div className="text-small text-muted">{props.card_no.substring(0,4)}************** <div className="bullet"></div> Expires {props.month}/{props.year}</div>
  </div>
</li>

{props.deleteID === props.id? props.showSingleDelete(props.id, props.token) : null}
</>
)


const DeleteDialog = props => (
  <div id="card" style={{position: "absolute", padding: "20px", right: "0", marginTop: "-80px"}} className="card">
                              <p style={{margin: "10px", color: "red"}}><i className="ion-android-warning"></i>Enter Token To Confirm delete?</p>
                              <input type="number" className="form-control" maxLength="5" onChange={props.onChangeToken} value={props.myToken}/>
                              <p className="txt1">
																		{props.error2}
																	</p>
                              <div style={{display: "inline-block"}}>
                              
                              <span id="cancel" style={{float: "left", margin: "10px;"}}><button style={{padding: '0', border: "none", background: "none", outline: "none"}} onClick={()=> {props.cancel()}} ><i className="ion-android-cancel"></i>   Cancel</button> </span>
                              <span style={{float: "right", marginLeft: "10px"}}><button style={{padding: '0', border: "none", background: "none", outline: "none"}} onClick={()=> {props.delete(props.id, props.token)}}>Yes delete    <i className="ion-android-delete"></i></button></span>
                              
                              </div>
                          </div>
)
export class Profile extends Component {
   constructor(props) {
         super(props);

         this.onDelete = this.onDelete.bind(this);
         this.showDelete = this.showDelete.bind(this);
         this.onDeleteDialog = this.onDeleteDialog.bind(this);
         this.cancelDelete = this.cancelDelete.bind(this);
         this.onChangeToken = this.onChangeToken.bind(this);
         
         this.state = {
          deleteID: '',
          myToken: '',
          error2: '',
             loading: true,
             balance: 0,
             commision: 0,
             cards: [],
             transactions: [],
             matches: window.matchMedia("(min-width: 768px)").matches 
         }
 }
  componentDidMount() {
   
    const handler = e => this.setState({matches: e.matches});
    window.matchMedia("(min-width: 768px)").addListener(handler);
    
    axios.get(`${data.host}api/v1/transactions?token=${data.token}`)
        .then(response => {
          // eslint-disable-next-line
          this.setState({transactions: response.data, loading: false});
          $(document).ready(() => {
            $('#table-1').DataTable({ 
                lengthChange: true,
                dom: 'Bfrtip',
              });
              
            });
        }).catch((error) => this.setState({error: error.toString(), loading: false}));

        axios.get(`${data.host}api/v1/commission/balance?token=${data.token}`)
        .then(response => {
          // eslint-disable-next-line
          this.setState({commision: parseFloat(response.data[0].balance)})
        }).catch((error) => {console.log(error)});


        axios.get(`${data.host}api/v1/wallet/balance?token=${data.token}`)
        .then(response => {
          // eslint-disable-next-line
          this.setState({balance: parseFloat(response.data[0].balance)})
        }).catch((error) => {console.log(error)});
    
        axios.get(`${data.host}api/v1/agent/cards?token=${data.token}`)
        .then(response => {
          // eslint-disable-next-line
          this.setState({cards: response.data})
        }).catch((error) => {console.log(error)});

}

onChangeToken(e){
  this.setState({myToken: e.target.value, error2: ''})
}

cancelDelete() {
  this.setState({deleteID: '', myToken: '', error2: ''})
}

showDelete(id, token) {
  this.setState({deleteID: id})
  return <DeleteDialog id={id} token={token} />
}

onDeleteDialog(id, token) {
  return <DeleteDialog id={id} token={token} onChangeToken={this.onChangeToken} myToken={this.state.myToken} error2={this.state.error2} delete={this.onDelete} cancel={this.cancelDelete} />
}

onDelete(id, token) {
  const {myToken} = this.state;
      const details = { id, token, myToken}
  
      if(myToken != token) return this.setState({error2: 'Invalid token'});
  
      this.setState({ error2: '' });

   axios.post(`${data.host}api/v1/agent/card/delete?token=${data.token}`, details)
          .then(res => {
            
        axios.get(`${data.host}api/v1/agent/cards?token=${data.token}`)
        .then(response => {
          // eslint-disable-next-line
          this.setState({cards: response.data, deleteID: ''})
        }).catch((error) => {});
          }).catch(err => {
            this.setState({ loading: false, error2: err.toString() });
          });
}

cardsView() {
  return this.state.cards.map((t, index) => {
       return <Cards {...t} i={index}  showDelete={this.showDelete} deleteID={this.state.deleteID} showSingleDelete={this.onDeleteDialog} delete={this.onDelete} key={t.id}/>
      })
}

transactionsView() {
  return this.state.transactions.map((t, index) => {
       return <Transaction {...t} i={index}  key={t.id}/>
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
            <h1>Kakudi Wallet</h1>
            <div className="section-header-breadcrumb">
              <div className="breadcrumb-item active"><Link to="#">Dashboard</Link></div>
              <div className="breadcrumb-item">Home</div>
            </div>
          </div>

          <div className="row">
            <div className="col-12 col-sm-12 col-lg-5">
              <div className="card">
                <div className="card-header">
                  <h4>Wallet</h4>
                </div>
                { this.state.matches? <div className="card-body">
                  <div className="card img-fluid">
                    <img className="card-img-top" src="../assets/img/kakudi_card_bg.svg" alt="Card" style={{width:"100%"}} />
                    <div className="card-img-overlay">
                    <div style={{float: "left"}}>
                      <p className="card-text text-white" style={{fontSize: '8'}}>Current Balance</p>
                      <h6 className="card-title text-white my-3" style={{fontSize: '12'}}>&#8358; <span>{this.state.balance.toFixed(2)}</span></h6>
                      <p className="card-title text-light mt-3"><Link to="/add-funds" className="text-light">Add funds <i className="fa fa-plus-circle"></i></Link></p>
                      </div>
                      <div style={{float: "right"}}>
                      <p className="card-text text-white" style={{fontSize: '8'}}>Commision Balance</p>
                      <h6 className="card-title text-white my-3" style={{fontSize: '12'}}>&#8358; <span>{this.state.commision.toFixed(2)}</span></h6>
                      <p className="card-title text-light mt-3"><Link to="/unload" className="text-light">Unload Commission <i className="fa fa-plus-circle"></i></Link></p>
                      </div>
                    </div>
                  </div>
                </div>

:
<> <div className="card-body">
                  <div className="card img-fluid">
                    <img className="card-img-top" src="../assets/img/kakudi_card_bg.svg" alt="Card" style={{ width: "100%" }} />
                    <div className="card-img-overlay">
                      <div style={{ float: "left" }}>
                        <p className="card-text text-white" style={{fontSize: '8'}}>Current Balance</p>
                        <h4 className="card-title text-white my-3">&#8358; <span>{this.state.balance.toFixed(2)}</span></h4>
                        <p className="card-title text-light mt-3"><Link to="/add-funds" className="text-light">Add funds <i className="fa fa-plus-circle"></i></Link></p>
                      </div>
                    
                    </div>

                  </div>
                </div>

                <div className="card-body">
                  <div className="card img-fluid">
                    <img className="card-img-top" src="../assets/img/kakudi_card_bg.svg" alt="Card" style={{ width: "100%" }} />
                    <div className="card-img-overlay">
                      <div style={{ float: "left" }}>
                        <p className="card-text text-white" style={{fontSize: '8'}}>Commision Balance</p>
                        <h4 className="card-title text-white my-3">&#8358; <span>{this.state.commision.toFixed(2)}</span></h4>
                        <p className="card-title text-light mt-3"><Link to="/unload" className="text-light">Unload Commission <i className="fa fa-plus-circle"></i></Link></p>
                      </div>
                    </div>

                  </div>
                </div> </>}



              </div>
            </div>

            <div className="col-12 col-sm-12 col-lg-5">
              <div className="card">
                <div className="card-header">
                  <h4>Saved Cards</h4>
                </div>
                <div className="summary-item card-body">
                  <ul className="list-unstyled list-unstyled-border">
                  {this.cardsView()}
                  </ul>
                  <Link to="/add-card"><div className="card-footer bg-whitesmoke text-center">
                    Add a new card <i className="fa fa-plus-circle"></i>
                  </div></Link>
                </div>
              </div>
            </div>



            <div className="col-12 col-sm-12 col-lg-2">
              <div className="mx-auto">
                <div className="card-stats-item bg-light mx-auto py-4 rounded mb-5">
                <Link to="/withdraw-money">
                  <div className="mx-auto text-center"><img src="../assets/img/wallet.svg" alt="" /></div>
                  <div className="card-stats-item-count text-center">Withdraw from Wallet</div></Link>
                </div>
              </div>
          </div>

        </div>






        <div className="row">
          <div className="col-12 col-md-12">
            <div className="card">
              <div className="card-header">
                <h4>Latest transactions</h4>
              </div>
              <div className="card-body">
                <div className="table-responsive">
                <table className="table table-striped" id="table-1">
                      <thead>
                        <tr>
                          <th className="text-center">
                            #
                          </th>
                          <th>Description</th>
                          <th>Transaction Type</th>
                          <th>Amount</th>
                          <th>Date</th>
                          <th>Status</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                       {this.transactionsView()}
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


    );
  }
}

export default Profile;
