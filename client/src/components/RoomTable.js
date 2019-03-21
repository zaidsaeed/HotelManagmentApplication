import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class RoomTable extends Component {
  render() {
    return (
      <div>
        <table class="table table-hover">
          <thead>
            <tr>
              <th scope="col">Room Number</th>
              <th scope="col">Column heading</th>
              <th scope="col">Column heading</th>
              <th scope="col">Column heading</th>
              <th scope="col">Column heading</th>
              <th scope="col">Column heading</th>
              <th scope="col">
                <Link to="/employeeSignUp">
                  <i style={{ hover: "pointer" }} className="material-icons">
                    arrow_right_alt
                  </i>
                </Link>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr class="table-active">
              <th scope="row">418</th>
              <td style={{ hover: "pointer" }}>
                <i
                  style={{ hover: "pointer" }}
                  className="material-icons nav-link"
                >
                  check
                </i>
              </td>
              <td>Column content</td>
              <td>Column content</td>
              <td>Column content</td>
              <td>Column content</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}
