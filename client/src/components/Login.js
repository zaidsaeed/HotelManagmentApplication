import React, { Component, Fragment } from "react";
import Navbar from "./Navbar";
import PropTypes from "prop-types";
import classnames from "classnames";
import gql from "graphql-tag";
import { Query, graphql, withApollo } from "react-apollo";

const CUSTOMER_QUERY = gql`
  query customerQuery($username: String!, $cust_password: String!) {
    customer(username: $username, cust_password: $cust_password) {
      ssn_sin
      username
      cust_password
      street_name
    }
  }
`;

const EMP_QUERY = gql`
  query employeeQuery($username: String!, $emp_password: String!) {
    employee(username: $username, emp_password: $emp_password) {
      first_name
      middle_name
      last_name
    }
  }
`;

class Login extends Component {
  constructor() {
    super();
    this.state = {
      userName: "",
      password: "",
      errors: {}
    };
  }

  // componentDidMount() {
  //   if (this.props.auth.isAuthenticated) {
  //     this.props.history.push("/dashboard");
  //   }
  // }

  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.auth.isAuthenticated) {
  //     this.props.history.push("/dashboard");
  //   }
  //   if (nextProps.errors) {
  //     this.setState({ errors: nextProps.errors });
  //   }
  // }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onSubmit = e => {
    e.preventDefault();
    if (this.state.userName.match("^emp.")) {
      const userData = {
        username: this.state.userName,
        emp_password: this.state.password
      };
      this.props.client
        .query({
          query: EMP_QUERY,
          variables: userData
        })
        .then(data => {
          console.log("data", data);
          this.props.history.push("/");
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
    } else {
      const userData = {
        username: this.state.userName,
        cust_password: this.state.password
      };
      this.props.client
        .query({
          query: CUSTOMER_QUERY,
          variables: userData
        })
        .then(data => {
          console.log("data", data);
          this.props.history.push("/");
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
    }
  };

  render() {
    const { errors } = this.state;
    return (
      <Fragment>
        <Navbar />
        <div className="login">
          <div className="container">
            <div className="row">
              <div className="col-md-8 m-auto">
                <h1 className="display-4 text-center">Log In</h1>
                <p className="lead text-center">
                  Sign in to your Hotels Service Client Account
                </p>
                <form noValidate onSubmit={this.onSubmit}>
                  <div className="form-group">
                    <input
                      type="string"
                      className={classnames("form-control form-control-lg", {
                        "is-invalid": errors["userName"]
                      })}
                      placeholder="Email Address"
                      name="userName"
                      value={this.state.userName}
                      onChange={this.onChange}
                    />
                    <div class="invalid-feedback">{errors.userName}</div>
                  </div>

                  <div className="form-group">
                    <input
                      type="password"
                      className={classnames("form-control form-control-lg", {
                        "is-invalid": errors.password
                      })}
                      placeholder="Password"
                      name="password"
                      value={this.state.password}
                      onChange={this.onChange}
                    />
                    {errors.password && (
                      <div class="invalid-feedback">{errors.password}</div>
                    )}
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
      </Fragment>
    );
  }
}

// Login.propTypes = {
//   loginUser: PropTypes.func.isRequired,
//   auth: PropTypes.object.isRequired,
//   errors: PropTypes.object.isRequired
// };

export default withApollo(Login);
