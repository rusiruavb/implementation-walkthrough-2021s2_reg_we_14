import React, { Component } from "react";
import { connect } from "react-redux";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import moment from "moment";
import Inspector from "./add_inspectors";
import Loader from "../../components/loader";
import { NotificationManager } from "react-notifications";

const initialState = {
  inspectors: [],
  removeUserId: "",
  isLoading: false,
};

const $ = window.$;

const rowStyle = (row, rowIndex) => {
  const style = {};
  style.fontSize = 16;
  style.fontWeight = "normal";
  style.height = 2;
  style.padding = "10px";
  style.margin = "10px";
  return style;
};

class ManageInspector extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
    this.setRemoveUserId = this.setRemoveUserId.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  componentDidMount() {}

  componentWillReceiveProps = (nextProps) => {};

  closeModal() {
    const { removeUserId } = this.state;

    if (removeUserId) {
      $(`#q${removeUserId}`).modal("toggle");
      this.setState(initialState);
    }
  }

  setRemoveUserId = (event, userId) => {
    if (event) {
      this.setState({ removeUserId: userId });
    }
  };

  removeUser = (event) => {
    if (event) {
      event.preventDefault();
      const { removeUserId } = this.state;

      if (removeUserId) {
        console.log(removeUserId);
        this.props.deleteUser(removeUserId);
        this.setState({ isLoading: false });
        this.closeModal();
      }
    }
  };

  tableColumData = [
    {
      dataField: "actions",
      text: "Actions",
      formatter: (cell, row) => this.actionButtonFormatter(row),
      headerStyle: () => {
        return { width: "80px", fontSize: "9px" };
      },
    },
    {
      dataField: "userId",
      text: "ID",
      formatter: (cell) => this.setIdFormatter(cell),
      headerStyle: () => {
        return { width: "100px" };
      },
    },
    {
      dataField: "firstname",
      text: "Name",
      formatter: (cell, row) => this.setNameFormatter(cell, row),
      headerStyle: () => {
        return { width: "250px" };
      },
    },
    {
      dataField: "mobileNumber",
      text: "Mobile Number",
      formatter: (cell) => this.setPhoneFormatter(cell),
      headerStyle: () => {
        return { width: "110px" };
      },
    },
    {
      dataField: "routeList",
      text: "Routes",
      formatter: (cell) => this.setFieldFormatter(cell),
    },
  ];

  setIdFormatter(cell) {
    return <p className="user-data text-dark">{cell}</p>;
  }

  setNameFormatter(cell, row) {
    return (
      <div className="d-flex">
        <p className="m-0 user-data text-dark">
          {row.firstName}&nbsp;{row.lastName}
        </p>
      </div>
    );
  }

  actionButtonFormatter = (row) => {
    const { removeUserId } = this.state;
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
              data-mdb-target="#update-student"
            >
              <i class="far fa-edit" /> Edit
            </a>

            <a
              className="dropdown-item"
              data-mdb-toggle="modal"
              data-mdb-target=""
            >
              <i class="far fa-trash-alt" /> Delete
            </a>
          </div>
        </span>
      </span>
    );
  };

  setPhoneFormatter = (cell) => {
    return <p className="user-data">Phone {cell}</p>;
  };

  setFieldFormatter(cell) {
    return <p className="student-data text-dark">{cell}</p>;
  }

  render() {
    const { isLoading, removeUserId } = this.state;
    return (
      <div className="p-4 admin-container-color">
        <div className="card p-3 container manage-inspector-container">
          <div className="d-flex">
            <h3 className="users-title">Manage Inspectors</h3>
            <div className="align-right">
              <button
                className="btn btn-rounded plus-button btn-no-shadow"
                data-mdb-toggle="modal"
                data-mdb-target="#add-inspector"
              >
                <i className="fa fa-plus plus-icon" aria-hidden="true"></i>
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
          <Inspector />

          <div
            className="modal fade"
            id={"q" + removeUserId}
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
                    Remove Inspector
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-mdb-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <p>Do you want to remove this inspector?</p>
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
                        onClick={this.removeUser}
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
export default connect(mapStateToProps, mapDispatchToProps)(ManageInspector);
