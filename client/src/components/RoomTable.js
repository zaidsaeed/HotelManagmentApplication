import React, { Component } from "react";
import { Link } from "react-router-dom";
import RentHotelButton from "./RentHotelButton";
import BookHotelButton from "./BookHotelButton";

export default class RoomTable extends Component {
  componentWillReceiveProps() {
    console.log("this.props.dateOffSet", this.props.dateOffSet);
  }

  render() {
    var datesArray = [];
    var date = new Date();
    var count = 0;
    var roomNumbersArray = [408, 409, 410, 411];
    console.log(this.props.dateOffSet);
    if (this.props.dateOffSet) {
      date.setDate(date.getDate() + this.props.dateOffSet * 5);
    }
    while (count < 5) {
      datesArray.push(new Date(date));
      date.setDate(date.getDate() + 1);
      count = count + 1;
    }

    console.log(datesArray);

    var tableRows = roomNumbersArray.map(roomNumber => {
      return (
        <tr class="table-active">
          <th style={{ background: "white" }} />
          <th
            scope="row"
            style={{ verticalAlign: "middle", paddingLeft: "5%" }}
          >
            {roomNumber}
          </th>
          <td>
            <RentHotelButton />
            <BookHotelButton />
          </td>
          <td>
            <RentHotelButton />
            <BookHotelButton />
          </td>
          <td>
            <RentHotelButton />
            <BookHotelButton />
          </td>
          <td>
            <RentHotelButton />
            <BookHotelButton />
          </td>
          <td>
            <RentHotelButton />
            <BookHotelButton />
          </td>
        </tr>
      );
    });

    var checkStyleWithNoHover = {
      padding: 0
    };

    return (
      <div>
        <table className="table table-hover" style={{ padding: "10px" }}>
          <thead>
            <tr>
              <th scope="col">
                <Link
                  to={{
                    pathname: "/employeeDashboard",
                    state: {
                      dateOffSet: this.props.dateOffSet
                        ? this.props.dateOffSet - 1
                        : 0
                    }
                  }}
                >
                  <i style={{ hover: "pointer" }} className="material-icons">
                    arrow_back
                  </i>
                </Link>
              </th>
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
                    arrow_forward
                  </i>
                </Link>
              </th>
            </tr>
          </thead>
          <tbody>{tableRows}</tbody>
        </table>
      </div>
    );
  }
}
