import React, { Component } from "react";
import RoomTable from "./RoomTable";
export default class EmployeeDashboard extends Component {
  render() {
    return (
      <div>
        <h1>Employee Dashboard </h1>
        <RoomTable />
      </div>
    );
  }
}
