import React, { Component } from 'react';
import { connect } from 'react-redux';

class Dashboard extends Component {
  constructor(props){
    super(props);
  }

  render(){
    return(
      <div className="container d-cont">
        <div className="row">
          <div className="col flex-start dashboard-card">
            <div className="dashboard-container flex-start">
              <img className="dashboard-card-image" src="https://media.discordapp.net/attachments/835788455643840572/894235534619201597/unknown.png"/>
              <div className="centered" className="dashboard-card-text">
                <h2 className="dashboard-card-text1">Apply For</h2>
                <h2 className="dashboard-card-text2">Smart Card</h2>
              </div>
            </div>
          </div>

          <div className="col">
            <div className="dashboard-container flex-start dashboard-card">
              <img className="dashboard-card-image" src="https://media.discordapp.net/attachments/835788455643840572/894257508930191360/unknown.png"/>
              <div className="centered" className="dashboard-card-text">
                <h2 className="dashboard-card-text3">DayPass Situations/</h2>
                <h2 className="dashboard-card-text4">Recharge Points</h2>
              </div>
            </div>
          </div>

          <div className="col">
            <div className="dashboard-container flex-start dashboard-card">
              <img className="dashboard-card-image" src="https://media.discordapp.net/attachments/835788455643840572/894257906529206292/unknown.png"/>
              <div className="centered" className="dashboard-card-text">
                <h2 className="dashboard-card-text5">Manage Smart</h2>
                <h2 className="dashboard-card-text6">Card</h2>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          
          <div className="col flex-start">
            <div className="dashboard-container flex-start dashboard-card">
              <img className="dashboard-card-image" src="https://media.discordapp.net/attachments/835788455643840572/894260624488550410/unknown.png"/>
              <div className="centered" className="dashboard-card-text">
                <h2 className="dashboard-card-text1">View Trip</h2>
                <h2 className="dashboard-card-text2">History</h2>
              </div>
            </div>
          </div>
          <div className="col">
          </div>
          <div className="col">
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

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);