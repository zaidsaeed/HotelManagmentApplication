import React, { Component } from "react";
import { Link } from "react-router-dom";
import gql from "graphql-tag";
import { Query, withApollo } from "react-apollo";
import RentHotelButton from "./RentHotelButton";
import BookHotelButton from "./BookHotelButton";

const ROOM_NUMBERS_QUERY = gql`
  query RoomNumbersQuery($emp_ssn_sin: Int) {
    roomNumbers(emp_ssn_sin: $emp_ssn_sin) {
      room_numbers
    }
  }
`;

class RoomTable extends Component {
  componentWillReceiveProps() {
    console.log("this.props.dateOffSet", this.props.dateOffSet);
  }

  componentWillMount() {
    const user = window.localStorage.getItem("user");
    console.log("user", user);
    const arr = this.props.client.query({
      query: ROOM_NUMBERS_QUERY,
      variables: { emp_ssn_sin: 1 }
    });
    console.log(arr);
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
            <RentHotelButton roomNumber={roomNumber} date={datesArray[0]} />
            <BookHotelButton roomNumber={roomNumber} date={datesArray[0]} />
          </td>
          <td>
            <RentHotelButton roomNumber={roomNumber} date={datesArray[1]} />
            <BookHotelButton roomNumber={roomNumber} date={datesArray[1]} />
          </td>
          <td>
            <RentHotelButton roomNumber={roomNumber} date={datesArray[2]} />
            <BookHotelButton roomNumber={roomNumber} date={datesArray[2]} />
          </td>
          <td>
            <RentHotelButton roomNumber={roomNumber} date={datesArray[3]} />
            <BookHotelButton roomNumber={roomNumber} date={datesArray[3]} />
          </td>
          <td>
            <RentHotelButton roomNumber={roomNumber} date={datesArray[4]} />
            <BookHotelButton roomNumber={roomNumber} date={datesArray[4]} />
          </td>
        </tr>
      );
    });

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

export default withApollo(RoomTable);
