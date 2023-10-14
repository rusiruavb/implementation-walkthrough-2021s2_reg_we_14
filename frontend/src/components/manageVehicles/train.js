import React, { Component } from "react";
import { connect } from "react-redux";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import moment from "moment";
import Loader from "../loader";
import AddTrain from "../../pages/manager/add_train";

const initialState = {
  vehicles: [],
  isLoading: false,
};

const rowStyle = (row, rowIndex) => {
  const style = {};
  style.fontSize = 16;
  style.fontWeight = "normal";
  style.height = 2;
  style.padding = "10px";
  style.margin = "10px";
  return style;
};

class Train extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  tableColumData = [
    {
      dataField: "actions",
      text: "Actions",
      formatter: (cell, row) => this.actionButtonFormatter(row),
      headerStyle: () => {
        return { width: "80px", fontSize: "9px" };
      },
      csvExport: false,
    },
    {
      dataField: "id",
      text: "ID",
      formatter: (cell) => this.setIdFormatter(cell),
      headerStyle: () => {
        return { width: "100px" };
      },
    },
    {
      dataField: "vehicleId",
      text: "Vehicle ID",
      formatter: (cell, row) => this.setNameFormatter(cell, row),
      headerStyle: () => {
        return { width: "250px" };
      },
    },
    {
      dataField: "registrationNumber",
      text: "Vehicle Number",
      formatter: (cell) => this.setRegistrationNoFormatter(cell),
      headerStyle: () => {
        return { width: "110px" };
      },
    },
    {
      dataField: "driver",
      text: "Driver",
      formatter: (cell) => this.setFieldFormatter(cell),
    },
    {
      dataField: "numberOfSeats",
      text: "Seats",
      formatter: (cell) => this.setFieldFormatter(cell),
    },
    {
      dataField: "isPublic",
      text: "Public/Private",
      formatter: (cell) => this.setFieldFormatter(cell),
    },
  ];

  setIdFormatter(cell) {
    return <p className="vehicle-data text-dark">{cell}</p>;
  }

  setNameFormatter(cell, row) {
    return (
      <div className="d-flex">
        <p className="m-0 vehicle-data text-dark">{row.Driver}</p>
      </div>
    );
  }

  onSelectVehicleToUpdate = (event, vehicleId) => {
    const { vehicles } = this.state;
    if (event && vehicles && vehicles.length > 0 && vehicleId) {
      const selectedvehicle = vehicles.find(
        (vehicle) => vehicle._id === vehicleId
      );
      this.props.setVehicle(selectedvehicle);
      this.setState({ selectedvehicle: selectedvehicle });
    }
  };

  actionButtonFormatter = (row) => {
    const { removeVehicleId } = this.state;
    return (
      <span className="dropdown show">
        <span className="dropdown">
          <a
            href="#"
            className="btn btn-no-shadow m-btn m-btn--hover-brand m-btn--icon m-btn--icon-only m-btn--pill btn-sm btn-rounded"
            data-mdb-toggle="dropdown"
          >
            <i className="fas fa-ellipsis-h"></i>
          </a>
          <div className="dropdown-menu dropdown-menu-right">
            <a
              className="dropdown-item"
              href="#"
              data-mdb-toggle="modal"
              data-mdb-target="#update-vehicle"
              onClick={(e) => this.onSelectVehicleToUpdate(e, row._id)}
            >
              <i class="far fa-edit" /> Edit
            </a>

            <a
              className="dropdown-item"
              data-mdb-toggle="modal"
              data-mdb-target={`#q${removeVehicleId}`}
              onClick={(event) => this.setRemoveVehicleId(event, row._id)}
            >
              <i class="far fa-trash-alt" /> Delete
            </a>
          </div>
        </span>
      </span>
    );
  };

  setRegistrationNoFormatter = (cell) => {
    return <p className="vehicle-data">{cell}Vehicle Number</p>;
  };

  setFieldFormatter(cell) {
    return <p className="vehicle-data text-dark">{cell}</p>;
  }

  setDateFormatter(cell) {
    return (
      <p className="vehicle-data text-dark">{moment(cell).format("lll")}</p>
    );
  }

  render() {
    const { isLoading, removeVehicleId } = this.state;
    return (
      <div className="p-4 admin-container-color">
        <div className="card p-3 container-vehicle  ">
          <div className="d-flex">
            <h3 className="card-title">Train</h3>
            <div className="align-right">
              <button
                className="btn btn-rounded btn-add"
                data-mdb-toggle="modal"
                data-mdb-target="#add-train"
              >
                <i class="fa fa-plus plus-icon" aria-hidden="true"></i>
              </button>
            </div>
          </div>

          {(props) => (
            <div>
              <BootstrapTable
                {...props.baseProps}
                pagination={paginationFactory()}
                bordered={true}
                striped
                hover
                className="custom-table"
                headerClasses="header-class"
                wrapperClasses="table-responsive"
                expandRow={this.expandRow}
                rowStyle={rowStyle}
              />
            </div>
          )}
          <AddTrain />

          <div
            className="modal fade"
            id={"q" + removeVehicleId}
            tabIndex="-1"
            aria-labelledby="exampleModalLabel"
            data-mdb-backdrop="static"
            data-mdb-keyboard="false"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">
                    Remove Bus
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-mdb-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <p>Do you want to remove this bus?</p>
                </div>
                <div className="modal-footer d-flex justify-content-center">
                  {isLoading ? (
                    <Loader size={50} />
                  ) : (
                    <div>
                      <button
                        type="button"
                        className="btn btn-light btn-no-shadow btn-rounded"
                        data-mdb-dismiss="modal"
                      >
                        Close
                      </button>
                      <button
                        type="button"
                        className="btn btn-danger btn-no-shadow btn-rounded"
                        onClick={this.removeVehicle}
                      >
                        Remove
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({});
export default connect(mapStateToProps, mapDispatchToProps)(Train);
