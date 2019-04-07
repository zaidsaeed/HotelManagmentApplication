import React, { Component } from "react";
import classnames from "classnames";
import gql from "graphql-tag";
import { Mutation, withApollo } from "react-apollo";

const EDIT_EMPLOYEE = gql`
  mutation(
    $ssn_sin: String!
    $street_number: Int
    $street_name: String
    $apt_number: Int
    $city: String
    $state_or_province: String
    $zip_or_postal_code: String
    $first_name: String
    $middle_name: String
    $last_name: String
    $username: String
    $emp_password: String
    $emp_role: String
    $hotel_contact_email: String
    $hotel_chain_id: Int
  ) {
    editEmployee(
      ssn_sin: $ssn_sin
      street_number: $street_number
      street_name: $street_name
      apt_number: $apt_number
      city: $city
      state_or_province: $state_or_province
      zip_or_postal_code: $zip_or_postal_code
      first_name: $first_name
      middle_name: $middle_name
      last_name: $last_name
      username: $username
      emp_password: $emp_password
      emp_role: $emp_role
      hotel_contact_email: $hotel_contact_email
      hotel_chain_id: $hotel_chain_id
    ) {
      emp_role
    }
  }
`;

const DELETE_EMPLOYEE = gql`
  mutation(
    $ssn_sin: String!
    $hotel_chain_id: Int!
    $hotel_contact_email: String!
  ) {
    deleteEmployee(
      ssn_sin: $ssn_sin
      hotel_chain_id: $hotel_chain_id
      hotel_contact_email: $hotel_contact_email
    )
  }
`;

class EditDeleteEmployeeAccount extends Component {
  constructor() {
    super();
    const employee = JSON.parse(window.localStorage.getItem("user")).employee;
    this.state = { ...employee, errors: {} };
    console.log("this.editempState", this.state);
  }

  deleteContact = () => {
    const objectTOSEND = {
      ssn_sin: this.state.ssn_sin.toString(),
      hotel_chain_id: parseInt(this.state.hotel_chain_id),
      hotel_contact_email: this.state.hotel_contact_email
    };
    console.log("ib", objectTOSEND);
    debugger;
    this.props.client
      .mutate({
        mutation: DELETE_EMPLOYEE,
        variables: {
          ssn_sin: this.state.ssn_sin.toString(),
          hotel_chain_id: parseInt(this.state.hotel_chain_id),
          hotel_contact_email: this.state.hotel_contact_email
        }
      })
      .then(data => {
        window.localStorage.clear();
        this.props.history.push("/signUp");
      })
      .catch(err => {
        console.log("err", err);
        this.setState({
          errors: {
            userName: "Username is incorrect",
            password: "Password is incorrect"
          }
        });
      });
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    const { errors } = { ...this.state };
    return (
      <Mutation mutation={EDIT_EMPLOYEE}>
        {(editEmployee, { data }) => (
          <div className="register">
            <div className="container">
              <div className="row">
                <div className="col-md-8 m-auto">
                  <h1 className="display-4 text-center">Sign Up</h1>
                  <p className="lead text-center">
                    Edit your Employee HotelsApp account
                  </p>
                  <form
                    noValidate
                    onSubmit={e => {
                      e.preventDefault();
                      const newUser = {
                        ssn_sin: this.state.ssn_sin.toString(),
                        street_number: parseInt(this.state.street_number),
                        street_name: this.state.street_name,
                        apt_number: parseInt(this.state.apt_number),
                        city: this.state.city,
                        state_or_province: this.state.state_or_province,
                        zip_or_postal_code: this.state.zip_or_postal_code,
                        first_name: this.state.first_name,
                        middle_name: this.state.middle_name,
                        last_name: this.state.last_name,
                        username: this.state.username,
                        emp_password: this.state.emp_password,
                        hotel_chain_id: parseInt(this.state.hotel_chain_id),
                        hotel_contact_email: this.state.hotel_contact_email,
                        emp_role: this.state.emp_role
                      };
                      console.log("newEmployee", newUser);
                      editEmployee({ variables: newUser });
                      this.props.history.push("/logIn");
                    }}
                  >
                    <div className="form-group">
                      <input
                        name="ssn_sin"
                        maxLength="9"
                        className={classnames("form-control form-control-lg", {
                          "is-invalid": errors.name
                        })}
                        placeholder="SSN/SIN"
                        value={this.state.ssn_sin}
                        onChange={this.onChange}
                        type="Number"
                        readOnly
                      />
                      <div class="invalid-feedback">{errors.email}</div>
                    </div>
                    <div className="form-group">
                      <input
                        type="integer"
                        className={classnames("form-control form-control-lg", {
                          "is-invalid": errors.email
                        })}
                        placeholder="Street Number"
                        name="street_number"
                        value={this.state.street_number}
                        onChange={this.onChange}
                      />
                      <div class="invalid-feedback">{errors.email}</div>
                    </div>
                    <div className="form-group">
                      <input
                        type="String"
                        className={classnames("form-control form-control-lg", {
                          "is-invalid": errors.password
                        })}
                        placeholder="Street Name"
                        name="street_name"
                        value={this.state.street_name}
                        onChange={this.onChange}
                      />
                      <div class="invalid-feedback">{errors.password}</div>
                    </div>
                    <div className="form-group">
                      <input
                        type="Integer"
                        className={classnames("form-control form-control-lg", {
                          "is-invalid": errors.password2
                        })}
                        placeholder="Apartment Number"
                        name="apt_number"
                        value={this.state.apt_number}
                        onChange={this.onChange}
                      />
                      <div class="invalid-feedback">{errors.password2}</div>
                    </div>
                    <div className="form-group">
                      <input
                        type="String"
                        className={classnames("form-control form-control-lg", {
                          "is-invalid": errors.password2
                        })}
                        placeholder="City:"
                        name="city"
                        value={this.state.city}
                        onChange={this.onChange}
                      />
                      <div class="invalid-feedback">{errors.password2}</div>
                    </div>
                    <div className="form-group">
                      <input
                        type="String"
                        className={classnames("form-control form-control-lg", {
                          "is-invalid": errors.password2
                        })}
                        placeholder="State/Province:"
                        name="state_or_province"
                        value={this.state.state_or_province}
                        onChange={this.onChange}
                      />
                      <div class="invalid-feedback">{errors.password2}</div>
                    </div>
                    <div className="form-group">
                      <input
                        type="Integer"
                        className={classnames("form-control form-control-lg", {
                          "is-invalid": errors.password2
                        })}
                        placeholder="ZIP/Postal Code:"
                        name="zip_or_postal_code"
                        value={this.state.zip_or_postal_code}
                        onChange={this.onChange}
                      />
                      <div class="invalid-feedback">{errors.password2}</div>
                    </div>
                    <div className="form-group">
                      <input
                        type="String"
                        className={classnames("form-control form-control-lg", {
                          "is-invalid": errors.password2
                        })}
                        placeholder="First Name:"
                        name="first_name"
                        value={this.state.first_name}
                        onChange={this.onChange}
                      />
                      <div class="invalid-feedback">{errors.password2}</div>
                    </div>
                    <div className="form-group">
                      <input
                        type="String"
                        className={classnames("form-control form-control-lg", {
                          "is-invalid": errors.password2
                        })}
                        placeholder="Middle Name:"
                        name="middle_name"
                        value={this.state.middle_name}
                        onChange={this.onChange}
                      />
                      <div class="invalid-feedback">{errors.password2}</div>
                    </div>
                    <div className="form-group">
                      <input
                        type="String"
                        className={classnames("form-control form-control-lg", {
                          "is-invalid": errors.password2
                        })}
                        placeholder="Last Name:"
                        name="last_name"
                        value={this.state.last_name}
                        onChange={this.onChange}
                      />
                      <div class="invalid-feedback">{errors.password2}</div>
                    </div>
                    <div className="form-group">
                      <input
                        type="String"
                        className={classnames("form-control form-control-lg", {
                          "is-invalid": errors.password2
                        })}
                        placeholder="Username:"
                        name="username"
                        value={this.state.username}
                        onChange={this.onChange}
                      />
                      <div class="invalid-feedback">{errors.password2}</div>
                    </div>
                    <div className="form-group">
                      <input
                        type="String"
                        className={classnames("form-control form-control-lg", {
                          "is-invalid": errors.password2
                        })}
                        placeholder="Password:"
                        name="emp_password"
                        value={this.state.emp_password}
                        onChange={this.onChange}
                      />
                      <div class="invalid-feedback">{errors.password2}</div>
                    </div>

                    <div className="form-group">
                      <input
                        type="String"
                        className={classnames("form-control form-control-lg", {
                          "is-invalid": errors.password2
                        })}
                        placeholder="Employee Role:"
                        name="emp_role"
                        value={this.state.emp_role}
                        onChange={this.onChange}
                      />
                      <div class="invalid-feedback">{errors.password2}</div>
                    </div>

                    <div className="form-group">
                      <input
                        readOnly
                        type="String"
                        className={classnames("form-control form-control-lg", {
                          "is-invalid": errors.password2
                        })}
                        placeholder="Hotel Contact Email:"
                        name="hotel_contact_email"
                        value={this.state.hotel_contact_email}
                        onChange={this.onChange}
                      />
                      <div class="invalid-feedback">{errors.password2}</div>
                    </div>

                    <div className="form-group">
                      <input
                        readOnly
                        type="String"
                        className={classnames("form-control form-control-lg", {
                          "is-invalid": errors.password2
                        })}
                        placeholder="Hotel Chain ID:"
                        name="hotel_chain_id"
                        value={this.state.hotel_chain_id}
                        onChange={this.onChange}
                      />
                      <div class="invalid-feedback">{errors.password2}</div>
                    </div>

                    <div style={{ display: "flex" }}>
                      <button
                        type="submit"
                        className="btn btn-block mt-4 btn-primary"
                        style={{ marginRight: "5px" }}
                      >
                        Edit Contact
                      </button>
                      <button
                        type="button"
                        className="btn btn-info btn-block mt-4 btn-danger"
                        onClick={this.deleteContact}
                      >
                        Delete Contact
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}
      </Mutation>
    );
  }
}

export default withApollo(EditDeleteEmployeeAccount);
