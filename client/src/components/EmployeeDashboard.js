import React, { Component } from "react";
import RoomTable from "./RoomTable";
export default class EmployeeDashboard extends Component {
  render() {
    return (
      <div>
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
