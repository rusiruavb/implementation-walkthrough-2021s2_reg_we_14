import React, { Component } from "react";
import { connect } from "react-redux";

const $ = window.$;
let formData = {};

const Constants = {
  LOGIN_SUCCESS: "User login success",
  LOGIN_FAIL: "Username or password is invalid",
  USER_NAME_REQUIRED: "Username is required",
  PASSWORD_REQUIRED: "Password is required",
  FIELDS_REQUIRED: "Please check the input fields",
  USER_NOT_FOUND: "User not found",
  PASSWORD_NOT_MATCH: "Password is not matched",
};

const initialState = {
  isLoading: false,
  isFormNotValid: false,
  userName: "",
  password: "",
};

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  // validation
  validateForm() {
    const { userName, password } = this.state;

    const data = {
      userName: userName && userName.trim().length > 0 ? userName : null,
      password: password && password.trim().length > 0 ? password : null,
    };

    formData = Object.assign({}, data);
    return true;
  }

  render() {
    return (
      <section className="login-section vh-100">
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col col-xl-10">
              <div className="card">
                <div className="row g-0">
                  <div className="col-md-6 col-lg-5 d-none d-md-block">
                    <img
                      src="https://media.discordapp.net/attachments/835788455643840572/894265801534754816/unknown.png?width=633&height=678"
                      alt="login form"
                      className="img-fluid"
                    />
                  </div>

                  <div className="col-md-6 col-lg-7 d-flex align-items-center">
                    <div className="card-body p-4 p-lg-5 text-black">
                      <form>
                        <h1 className="fw-normal mb-3 pb-3 text-allign-center">
                          LOGIN HERE!
                        </h1>
                        <div className="form-outline mb-4">
                          <input
                            type="text"
                            id="form2Example17"
                            className="form-control form-control-lg"
                            name="userName"
                          />
                          <label className="form-label" for="form2Example17">
                            User Name
                          </label>
                        </div>

                        <div className="form-outline mb-4">
                          <input
                            type="password"
                            id="form2Example27"
                            className="form-control form-control-lg"
                            name="password"
                          />
                          <label className="form-label" for="form2Example27">
                            Password
                          </label>
                        </div>

                        <div className="pt-1 mb-4 ">
                          <button class="btn btn-lg login-btn btn-dark w-100 btn-rounded btn-no-shadow">
                            Login
                          </button>
                        </div>

                        <a className="small text-muted" href="#!">
                          Forgot password?
                        </a>
                        <a className="small text-muted" href="/register">
                          Sign Up
                        </a>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
