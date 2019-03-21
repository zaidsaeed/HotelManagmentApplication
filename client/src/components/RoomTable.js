import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class RoomTable extends Component {
  componentWillReceiveProps() {
    console.log("this.props.dateOffSet", this.props.dateOffSet);
  }

  render() {
    var datesArray = [];
    var date = new Date();
    var count = 0;
    if (this.props.dateOffSet) {
      date.setDate(date.getDate() + this.props.dateOffSet * 5);
    }
    while (count < 5) {
      datesArray.push(new Date(date));
      date.setDate(date.getDate() + 1);
      count = count + 1;
    }

    console.log(datesArray);
    return (
      <div>
        <table className="table table-hover" style={{ padding: "10px" }}>
          <thead>
            <tr>
              <th scope="col" style={{ paddingLeft: "3%" }}>
                Room Number
              </th>
              <th scope="col">
                {datesArray[0].getDate() +
                  "/" +
                  datesArray[0].getMonth() +
                  "/" +
                  datesArray[0].getFullYear()}
              </th>
              <th scope="col">
                {datesArray[1].getDate() +
                  "/" +
                  datesArray[1].getMonth() +
                  "/" +
                  datesArray[1].getFullYear()}
              </th>
              <th scope="col">
                {datesArray[2].getDate() +
                  "/" +
                  datesArray[2].getMonth(1) +
                  "/" +
                  datesArray[2].getFullYear()}
              </th>
              <th scope="col">
                {datesArray[3].getDate() +
                  "/" +
                  datesArray[3].getMonth() +
                  "/" +
                  datesArray[3].getFullYear()}
              </th>
              <th scope="col">
                {datesArray[4].getDate() +
                  "/" +
                  datesArray[4].getMonth() +
                  "/" +
                  datesArray[4].getFullYear()}
              </th>
              <th scope="col">
                <Link
                  to={{
                    pathname: "/employeeDashboard",
                    state: {
                      dateOffSet: this.props.dateOffSet
                        ? this.props.dateOffSet + 1
                        : 1
                    }
                  }}
                >
                  <i style={{ hover: "pointer" }} className="material-icons">
                    arrow_right_alt
                  </i>
                </Link>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr class="table-active">
              <th
                scope="row"
                style={{ verticalAlign: "middle", paddingLeft: "5%" }}
              >
                418
              </th>
              <td style={{ hover: "pointer" }}>
                <i
                  style={{ hover: "pointer", padding: 0 }}
                  className="material-icons nav-link"
                  alt="rent"
                  onClick={() => console.log("hey")}
                >
                  check
                </i>
                <i
                  style={{ hover: "pointer", paddingRight: 0 }}
                  className="material-icons nav-link"
                  onClick={() => console.log("hey")}
                  alt="book"
                >
                  check_circle_outline
                </i>
              </td>
              <td style={{ hover: "pointer" }}>
                <i
                  style={{ hover: "pointer", padding: 0 }}
                  className="material-icons nav-link"
                  alt="rent"
                  onClick={() => console.log("hey")}
                >
                  check
                </i>
                <i
                  style={{ hover: "pointer", paddingRight: 0 }}
                  className="material-icons nav-link"
                  onClick={() => console.log("hey")}
                  alt="book"
                >
                  check_circle_outline
                </i>
              </td>
              <td style={{ hover: "pointer" }}>
                <i
                  style={{ hover: "pointer", padding: 0 }}
                  className="material-icons nav-link"
                  alt="rent"
                  onClick={() => console.log("hey")}
                >
                  check
                </i>
                <i
                  style={{ hover: "pointer", paddingRight: 0 }}
                  className="material-icons nav-link"
                  onClick={() => console.log("hey")}
                  alt="book"
                >
                  check_circle_outline
                </i>
              </td>{" "}
              <td style={{ hover: "pointer" }}>
                <i
                  style={{ hover: "pointer", padding: 0 }}
                  className="material-icons nav-link"
                  alt="rent"
                  onClick={() => console.log("hey")}
                >
                  check
                </i>
                <i
                  style={{ hover: "pointer", paddingRight: 0 }}
                  className="material-icons nav-link"
                  onClick={() => console.log("hey")}
                  alt="book"
                >
                  check_circle_outline
                </i>
              </td>{" "}
              <td style={{ hover: "pointer" }}>
                <i
                  style={{ hover: "pointer", padding: 0 }}
                  className="material-icons nav-link"
                  alt="rent"
                  onClick={() => console.log("hey")}
                >
                  check
                </i>
                <i
                  style={{ hover: "pointer", paddingRight: 0 }}
                  className="material-icons nav-link"
                  onClick={() => console.log("hey")}
                  alt="book"
                >
                  check_circle_outline
                </i>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}
