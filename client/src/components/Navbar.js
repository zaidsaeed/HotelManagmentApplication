import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Navbar extends Component {
  render() {
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
            <ul className="navbar-nav mr-5 ml-auto">
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
            <input
              className="form-control mr-5 col-md ml-5"
              type="text"
              placeholder="Search"
            />
            <ul className="navbar-nav ml-5 col-md">
              <li className="nav-item">
                <Link to="/signUp" className="nav-link" href="#">
                  Sign Up <span className="sr-only">(current)</span>
                </Link>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Sign In
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}
