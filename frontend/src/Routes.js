import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LoginPage from "./pages/login/login_page";
import RegistrationPage from "./pages/registration/registration_page";
import dashboard from "./pages/dashboard/dashboard";
import AdminDashboard from "./pages/admin/admin_dashboard";
import "./App.scss";
import NavigationBar from "./components/navBar/navigationBar";
import ManageVehicles from "./pages/manager/manage_vehicles";
import Bus from "./components/manageVehicles/bus";
import Train from "./components/manageVehicles/train";
import Metro from "./components/manageVehicles/metro";
import ManageInspector from "./pages/manager/manage_inspector";
import DayPassStationList from "./pages/parathan/DayPassStationList";
import ManageSmartCard from "./pages/parathan/ManageSmartCard";
import reloadLocations from "./pages/parathan/reloadLocations";
import TripHistory from "./pages/parathan/TripHistory";

function PageRoutes() {
  return (
    <div>
      <Router>
        <NavigationBar />
        <div>
          <section>
            <Switch>
              {/* Routes call here: <Route path='/home' component={Home} /> */}
              <Route path="/" component={LoginPage} exact />
              <Route path="/register" component={RegistrationPage} exact />
              <Route path="/dashboard" component={dashboard} exact />
              <Route path="/admin/dashboard" component={AdminDashboard} exact />
              <Route path="/managecard" exact component={ManageSmartCard} />
              <Route path="/manager/vehicle" component={ManageVehicles} />
              <Route path="/manager/inspector" component={ManageInspector} />
              <Route path="/bus" component={Bus} />
              <Route path="/train" component={Train} />
              <Route path="/metro" component={Metro} />
              <Route path="/locationlist" exact component={DayPassStationList}/>
              <Route path="/reloadlocations" exact component={reloadLocations}/>
              <Route path="/triphistory" exact component={TripHistory}/>
            </Switch>
          </section>
        </div>
      </Router>
    </div>
  );
}

export default PageRoutes;
