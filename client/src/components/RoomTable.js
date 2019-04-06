import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import RentButton from "./RentButton/RentButton";
import BookButton from "./BookButton/BookButton";
import Navbar from "./Navbar";

const ROOM_NUMBERS_QUERY = gql`
  query RoomNumbersQuery($emp_ssn_sin: Int) {
    room_numbers(emp_ssn_sin: $emp_ssn_sin) {
      room_number
    }
  }
`;

class RoomTable extends Component {
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

    return (
      <div>
        <Query query={ROOM_NUMBERS_QUERY} variables={{ emp_ssn_sin: 1 }}>
          {({ loading, error, data }) => {
            if (loading) {
              return <h4> Loading </h4>;
            }
            if (error) {
              console.log(error);
            }
            var roomNumberArray = data.room_numbers.map(rno => {
              return rno.room_number;
            });
            roomNumberArray.sort();
            var tableRows = roomNumberArray.map(roomNumber => {
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
                    <RentButton roomNumber={roomNumber} date={datesArray[0]} />
                    <BookButton roomNumber={roomNumber} date={datesArray[0]} />
                  </td>
                  <td>
                    <RentButton roomNumber={roomNumber} date={datesArray[1]} />
                    <BookButton roomNumber={roomNumber} date={datesArray[1]} />
                  </td>
                  <td>
                    <RentButton roomNumber={roomNumber} date={datesArray[2]} />
                    <BookButton roomNumber={roomNumber} date={datesArray[2]} />
                  </td>
                  <td>
                    <RentButton roomNumber={roomNumber} date={datesArray[3]} />
                    <BookButton roomNumber={roomNumber} date={datesArray[3]} />
                  </td>
                  <td>
                    <RentButton roomNumber={roomNumber} date={datesArray[4]} />
                    <BookButton roomNumber={roomNumber} date={datesArray[4]} />
                  </td>
                </tr>
              );
            });
            return (
              <Fragment>
                <Navbar />
                <table
                  className="table table-hover"
                  style={{ padding: "10px" }}
                >
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
                          <i
                            style={{ hover: "pointer" }}
                            className="material-icons"
                          >
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
                          <i
                            style={{ hover: "pointer" }}
                            className="material-icons"
                          >
                            arrow_forward
                          </i>
                        </Link>
                      </th>
                    </tr>
                  </thead>
                  <tbody>{tableRows}</tbody>
                </table>
                <Link to="/createRenting">
                  <button
                    type="button"
                    style={{ float: "right", marginRight: "13%" }}
                    class="btn btn-success"
                  >
                    Add Renting
                  </button>
                </Link>
              </Fragment>
            );
          }}
        </Query>
      </div>
    );
  }
}

export default RoomTable;
