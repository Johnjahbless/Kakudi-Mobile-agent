import React, { Component } from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';
import data from '../../../components/constants';
import Loading from './loader';
import Cookies from 'universal-cookie';
import $ from 'jquery';

const cookies = new Cookies();


const Cards = props => (
    <Link to=""><li onClick={() => { props.pay(props.id) }} className="media mb-3">
        <div className="rounded-circle bg-light p-3 mr-3">
            <i className="fas fa-credit-card"></i>
        </div>
        <div className="media-body">
            <div className="media-title">{props.title}</div>
            <div className="text-small text-muted">{props.card_no.substring(0, 4)}************** <div className="bullet"></div> Expires {props.month}/{props.year}</div>
        </div>
    </li></Link>
)

export class Profile extends Component {
    constructor(props) {
        super(props);

        this.onChangeAmount = this.onChangeAmount.bind(this);
        this.onChangeCardNumber = this.onChangeCardNumber.bind(this);
        this.onChangeCardExpiryMonth = this.onChangeCardExpiryMonth.bind(this);
        this.onChangeCardExpiryYear = this.onChangeCardExpiryYear.bind(this);
        this.onChangeCardCvv = this.onChangeCardCvv.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onSubmit2 = this.onSubmit2.bind(this);
        this.onPayCard = this.onPayCard.bind(this);

        this.state = {
            cardNumber: '',
            month: '',
            year: '',
            cvv: '',
            amount: 0,
            loading: false,
            cards: []
        }
    }
    componentDidMount() {

        const rechargeDetails = cookies.get('__funds');

        if (rechargeDetails !== undefined) this.setState({ amount: rechargeDetails.amount }); else return window.location = 'add-funds';


        axios.get(`${data.host}api/v1/agent/cards?token=${data.token}`)
            .then(response => {
                // eslint-disable-next-line
                this.setState({ cards: response.data })
            }).catch((error) => { console.log(error) });
    }

    componentWillUnmount() {
        $('#congratulationModal').modal('hide');
    }


    onChangeAmount(e) {
        this.setState({ amount: e.target.value });
    }

    onChangeCardNumber(e) {
        this.setState({ cardNumber: e.target.value });
    }

    onChangeCardExpiryMonth(e) {
        this.setState({ month: e.target.value });
    }

    onChangeCardExpiryYear(e) {
        this.setState({ year: e.target.value });
    }

    onChangeCardCvv(e) {
        this.setState({ cvv: e.target.value });
    }

    onSubmit2(e) {
        e.preventDefault();
        $('#mediumModal').modal('show');
    }

    onSubmit(e) {
        e.preventDefault();

        const { cardNumber, month, year, cvv, amount } = this.state;



        this.setState({ loading: true, error: '' })

        const details = { amount, cardNumber, month, year, cvv }


        axios.post(`${data.host}api/v1/agent/fund/wallet?token=${data.token}`, details)
            .then(res => {
                //console.log(res.data)
                if (res.data === '200') return this.setState({ loading: false, error: 'Invalid transaction' });
                this.setState({ loading: false, error: 'Successfull' });

                $('#congratulationModal').modal('show');
            }).catch(err => {
                this.setState({ loading: false, error: err.toString() });
            });


    }

    onPayCard(cardId) {
        const { amount } = this.state;


        this.setState({ loading: true, error: '' })

        const details = { amount, cardId }


        axios.post(`${data.host}api/v1/agent/card/fund/wallet?token=${data.token}`, details)
            .then(res => {
                this.setState({ loading: false });
                $('#congratulationModal').modal('show');
            }).catch(err => {
                this.setState({ loading: false, error: err.toString() });
            });


    }

    cardsView() {
        return this.state.cards.map((t, index) => {
            return <Cards {...t} i={index} pay={this.onPayCard} key={t.id} />
        })
    }


    Loaderview() {
        return this.state.loading ? <Loading /> : null

    }
    render() {
        return (
            <>
                <div className="main-content">

                    <section className="section">
                        <div className="section-header">
                            <h1>Add Funds</h1>
                            <div className="section-header-breadcrumb">
                                <div className="breadcrumb-item active"><Link to="/">Dashboard</Link></div>
                                <div className="breadcrumb-item">Choose your payment method</div>
                            </div>
                        </div>
                        <h4>Choose your payment method</h4>
                        <div className="col-12 col-md-12 col-lg-7">
                            <div className="card">
                                <div className="card-body">
                                    <ul className="nav nav-pills" id="myTab3" role="tablist">
                                        <li className="nav-item">
                                            <a
                                                className="nav-link active"
                                                id="home-tab3"
                                                data-toggle="tab"
                                                href="#home3"
                                                role="tab"
                                                aria-controls="home"
                                                aria-selected="true"
                                            >
                                                Debit Card
                        </a>
                                        </li>
                                        <li className="nav-item">
                                            <a
                                                className="nav-link"
                                                id="profile-tab3"
                                                data-toggle="tab"
                                                href="#profile3"
                                                role="tab"
                                                aria-controls="profile"
                                                aria-selected="false"
                                            >
                                                Fund with Saved Cards
                        </a>
                                        </li>


                                    </ul>
                                    <div className="tab-content" id="myTabContent2">
                                        <div
                                            className="tab-pane fade show active"
                                            id="home3"
                                            role="tabpanel"
                                            aria-labelledby="home-tab3"
                                        >


                                            <div id="nav-tab-card" className="tab-pane fade show active">
                                                <form onSubmit={this.onSubmit}>
                                                    <div className="form-group">
                                                        <label for="cardNumber">Card number</label>
                                                        <div className="input-group">
                                                            <input type="text" name="cardNumber" onChange={this.onChangeCardNumber} value={this.state.cardNumber} minLength="15" maxLength="15" placeholder="Your card number" className="form-control" required />
                                                            <div className="input-group-append">
                                                                <span className="input-group-text text-muted">
                                                                    <i className="fa fa-cc-visa mx-1"></i>
                                                                    <i className="fa fa-cc-amex mx-1"></i>
                                                                    <i className="fa fa-cc-mastercard mx-1"></i>
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-sm-8">
                                                            <div className="form-group">
                                                                <label><span className="hidden-xs">Expiration</span></label>
                                                                <div className="input-group">
                                                                    <input type="text" placeholder="MM" name="" className="form-control" onChange={this.onChangeCardExpiryMonth} value={this.state.month} maxLength="2" minLength="2" required />
                                                                    <input type="text" placeholder="YY" name="" className="form-control" onChange={this.onChangeCardExpiryYear} value={this.state.year} maxLength="2" minLength="2" required />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-sm-4">
                                                            <div className="form-group mb-4">
                                                                <label data-toggle="tooltip" title="Three-digits code on the back of your card">CVV
                                                                <i className="fa fa-question-circle"></i>
                                                                </label>
                                                                <input type="text" onChange={this.onChangeCardCvv} value={this.state.cvv} maxLength="3" minLength="3" required className="form-control" />
                                                            </div>
                                                        </div>



                                                    </div>
                                                    {this.state.loading ? this.Loaderview() : <button type="submit" className="subscribe btn btn-primary btn-block rounded-pill shadow-sm"> Confirm  </button>}
                                                </form>
                                                <div className="text-center p-t-30">
                                                    <p className="txt1">
                                                        {this.state.error}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div
                                            className="tab-pane fade"
                                            id="profile3"
                                            role="tabpanel"
                                            aria-labelledby="profile-tab3"
                                        >

                                            <div id="nav-tab-cards">
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

                                    </div>
                                </div>
                            </div>
                        </div>



                    </section>
                </div>



                <div className="modal fade" id="congratulationModal" tabindex="-1" role="dialog" aria-labelledby="congratulationModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-lg" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="card card-primary">
                                    <div className="card-header">
                                        <img className="mx-auto d-block" src="../assets/img/success_icon.svg" alt="" />

                                    </div>
                                    <h4 className="mx-auto display-5 py-3">Congratulations!!!</h4>

                                    <div className="card-body mx-auto">
                                        <p className="text-center font-weight-bold">Transaction successful!</p>
                                        <a className="btn btn-outline-primary py-2 btn-lg btn-block rounded" href="index.html">Return Home</a>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default Profile;
