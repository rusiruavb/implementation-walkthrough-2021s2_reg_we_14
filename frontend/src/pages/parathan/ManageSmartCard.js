import React, { Component } from "react";
import creditCard from "../../assets/creditcard.png";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Barcode from "react-barcode";
import { connect } from 'react-redux';
import { getAmountBalanceForUser } from '../../actions/reload_locaton_actions';

class ManageSmartCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      calendarDate: new Date(),
      package: "Del",
      amount: 5000,
      loan: "",
    };
  }

  componentDidMount() {
    let timer = setInterval(
      () =>
        this.setState({
          date: new Date(),
        }),
      1000
    );
  }

  componentWillUnmount() {
    // clearInterval(timer);
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <div class="card" style={{ borderRadius: 30, marginTop: 30 }}>
              <div class="card-body">
                <center>
                  <img src={creditCard} alt="cardImg" />
                  <p style={{ color: "#685369" }}>SM_0012</p>
                  <p style={{ color: "#B1B1B1" }}>Colombo, Peak card</p>
                  <p style={{ color: "#B1B1B1" }}>
                    {this.state.date.toLocaleTimeString()}
                  </p>
                  <p style={{ color: "#CBCBCB", fontSize: 48 }}>Rs. 2000</p>
                </center>
              </div>
            </div>
          </div>

          <div className="col-md-8">
            <div className="card" style={{ borderRadius: 30, marginTop: 30 }}>
              <div className="card-body">
                <div className="row">
                  <div
                    className="card col-md-5"
                    style={{
                      margin: 20,
                      backgroundColor: "#F3F3F3",
                      color: "#9A9A9A",
                    }}
                  >
                    {/* <div class="card-header">Header</div> */}
                    <div className="card-body">
                      <div className="row">
                        <div
                          className="col-md-8"
                          style={{ textAlign: "right" }}
                        >
                          <h5 className="card-title">Duluxe Package</h5>
                          <p className="card-text">Rs. 5000.00</p>
                        </div>

                        <div className="col-md-4">
                          <img />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    className="card col-md-5"
                    style={{
                      margin: 20,
                      backgroundColor: "#F3F3F3",
                      color: "#9A9A9A",
                    }}
                  >
                    {/* <div className="card-header">Header</div> */}
                    <div className="card-body">
                      <div className="row">
                        <div
                          className="col-md-8"
                          style={{ textAlign: "right" }}
                        >
                          <h5 className="card-title">Duluxe Package</h5>
                          <p className="card-text">Rs. 5000.00</p>
                        </div>

                        <div className="col-md-4">
                          <img />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div
                    className="card col-md-5"
                    style={{
                      margin: 20,
                      backgroundColor: "#F3F3F3",
                      color: "#9A9A9A",
                    }}
                  >
                    {/* <div className="card-header">Header</div> */}
                    <div className="card-body">
                      <div className="row">
                        <div
                          className="col-md-8"
                          style={{ textAlign: "right" }}
                        >
                          <h5 className="card-title">Duluxe Package</h5>
                          <p className="card-text">Rs. 5000.00</p>
                        </div>

                        <div className="col-md-4">
                          <img />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    class="card col-md-5"
                    style={{
                      margin: 20,
                      backgroundColor: "#F3F3F3",
                      color: "#9A9A9A",
                    }}
                  >
                    {/* <div className="card-header">Header</div> */}
                    <div className="card-body">
                      <div className="row">
                        <div
                          className="col-md-8"
                          style={{ textAlign: "right" }}
                        >
                          <h5 className="card-title">Duluxe Package</h5>
                          <p className="card-text">Rs. 5000.00</p>
                        </div>

                        <div className="col-md-4">
                          <img />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="card" style={{ borderRadius: 30, marginTop: 30 }}>
              <div className="card-body">
                <div className="row">
                  <div
                    style={{
                      height: 40,
                      width: 35,
                      left: "6.59%",
                      right: "89.89%",
                      top: "44.05%",
                      bottom: "50.09%",
                      background: "#3AB397",
                      borderRadius: 5,
                    }}
                    className="col-md-5"
                  ></div>
                  <div className="col-md-7" style={{ fontSize: 40 }}>
                    Eligible For Loan
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <Calendar
                      onChange={(e) => {
                        this.setState({
                          calendarDate: e,
                        });
                      }}
                      value={this.state.calendarDate}
                    />
                  </div>

                  <div className="col-md-6">
                    <center>
                      <p>Amount (0-500): </p>
                      <input
                        type="number"
                        name="amount"
                        id="amount"
                        style={{ borderRadius: 10 }}
                      />
                      <br />
                      <br />
                      <input
                        type="submit"
                        style={{
                          backgroundColor: "#685369",
                          borderRadius: 20,
                          padding: 10,
                          width: "30%",
                          color: "white",
                          fontSize: 24,
                        }}
                        type="button"
                        data-mdb-toggle="modal"
                        data-mdb-target="#exampleModal"
                        value="Apply"
                      />
                    </center>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            className="modal fade"
            id="exampleModal"
            tabindex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">
                    Receipt
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-mdb-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <p>{new Date().toLocaleDateString()}</p>

                  <center>
                    <p>
                      <b>Cash Receipt</b>
                    </p>
                    <hr style={{ borderStyle: "dotted", width: "70%" }} />

                    <div className="row">
                      <div className="col-md-4">
                        <p style={{ textAlign: "right" }}>Amount:</p>
                      </div>

                      <div className="col-md-4">
                        <p style={{ textAlign: "right" }}>
                          {this.state.amount}
                        </p>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-4">
                        <p style={{ textAlign: "right" }}>GMT:</p>
                      </div>

                      <div className="col-md-4">
                        <p style={{ textAlign: "right" }}>
                          {Math.round(this.state.amount / 96.07, 2)}
                        </p>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-4">
                        <p style={{ textAlign: "right" }}>Tax:</p>
                      </div>

                      <div className="col-md-4">
                        <p style={{ textAlign: "right" }}>
                          {Math.round(this.state.amount / 100, 2)}
                        </p>
                      </div>
                    </div>

                    <hr style={{ borderStyle: "dotted", width: "70%" }} />

                    <div className="row">
                      <div className="col-md-4">
                        <p style={{ textAlign: "right" }}>Total:</p>
                      </div>

                      <div className="col-md-4">
                        <p style={{ textAlign: "right" }}>
                          {Math.round(this.state.amount / 100, 2) +
                            Math.round(this.state.amount / 96.07, 2) +
                            this.state.amount}
                        </p>
                      </div>
                    </div>

                    <hr style={{ borderStyle: "dotted", width: "70%" }} />

                    <Barcode
                      value={
                        this.state.calendarDate.toLocaleDateString() +
                        " " +
                        this.state.amount +
                        " " +
                        this.state.package
                      }
                    />
                  </center>
                </div>
                <div className="modal-footer">
                  {/* <button type="button" class="btn btn-secondary" data-mdb-dismiss="modal">
                            Close
                            </button>
                            <button type="button" class="btn btn-primary">Save changes</button> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
    getAvailableBalance: state.reloadLocationReducer.getAvailableBalance,
  });
  
  const mapDispatchToProps = (dispatch) => ({
    getAmountBalanceForUser: () => {
      dispatch(getAmountBalanceForUser());
    },
  });

export default connect(mapStateToProps, mapDispatchToProps)(ManageSmartCard);