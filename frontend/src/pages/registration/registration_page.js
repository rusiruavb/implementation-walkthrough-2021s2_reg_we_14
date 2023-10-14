import React, { Component } from "react";
import { connect } from "react-redux";
import firebase from "../../firebase.config.js";
import { NotificationManager } from "react-notifications";
import Select from "react-select";
import Progress from "../../components/progress/progress";
import { createUserForSignUp } from "../../actions/passenger_actions";

let formData = {};
const roles = [
  { value: "MANAGER", label: "MANAGER" },
  { value: "PASSENGER", label: "PASSENGER" },
  { value: "DRIVER", label: "DRIVER" },
  { value: "INSPECTOR", label: "INSPECTOR" },
];
const initialState = {
  firstname: "",
  lastname: "",
  email: "",
  phoneNumber: "",
  password: "",
  confirmPassword: "",
  nic: "",
  imageUrl: "",
  role: "",
  formNotValid: false,
  authenticationData: "",
  profileImage: null,
  uploadPercentage: 0,
  isLoading: false,
};

class registrationPage extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
    this.onChange = this.onChange.bind(this);
    this.setUploadPercentage = this.setUploadPercentage.bind(this);
    this.setImageUrl = this.setImageUrl.bind(this);
    this.setImage = this.setImage.bind(this);
    this.roleSelect = this.roleSelect.bind(this);
  }

  componentWillReceiveProps = (nextProps) => {
    if (this.props.createsigupuser !== nextProps.createsigupuser) {
      this.setState({ isLoading: false }, () => {
        NotificationManager.success("User Successfully Registered!");
      });
    }

    if (this.props.createsigupusererror !== nextProps.createsigupusererror) {
      if (
        nextProps.createsigupusererror &&
        nextProps.createsigupusererror.message
      ) {
        this.setState({ isLoading: false }, () => {
          NotificationManager.error(nextProps.createsigupusererror.message);
        });
      } else {
        this.setState({ isLoading: false }, () => {
          NotificationManager.error("REGISTRATION FAILED ");
        });
      }
    }
  };
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  setImage = (e) => {
    this.setState({ profileImage: e.target.files[0] });
  };

  setUploadPercentage = (progress) => {
    this.setState({ uploadPercentage: progress });
  };

  setImageUrl = ({ imageUrl }) => {
    this.setState({ imageUrl: imageUrl }, () => {
      console.log("image url", this.state.imageUrl);
    });
  };

  roleSelect = (event) => {
    if (event) {
      this.setState({ role: event.value });
    }
  };

  uploadImage = (e) => {
    e.preventDefault();
    if (this.state.profileImage !== null) {
      let folderName = "users";
      let file = this.state.profileImage;
      let upload = firebase
        .storage()
        .ref(`${folderName}/${this.state.username}`)
        .put(file);

      upload.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          this.setUploadPercentage(progress);
        },
        (error) => {
          console.log(error);
        },
        () => {
          upload.snapshot.ref.getDownloadURL().then((url) => {
            this.setImageUrl({ imageUrl: url });
            NotificationManager.success("Image upload success");
          });
        }
      );
    }
  };

  onSubmit = (e) => {
    e.preventDefault();
    if (this.validateForm()) {
      let data = Object.values(formData).map((key) => {
        return key != null;
      });
      if (!data.includes(false)) {
        let userData = {
          nic: this.state.nic,
          email: this.state.email,
          firstName: this.state.firstname,
          lastName: this.state.lastname,
          password: this.state.password,
          mobileNumber: this.state.phoneNumber,
          imageurl: this.state.imageUrl,
          role: this.state.role,
        };

        console.log("DATA TO SEND", userData);
        this.props.createUserForSignUp(userData);
        NotificationManager.success(
          "User account successfully created",
          "Success"
        );
      } else {
        this.setState({ formNotValid: true }, () => {
          NotificationManager.warning("Please check the input fields");
        });
      }
    }
  };
  validateForm() {
    const { firstname, lastname, nic, email, phoneNumber, role, password } =
      this.state;
    const data = {
      firstName: firstname && firstname.trim().length > 0 ? firstname : null,
      lastName: lastname && lastname.trim().length > 0 ? lastname : null,
      nic: nic && nic.toString().trim().length > 0 ? nic : null,
      mobileNumber:
        phoneNumber && phoneNumber.trim().length > 0 ? phoneNumber : null,
      role: role && role.trim().length > 0 ? role : null,
      email: email && email.trim().length > 0 ? email : null,
      password: password && password.trim().length > 0 ? password : null,
    };
    formData = Object.assign({}, data);
    return true;
  }

  render() {
    return (
      <div className="container pt-5 pb-5 admin-container-color">
        <div className="container">
          <div className="card reg-form-card">
            <div className="row d-flex justify-content-center">
              <div className="card-body">
                <form method="post">
                  <div className="container">
                    <h2 className="topic-text center">Edit Your Profile</h2>
                    <div className="mb-3">
                      <div>
                        <div className="row">
                          <div className="col-md-6">
                            <label htmlFor="firstname" className="form-label">
                              First Name
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              id="firstname"
                              name="firstname"
                              value={this.state.firstname}
                              onChange={this.onChange}
                            />
                            {formData.firstName === null &&
                            this.state.formNotValid ? (
                              <span className="text-danger validation-text p-0">
                                First name is required
                              </span>
                            ) : null}
                          </div>
                          <div className="col-md-6">
                            <label htmlFor="lastname" className="form-label">
                              Last Name
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              id="lastname"
                              name="lastname"
                              value={this.state.lastname}
                              onChange={this.onChange}
                            />
                            {formData.lastName === null &&
                            this.state.formNotValid ? (
                              <span className="text-danger validation-text p-0">
                                Last name is required
                              </span>
                            ) : null}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row m-0 mb-2">
                      <label htmlFor="nic" className="form-label p-0 m-0">
                        NIC
                      </label>

                      <input
                        type="text"
                        className="form-control"
                        value={this.state.nic}
                        onChange={this.onChange}
                        id="nic"
                        name="nic"
                      />
                      {formData.nic === null && this.state.formNotValid ? (
                        <span className="text-danger validation-text p-0">
                          NIC is required
                        </span>
                      ) : null}
                    </div>
                    <div className="mb-3">
                      <div>
                        <div className="row">
                          <div className="col-md-12">
                            <label htmlFor="email" className="form-label">
                              Email
                            </label>
                            <input
                              className="form-control"
                              name="email"
                              value={this.state.email}
                              id="email"
                              type="email"
                              onChange={this.onChange}
                            />
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-md-6">
                            <label htmlFor="role" className="form-label">
                              Role
                            </label>
                            <Select
                              options={roles}
                              className="form-control"
                              type="text"
                              id="role"
                              name="role"
                              onChange={this.roleSelect}
                            />
                            {formData.role === null &&
                            this.state.formNotValid ? (
                              <span className="text-danger validation-text p-0">
                                Role is required
                              </span>
                            ) : null}
                          </div>
                          <div className="col-md-6">
                            <label htmlFor="phoneNumber" className="form-label">
                              Contact Number
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              id="phoneNumber"
                              name="phoneNumber"
                              value={this.state.phoneNumber}
                              onChange={this.onChange}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mb-3">
                      <div>
                        <div className="row">
                          <div className="col-md-6">
                            <label htmlFor="password" className="form-label">
                              Password
                            </label>
                            <input
                              className="form-control"
                              type="password"
                              name="password"
                              id="password"
                              value={this.state.password}
                              onChange={this.onChange}
                            />
                          </div>
                          <div className="col-md-6">
                            <label
                              htmlFor="confirmPassword"
                              className="form-label"
                            >
                              Confirm Password
                            </label>
                            <input
                              className="form-control"
                              type="password"
                              name="confirmPassword"
                              id="confirmPassword"
                              value={this.state.confirmPassword}
                              onChange={this.onChange}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mb-3">
                      <label htmlFor="profile-image" className="form-label">
                        Profile Image
                      </label>
                      <div className="input-group">
                        <input
                          type="file"
                          className="form-control"
                          id="profile-image"
                          name="imageUrl"
                          onChange={(e) => this.setImage(e)}
                        />
                        <button
                          className="btn btn-color btn-sm"
                          type="button"
                          onClick={this.uploadImage}
                        >
                          UPLOAD
                        </button>
                      </div>
                      {formData.imageurl === null && this.state.formNotValid ? (
                        <span className="text-danger validation-text p-0">
                          Profile image is required
                        </span>
                      ) : null}
                    </div>
                    <div className="mb-3">
                      <Progress percentage={this.state.uploadPercentage} />
                    </div>
                    <div>
                      <button
                        className="submit-button btn-lg w-100"
                        type="submit"
                        onClick={this.onSubmit}
                      >
                        ADD
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  createsigupuser: state.passengerReducer.createsigupuser,
  createsigupusererror: state.passengerReducer.createsigupusererror,
});

const mapDispatchToProps = (dispatch) => ({
  createUserForSignUp: (userData) => {
    dispatch(createUserForSignUp(userData));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(registrationPage);
