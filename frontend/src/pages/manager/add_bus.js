import React, { Component } from "react";
import { NotificationManager } from "react-notifications";
import Select from "react-select";
import { createVehicle } from "../../actions/vehicle_action";
import { connect } from "react-redux";
import Loader from "../../components/loader";

let formData = {};

const $ = window.$;

const publicorprivate = [
  { value: "Public", label: "Public" },
  { value: "Private", label: "Private" },
];

class Bus extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.onpublicselect = this.onpublicselect.bind(this);
    this.state = {
      vehicleId: "",
      driver: "",
      numberOfSeats: 0,
      isPublic: false,
      registrationNumber: "",
      isLoading: false,
      formNotValid: false,
      role: "MANAGER",
    };
  }

  componentWillReceiveProps = (nextProps) => {
    if (this.props.createvehicle !== nextProps.createvehicle) {
      this.setState({ isLoading: false }, () => {
        NotificationManager.success("Vehicle Added successfull!");
      });
    }

    if (this.props.createvehicleerror !== nextProps.createvehicleerror) {
      if (
        nextProps.createvehicleerror &&
        nextProps.createvehicleerror.message
      ) {
        this.setState({ isLoading: false }, () => {
          NotificationManager.error(nextProps.createvehicleerror.message);
        });
      } else {
        this.setState({ isLoading: false }, () => {
          NotificationManager.error("ADD VEHICLE FAILED");
        });
      }
    }
  };

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onpublicselect = (event) => {
    if (event) {
      this.setState({ isPublic: event.value });
    }
  };

  closeModal() {
    $("#add-bus").modal("toggle");
  }

  onSubmit = (e) => {
    e.preventDefault();
    if (this.validateForm()) {
      let data = Object.values(formData).map((key) => {
        return key != null;
      });

      if (!data.includes(false)) {
        let vehicleData = {
          vehicleId: this.state.vehicleId,
          driver: this.state.driver,
          numberOfSeats: this.state.numberOfSeats,
          isPublic: this.state.isPublic,
          registrationNumber: this.state.registrationNumber,
        };

        console.log("DATA TO SEND", vehicleData);
        this.props.createVehicle(vehicleData);
        this.setState({ isLoading: true });
      } else {
        this.setState({ formNotValid: true }, () => {
          NotificationManager.warning("Please check the input fields");
        });
      }
    }
  };

  validateForm() {
    const { vehicleId, driver, numberOfSeats, isPublic, registrationNumber } =
      this.state;
    const data = {
      vehicleId: vehicleId && vehicleId.trim().length > 0 ? vehicleId : null,
      driver: driver && driver.trim().length > 0 ? driver : null,
      numberOfSeats:
        numberOfSeats && numberOfSeats.toString().trim().length > 0
          ? numberOfSeats
          : null,
      isPublic: isPublic && isPublic.trim().length > 0 ? isPublic : null,
      registrationNumber:
        registrationNumber && registrationNumber.trim().length > 0
          ? registrationNumber
          : null,
    };
    formData = Object.assign({}, data);
    return true;
  }

  render() {
    const { isLoading } = this.state;
    return (
      <div
        className="modal fade"
        id="add-bus"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog ">
          <div className="modal-content">
            <div className="modal-header">
              <div className="col"><h3 className="modal-title addtrip-topic-txt">Add Trip</h3></div>
                <div className="vehicle-close-btn">
                  <button
                    type="button"
                    className="btn-close"
                    aria-label="Close"
                    onClick={this.closeModal}
                  ></button>
                </div>
            </div>
            <div className="container-add card">
              <div className="row m-2 mb-4">
                <label htmlFor="vehicleId" className="col-form-label">
                  Vehcile ID
                </label>
                <input
                  type="text"
                  id="vehicleId"
                  className="form-control"
                  name="vehicleId"
                  value={this.state.vehicleId}
                  onChange={this.onChange}
                />
                {formData.vehicleId === null && this.state.formNotValid ? (
                  <span className="text-danger validation-text p-0">
                    Vehicle Id is required
                  </span>
                ) : null}
              </div>

              <div className="row m-2 mb-2">
                <label htmlFor="registrationNumber" className="form-label p-0">
                  Registration Number
                </label>
                <input
                  type="text"
                  id="registrationNumber"
                  className="form-control"
                  name="registrationNumber"
                  value={this.state.registrationNumber}
                  onChange={this.onChange}
                />
                {formData.registrationNumber === null &&
                this.state.formNotValid ? (
                  <span className="text-danger validation-text p-0">
                    Vehicle Registration Number is required
                  </span>
                ) : null}
              </div>

              <div className="row">
                <div className="row m-2 mb-2 col">
                  <label htmlFor="driver" className="form-label p-0">
                    Driver
                  </label>
                  <input
                    type="text"
                    id="driver"
                    className="form-control"
                    name="driver"
                    value={this.state.driver}
                    onChange={this.onChange}
                  />
                  {formData.driver === null && this.state.formNotValid ? (
                    <span className="text-danger validation-text p-0">
                      Driver Name is required
                    </span>
                  ) : null}
                </div>

                <div className="row">
                  <div className="row m-2 mb-2 col">
                    <label htmlFor="numberOfSeats" className="form-label p-0">
                      Number of Seats
                    </label>
                    <input
                      type="text"
                      id="numberOfSeats"
                      className="form-control"
                      name="numberOfSeats"
                      value={this.state.numberOfSeats}
                      onChange={this.onChange}
                    />
                    {formData.numberOfSeats === null &&
                    this.state.formNotValid ? (
                      <span className="text-danger validation-text p-0">
                        Number of Seats in Vehicle is required
                      </span>
                    ) : null}
                  </div>

                  <div className="col m-2 mb-2">
                    <label htmlFor="isPublic" className="form-label p-0 m-0">
                      Public/ Private
                    </label>
                    <Select
                      options={publicorprivate}
                      className="select basic-single"
                      id="isPublic"
                      name="isPublic"
                      onChange={this.onpublicselect}
                    />
                    {formData.isPublic === null && this.state.formNotValid ? (
                      <span className="text-danger validation-text p-0">
                        Public | Private is required
                      </span>
                    ) : null}
                  </div>
                </div>
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
  createvehicle: state.vehicleReducer.createvehicle,
  createvehicleerror: state.vehicleReducer.createvehicleerror,
});

const mapDispatchToProps = (dispatch) => ({
  createVehicle: (vehicleData) => {
    dispatch(createVehicle(vehicleData));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Bus);
