import React, { Component } from 'react';
import { connect } from 'react-redux';

class AdminDashboard extends Component {
  constructor(props){
    super(props);
  }

  render(){
    return(
      <div className="container d-cont">
        <div className="row">
          <div className="col flex-start">
            <div className="dashboard-container flex-start dashboard-card">
              <img className="dashboard-card-image" alt="Snow" src="https://media.discordapp.net/attachments/835788455643840572/894260624488550410/unknown.png"/>
              <div className="centered" className="dashboard-card-text">
                <h2 className="dashboard-card-text1">Manage</h2>
                <h2 className="dashboard-card-text2">Inspector</h2>
              </div>
            </div>
          </div>

          <div className="col flex-start dashboard-card">
            <div className="dashboard-container flex-start">
              <img className="dashboard-card-image" src="https://media.discordapp.net/attachments/835788455643840572/894428674521198633/unknown.png"/>
              <div className="centered" className="dashboard-card-text">
                <h2 className="dashboard-card-text1">Apply For</h2>
                <h2 className="dashboard-card-text2">Smart Card</h2>
              </div>
            </div>
          </div>

          <div className="col">
            <div className="dashboard-container flex-start dashboard-card">
              <img className="dashboard-card-image" alt="Snow" src="https://media.discordapp.net/attachments/835788455643840572/894257906529206292/unknown.png"/>
              <div className="centered" className="dashboard-card-text">
                <h2 className="dashboard-card-text5">Manage</h2>
                <h2 className="dashboard-card-text6">Vehicles</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

}


const mapStateToProps = (state) => ({

});

const mapDispatchToProps = (dispatch) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(AdminDashboard);