import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Navbar extends Component {
  render() {
    const user = JSON.parse(window.localStorage.getItem("user"));
    if (user.customer) {
      var isCustomer = true;
      console.log("isCustomer", isCustomer);
    } else if (user.employee) {
      var isEmployee = true;
      console.log("isEmployee", isEmployee);
    }
    console.log("user", user);
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
          <Link to="/" className="navbar-brand" href="#">
            Hotel App
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarColor01"
            aria-controls="navbarColor01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse col-md" id="navbarColor01">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <a className="nav-link" href="#">
                  Hotels <span className="sr-only">(current)</span>
                </a>
              </li>
              <li className="nav-item">
                <Link to="/hotelchains" className="nav-link" href="#">
                  Hotel Chains
                </Link>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  About
                </a>
              </li>
            </ul>

            <ul className="form-inline navbar-nav my-2 my-lg-0">
              <li className="nav-item">
                <Link to="/signUp" className="nav-link" href="#">
                  Sign Up <span className="sr-only">(current)</span>
                </Link>
              </li>

              <li className="nav-item">
                <Link to="/logIn" className="nav-link" href="#">
                  Log In
                </Link>
              </li>

              <li className="nav-item" id="add">
                <Link to="/employeeSignUp">
                  <i
                    style={{ hover: "pointer" }}
                    className="nav-link material-icons"
                  >
                    add
                  </i>
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}
