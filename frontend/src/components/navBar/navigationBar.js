import React, { Component } from "react";

class NavigationBar extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-light ">
          <div className="container-fluid">
            <span className="navbar-brand-text mb-0 h1">Travel Go</span>
          </div>
          <div className="d-flex align-items-center">
            <a
              className="dropdown-toggle d-flex align-items-center hidden-arrow"
              href="#"
              id="navbarDropdownMenuLink"
              role="button"
              data-mdb-toggle="dropdown"
              aria-expanded="false"
            >
              <i class="fa fa-user icon" aria-hidden="true"></i>
            </a>
            <ul
              className="dropdown-menu dropdown-menu-end"
              aria-labelledby="navbarDropdownMenuLink"
            >
              <li>
                <a className="dropdown-item" href="#">
                  My profile
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Logout
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}

export default NavigationBar;
