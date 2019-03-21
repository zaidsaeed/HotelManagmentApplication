import React, { Component } from "react";
import RoomTable from "./RoomTable";
export default class EmployeeDashboard extends Component {
  componentWillReceiveProps() {
    console.log("props.EmployeeDashboard", this.props);
  }
  render() {
    return (
      <div style={{ padding: "10px" }}>
        <h1>Employee Dashboard </h1>

        <RoomTable
          dateOffSet={
            this.props.location.state
              ? this.props.location.state.dateOffSet
              : null
          }
        />
      </div>
    );
  }
}
