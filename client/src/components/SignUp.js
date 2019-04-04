import React, { Component } from "react";
import classnames from "classnames";
import gql from "graphql-tag";
import { Mutation, graphql } from "react-apollo";

const ADD_CUSTOMER = gql`
  mutation(
    $ssn_sin: String!
    $street_number: Int
    $street_name: String
    $apt_number: Int
    $city: String
    $state_province: String
    $zip_postalcode: String
    $first_name: String
    $middle_name: String
    $last_name: String
    $date_of_registration: String
    $username: String
    $cust_password: String
  ) {
    addCustomer(
      ssn_sin: $ssn_sin
      street_number: $street_number
      street_name: $street_name
      apt_number: $apt_number
      city: $city
      state_province: $state_province
      zip_postalcode: $zip_postalcode
      first_name: $first_name
      middle_name: $middle_name
      last_name: $last_name
      date_of_registration: $date_of_registration
      username: $username
      cust_password: $cust_password
    ) {
      ssn_sin
    }
  }
`;

class Register extends Component {
  constructor() {
    super();
    this.state = {
      ssn_sin: "",
      street_number: "",
      street_name: "",
      apt_number: "",
      city: "",
      state_province: "",
      zip_postalcode: "",
      first_name: "",
      middle_name: "",
      last_name: "",
      username: "",
      cust_password: "",
      errors: {}
    };
  }

  // componentDidMount() {
  //   if (this.props.auth.isAuthenticated) {
  //     this.props.history.push("/dashboard");
  //   }
  // }

  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.errors) {
  //     this.setState({ errors: nextProps.errors });
  //   }
  // }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    const { errors } = this.state;
    return (
      <Mutation mutation={ADD_CUSTOMER}>
        {(addCustomer, { data }) => (
          <div className="register">
            <div className="container">
              <div className="row">
                <div className="col-md-8 m-auto">
                  <h1 className="display-4 text-center">Sign Up</h1>
                  <p className="lead text-center">
                    Create your HotelsApp account
                  </p>
                  <form
                    noValidate
                    onSubmit={e => {
                      e.preventDefault();
                      const newUser = {
                        ssn_sin: this.state.ssn_sin,
                        street_number: parseInt(this.state.street_number),
                        street_name: this.state.street_name,
                        apt_number: parseInt(this.state.apt_number),
                        city: this.state.city,
                        state_province: this.state.state_province,
                        zip_postalcode: this.state.zip_postalcode,
                        first_name: this.state.first_name,
                        middle_name: this.state.middle_name,
                        last_name: this.state.last_name,
                        date_of_registration: new Date(),
                        username: this.state.username,
                        cust_password: this.state.cust_password
                      };
                   
                      addCustomer({ variables: newUser });
                    }}
                  >
                    <div className="form-group">
                      <input
                        type="String"
                        className={classnames("form-control form-control-lg", {
                          "is-invalid": errors.name
                        })}
                        placeholder="SSN/SIN"
                        name="ssn_sin"
                        value={this.state.ssn_sin}
                        onChange={this.onChange}
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
                        name="state_province"
                        value={this.state.state_province}
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
                        name="zip_postalcode"
                        value={this.state.zip_postalcode}
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
                        name="cust_password"
                        value={this.state.cust_password}
                        onChange={this.onChange}
                      />
                      <div class="invalid-feedback">{errors.password2}</div>
                    </div>
                    <input
                      type="submit"
                      className="btn btn-info btn-block mt-4"
                    />
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

export default graphql(ADD_CUSTOMER)(Register);
