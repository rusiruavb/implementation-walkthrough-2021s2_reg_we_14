import React, { Component } from "react";
import { NotificationManager } from "react-notifications";
import Loader from "../../components/loader";
import { connect } from "react-redux";
import { createInspector } from "../../actions/inspector_actions";

let formData = {};

const $ = window.$;

class Inspector extends Component {
  constructor(props) {
    super(props);
    this.closeModal = this.closeModal.bind(this);
    this.onChange = this.onChange.bind(this);
    this.state = {
      fname: "",
      lanme: "",
      nic: "",
      phone: "",
      email: "",
      routesList: "",
      isLoading: false,
      formNotValid: false,
      role: "MANAGER",
    };
  }

  componentWillReceiveProps = (nextProps) => {
    if (this.props.createinspectors !== nextProps.createinspectors) {
      this.setState({ isLoading: false }, () => {
        NotificationManager.success("Inspector created Successfully! ");
      });
    }

    if (this.props.createinspectorserror !== nextProps.createinspectorserror) {
      if (
        nextProps.createinspectorserror &&
        nextProps.createinspectorserror.message
      ) {
        this.setState({ isLoading: false }, () => {
          NotificationManager.error(nextProps.createinspectorserror.message);
        });
      } else {
        this.setState({ isLoading: false }, () => {
          NotificationManager.error("Creating Inspector FAILED");
        });
      }
    }
  };

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  closeModal() {
    $("#add-inspector").modal("toggle");
  }

  onRouteSelect = (event) => {
    if (event) {
      this.setState({ routes: event.value });
    }
  };

  onSubmit = (e) => {
    e.preventDefault();
    if (this.validateForm()) {
      let data = Object.values(formData).map((key) => {
        return key != null;
      });

      if (!data.includes(false)) {
        let inspectorData = {
          nic: this.state.nic,
          email: this.state.email,
          firstName: this.state.fname,
          lastName: this.state.lname,
          mobileNumber: this.state.phone,
          routesList: this.state.routesList,
        };

        console.log(" DATA TO SEND ", inspectorData);
        this.props.createInspector(inspectorData);
        this.setState({ isLoading: true });
      } else {
        this.setState({ formNotValid: true }, () => {
          NotificationManager.warning("Please check the input fields");
        });
      }
    }
  };

  validateForm() {
    const { nic, email, fname, lname, phone, routesList } = this.state;
    const data = {
      nic: nic && nic.trim().length > 0 ? nic : null,
      email: email && email.trim().length > 0 ? email : null,
      firstName: fname && fname.toString().trim().length > 0 ? fname : null,
      lastName: lname && lname.trim().length > 0 ? lname : null,
      mobileNumber: phone && phone.trim().length > 0 ? phone : null,
      routesList:
        routesList && routesList.trim().length > 0 ? routesList : null,
    };
    formData = Object.assign({}, data);
    return true;
  }

  render() {
    const { isLoading } = this.state;
    return (
      <div
        className="modal fade"
        id="add-inspector"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <div>
                <h3 className="modal-title create-inspecter-txt">
                  Create Inspector
                </h3>
              </div>
              <div classname="close-icon">
                <button
                  type="button"
                  className="btn-close "
                  aria-label="Close"
                  onClick={this.closeModal}
                ></button>
              </div>
            </div>
            <div className="container-add card inspector">
              <div className="row mb-2">
                <div className="row m-2 mb-3 col">
                  <label htmlFor="fname" className="form-label p-0">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="fname"
                    className="form-control"
                    name="fname"
                    value={this.state.fname}
                    onChange={this.onChange}
                  />
                  {formData.firstName === null && this.state.formNotValid ? (
                    <span className="text-danger validation-text p-0">
                      First name is required
                    </span>
                  ) : null}
                </div>
                <div className="row m-2 mb-3 col">
                  <label htmlFor="lname" className="form-label p-0">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lname"
                    className="form-control"
                    name="lname"
                    value={this.state.lname}
                    onChange={this.onChange}
                  />
                  {formData.lastName === null && this.state.formNotValid ? (
                    <span className="text-danger validation-text p-0">
                      Last name is required
                    </span>
                  ) : null}
                </div>
              </div>
              <div className="row m-2 mb-2">
                <label htmlFor="email" className="form-label p-0">
                  Email Address
                </label>
                <input
                  type="text"
                  id="email"
                  className="form-control"
                  name="email"
                  value={this.state.email}
                  onChange={this.onChange}
                />
                {formData.email === null && this.state.formNotValid ? (
                  <span className="text-danger p-0 validation-text p-0">
                    Email is required
                  </span>
                ) : null}
              </div>
              <div className="row mb-2">
                <div className="row m-2 mb-3 col">
                  <label htmlFor="nic" className="form-label p-0">
                    NIC
                  </label>
                  <input
                    type="text"
                    id="nic"
                    className="form-control"
                    name="nic"
                    value={this.state.nic}
                    onChange={this.onChange}
                  />
                  {formData.nic === null && this.state.formNotValid ? (
                    <span className="text-danger validation-text p-0">
                      NIC is required
                    </span>
                  ) : null}
                </div>
                <div className="row m-2 mb-3 col">
                  <label htmlFor="phone" className="form-label p-0">
                    Contact Number
                  </label>
                  <input
                    type="text"
                    id="phone"
                    className="form-control"
                    name="phone"
                    value={this.state.phone}
                    onChange={this.onChange}
                  />
                  {formData.mobileNumber === null && this.state.formNotValid ? (
                    <span className="text-danger validation-text p-0">
                      Phone Number is required
                    </span>
                  ) : null}
                </div>
              </div>

              <div className="col m-2 mb-3">
                <label htmlFor="routesList" className="form-label p-0 m-0 mb-2">
                  Routes
                </label>
                <input
                  type="text"
                  className="select basic-single"
                  id="routesList"
                  name="routesList"
                  onChange={this.onChange}
                />
              </div>
            </div>
            <div className="modal-footer d-flex">
              {isLoading ? (
                <div className="justify-content-left text-center">
                  <Loader size={40} />
                </div>
              ) : (
                <div className="d-flex justify-content-end">
                  <button
                    className="btn btn-secondary btn-no-shadow btn-rounded"
                    onClick={this.closeModal}
                  >
                    Close
                  </button>
                  &nbsp;&nbsp;
                  <button
                    href="#"
                    className="btn btn-primary btn-no-shadow btn-rounded"
                    onClick={this.onSubmit}
                  >
                    Save Changes
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  createinspectors: state.inspectorReducer.createinspectors,
  createinspectorserror: state.inspectorReducer.createinspectorserror,
});

const mapDispatchToProps = (dispatch) => ({
  createInspector: (inspectorData) => {
    dispatch(createInspector(inspectorData));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Inspector);
