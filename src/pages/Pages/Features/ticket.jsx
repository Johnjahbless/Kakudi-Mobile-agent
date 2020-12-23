import React, { Component } from "react";
import axios from 'axios';
import $ from 'jquery'
import { Link } from 'react-router-dom';
import moment from 'moment';
import data from '../../../components/constants';
import Loading from './loader';



const Chats = props => (
  <p>{props.msg}</p>
)

const Ticket = props => (
  <>
  <div onClick={() => { props.activate(props.supportId) }} className={props.supportId == props.activeId? 'ticket-item active' : 'ticket-item'}>
  <div className="ticket-title">
    <h4>{props.subject}</h4>
  </div>
  <div className="ticket-desc">
    <div>{props.firstName + ' ' + props.lastName}</div>
    <div className="bullet"></div>
    <div>{moment(props.date).format('YYYY MMM DD')}</div>
  </div>
</div>
<p></p>
</>
)
export class Profile extends Component {
   constructor(props) {
         super(props);
         this.onChangeReply= this.onChangeReply.bind(this);
         this.onActivate= this.onActivate.bind(this);
         this.onSubmit = this.onSubmit.bind(this);
         
     this.state = {
       reply: '',
       airtime: 0,
       data: 0,
       student: [],
       years: [],
       orders: [],
       total: [],
       chats: [],
       loading: true,
       datas: {},
       activeId: '',
       targetData: []
     }
 }
  componentDidMount() {
   
    axios.get(`${data.host}api/v1/user/supports?token=${data.token}`).then(response => {

      this.setState({targetData: response.data, datas: response.data[0], activeId: response.data[0].supportId});

      axios.get(`${data.host}api/v1/supports/chats/${response.data[0].supportId}?token=${data.token}`).then(res => {
    
        this.setState({chats: res.data, loading: false});
        for(var i = 0; i < res.data.length; i++) {
          var type = 'text';
         // if(chats[i].typing != undefined) type = 'typing';
          $.chatCtrl('#mychatbox', {
            text: (res.data[i].msg != undefined ? res.data[i].msg : ''),
            picture: (res.data[i].sender_role_id == '1'? '../assets/img/avatar/avatar-1.png' : '../assets/img/avatar/avatar-2.png'),
            position: res.data[i].sender_role_id == '1'? 'chat-right' : 'chat-left',
            type: type
          });
        }
      } ).catch((error) => {this.setState({error: error.toString(), loading: false})});
        
  
    } ).catch((error) => {this.setState({error: error.toString(), loading: false})});
      


    
}

onActivate(id) {
  
  this.setState({data: this.state.targetData.filter(t => t.supportId == id)[0], activeId: id, loading: true})

  axios.get(`${data.host}api/v1/supports/chats/${id}?token=${data.token}`).then(res => {
    
    this.setState({chats: res.data, loading: false});
    for(var i = 0; i < res.data.length; i++) {
      var type = 'text';
     // if(chats[i].typing != undefined) type = 'typing';
      $.chatCtrl('#mychatbox', {
        text: (res.data[i].msg != undefined ? res.data[i].msg : ''),
        picture: (res.data[i].sender_role_id == '1'? '../assets/img/avatar/avatar-1.png' : '../assets/img/avatar/avatar-2.png'),
        position: res.data[i].sender_role_id == '1'? 'chat-right' : 'chat-left',
        type: type
      });
    }
  } ).catch((error) => {this.setState({error: error.toString(), loading: false})});

}

onChangeReply(e) {

  this.setState({reply: e.target.value})
}

onSubmit(e) {
  e.preventDefault();
  const { reply, activeId } = this.state;



  this.setState({ loading: true, error: '' });

  const details = {
    msg: reply,
    supportId: activeId
  }

  axios.post(`${data.host}api/v1/support/chat/add?token=${data.token}`, details)
    .then(res => {
    
      axios.get(`${data.host}api/v1/supports/chats/${activeId}?token=${data.token}`).then(res => {
    
        this.setState({chats: res.data, loading: false, reply:''});
        for(var i = 0; i < res.data.length; i++) {
          var type = 'text';
         // if(chats[i].typing != undefined) type = 'typing';
          $.chatCtrl('#mychatbox', {
            text: (res.data[i].msg != undefined ? res.data[i].msg : ''),
            picture: (res.data[i].sender_role_id == '1'? '../assets/img/avatar/avatar-1.png' : '../assets/img/avatar/avatar-2.png'),
            position: res.data[i].sender_role_id == '1'? 'chat-right' : 'chat-left',
            type: type
          });
        }
      } ).catch((error) => {this.setState({error: error.toString(), loading: false})});

    }).catch(err => {
      this.setState({ loading: false, error: err.toString() });
    });

}

ticketView() {
  return this.state.targetData.map((t, index) => {
    return <Ticket {...t} activate={this.onActivate} activeId={this.state.activeId} i={index} key={t.id} />
  })
}

chatView() {
  return this.state.chats.map((t, index) => {
    return <Chats {...t} i={index} key={t.id} />
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
            <h1>Support Ticket</h1>
            <div className="section-header-breadcrumb">
              <div className="breadcrumb-item active"><Link to="/">Dashboard</Link></div>
              <div className="breadcrumb-item active"><Link to="/support">Supports</Link></div>
              <div className="breadcrumb-item">Support Ticket</div>
            </div>
          </div>



          
          <div className="row">
            <div className="col-md-12">
              <div className="card">
                <div className="card-header">
                  <h4>Tickets</h4>
                </div>
                <div className="card-body">
                  <a href="#/" className="btn btn-primary btn-icon icon-left btn-lg btn-block mb-4 d-md-none" data-toggle-slide="#ticket-items">
                    <i className="fas fa-list"></i> All Tickets
                  </a>
                  <div className="tickets">
                    <div style={{height: "400px", overflowX: "auto"}} className="ticket-items" id="ticket-items">
                      {this.ticketView()}
                     
                    </div>
                    <div className="ticket-content">
                      <div className="ticket-header">
                        <div className="ticket-sender-picture img-shadow">
                          {this.state.datas.image !== 'undefined'? <img src={this.state.datas.image} alt="" /> : null}
                        </div>
                        <div className="ticket-detail">
                          <div className="ticket-title">
                            <h4>{this.state.datas.subject}</h4>
                          </div>
                          <div className="ticket-info">
                            <div className="font-weight-600">{this.state.datas.firstName + ' ' + this.state.datas.lastName}</div>
                            <div className="bullet"></div>
                            <div className="text-primary font-weight-600">{moment(this.state.datas.date).format('YYYY MMM DD')}</div>
                          </div>
                        </div>
                      </div>
                      <div className="ticket-description">
                       
                          <div class="card chat-box" id="mychatbox">
                            <div class="card-header">
                            <div><p> {this.state.datas.description}</p>
                       {this.state.datas.attachment !== 'undefined'? <a href={this.state.datas.attachment} rel="noreferrer" target="_blank"> View attachment </a>: null}
                       </div></div>
                            
                            <div class="card-body chat-content" style={{overflow: "auto", height: "400px"}}></div>
                            </div>
                          <div className="container">
                            { this.state.loading? this.Loaderview() : null }
                          </div>
                        </div>

                        <div className="ticket-divider"></div>

                        <div className="ticket-form">
                          <form onSubmit={this.onSubmit}>
                            <div className="form-group">
                              <textarea className="summernote form-control" onChange={this.onChangeReply} value={this.state.reply} placeholder="Type a reply ..." required></textarea>
                            </div>
                           {this.state.loading? this.Loaderview() : <div className="form-group text-right">
                              <button  type="submit" className="btn btn-primary btn-lg">
                                Reply
                              </button>
                            </div>}
                          </form>
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
                  </div>
                  </div>
        </section>

        </div>
    
        
</>
    );
  }
}

export default Profile;
