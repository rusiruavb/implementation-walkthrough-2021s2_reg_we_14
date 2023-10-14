import React, { Component } from "react";

class ManageVehicles extends Component {
  constructor(props) {
    super(props);
    this.onbuschange = this.onbuschange.bind(this);
    this.ontrianChange = this.ontrianChange.bind(this);
    this.onmetroChange = this.onmetroChange.bind(this);
  }

  onbuschange(e) {}

  ontrianChange(e) {}

  onmetroChange(e) {}
  render() {
    return (
      <div>
        <div className="container card-container">
          <h2 className="manage-vehicles">Manage Vehicles</h2>
          <div className="row">
            <div className="col flex-start bus-card">
              <a href="/bus">
                <div className="dashboard-container flex-start dashboard-card">
                  <img
                    className="dashboard-card-image"
                    alt="Snow"
                    src="https://media.discordapp.net/attachments/835788455643840572/894589083907670026/unknown.png?width=1086&height=678"
                  />
                </div>
              </a>
            </div>
            <div className="col flex-start metro-card">
              <a href="/train">
                <div className="dashboard-container flex-start dashboard-card">
                  <img
                    className="dashboard-card-image"
                    alt="Snow"
                    src="https://media.discordapp.net/attachments/835788455643840572/894592635463938058/unknown.png?width=1085&height=678"
                  />
                </div>
              </a>
            </div>
            <div className="col flex-start train-card">
              <a href="/metro">
                <div className="dashboard-container flex-start dashboard-card">
                  <img
                    className="dashboard-card-image"
                    alt="Snow"
                    src="https://media.discordapp.net/attachments/835788455643840572/894593062456688700/unknown.png?width=1079&height=678"
                  />
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ManageVehicles;
