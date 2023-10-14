import React, { Component } from "react";

class DayPassStationList extends Component {
  render() {
    return (
      <div className="container">
        <div className="card" style={{ borderRadius: 30, marginTop: 30 }}>
          <div className="card-body">
            <h5 className="card-title">Day pass stations</h5>
            <p className="card-text">
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </p>
            <button type="button" className="btn btn-primary">
              Button
            </button>
          </div>
        </div>

        <div className="card" style={{ borderRadius: 30, marginTop: 30 }}>
          <div className="card-body">
            <h5 className="card-title">Recharge points / day pass stations</h5>
            <p className="card-text">
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </p>
            <button type="button" className="btn btn-primary">
              Button
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default DayPassStationList;
