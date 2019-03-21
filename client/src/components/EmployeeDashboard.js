import React, { Component } from "react";
import RoomTable from "./RoomTable";
export default class EmployeeDashboard extends Component {
  render() {
    return (
      <div style={{ padding: "10px" }}>
        <h1>Employee Dashboard </h1>
        <RoomTable />
      </div>
    );
  }
}
