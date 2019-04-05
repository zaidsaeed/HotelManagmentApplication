import React, { Component } from "react";

export default class EditDeleteUserAccount extends Component {
  constructor() {
    super();
    const user = JSON.parse(window.localStorage.getItem("user")).customer;
    console.log("user", user);
    this.state = {};
  }
  render() {
    return (
      <div>
        <h1> hello </h1>
      </div>
    );
  }
}
