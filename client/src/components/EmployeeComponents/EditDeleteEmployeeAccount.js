import React, { Component } from "react";
import classnames from "classnames";

export default class EditDeleteEmployeeAccount extends Component {
  constructor() {
    super();
    const employee = JSON.parse(window.localStorage.getItem("user")).employee;
    this.state = { ...employee, errors: {} };
    console.log("this.editempState", this.state);
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    const { errors } = { ...this.state };
    return (
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
                    ssn_sin: this.state.ssn_sin,
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
                    emp_password: this.state.emp_password
                  };
                  console.log("newEmployee", newUser);
                  //   addEmployee({ variables: newUser });
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
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
