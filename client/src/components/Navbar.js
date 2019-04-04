import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Navbar extends Component {
  render() {
    const user = JSON.parse(window.localStorage.getItem("user"));
    if (!user) {
      var isNotSignedInUser = true;
    } else if (user.customer) {
      var isCustomer = true;
      var isEmployee = false;
    } else if (user.employee) {
      var isEmployee = true;
      var isCustomer = false;
      if (user.employee.emp_role === "Manager") {
        var isManager = true;
      }
    }

    const userNotSignedInLinks = (
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
      </ul>
    );

    const userSignedInLinks = (
      <ul className="form-inline navbar-nav my-2 my-lg-0">
        <li className="nav-item" id="bookmarks">
          <Link to="/clientBookmarks">
            <i
              style={{ hover: "pointer" }}
              className="nav-link material-icons"
              title="My Room Bookings"
            >
              bookmarks
            </i>
          </Link>
        </li>

        <li className="nav-item" id="account_circle">
          <Link to="/editAccount">
            <i
              style={{ hover: "pointer" }}
              className="nav-link material-icons"
              title="Account Settings"
            >
              account_circle
            </i>
          </Link>
        </li>
      </ul>
    );

    const managerLinks = (
      <ul className="form-inline navbar-nav my-2 my-lg-0">
        <li className="nav-item">
          <Link to="/hotelEmployees" className="nav-link" href="#">
            Hotel Employees
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/employeeDashboard" className="nav-link" href="#">
            Employee Dashboard
          </Link>
        </li>
        <li className="nav-item" id="add">
          <Link to="/employeeSignUp">
            <i
              style={{ hover: "pointer" }}
              className="nav-link material-icons"
              title="Add Employee"
            >
              add
            </i>
          </Link>
        </li>
      </ul>
    );

    const employeeLinks = (
      <ul className="form-inline navbar-nav my-2 my-lg-0">
        <li className="nav-item" id="account_circle">
          <Link to="/editAccount">
            <i
              style={{ hover: "pointer" }}
              className="nav-link material-icons"
              title="Log out"
            >
              highlight_off
            </i>
          </Link>
        </li>
      </ul>
    );

    debugger;
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
            </ul>
            {isNotSignedInUser ? userNotSignedInLinks : ""};
            {isCustomer ? userSignedInLinks : ""};
            {isManager ? managerLinks : ""};
            {!isNotSignedInUser && !isCustomer && !isManager
              ? employeeLinks
              : ""}
          </div>
        </nav>
      </div>
    );
  }
}
