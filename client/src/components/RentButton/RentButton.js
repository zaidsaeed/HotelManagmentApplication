import React, { Component } from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import UnRentHotelButton from "./UnRentHotelButton";
import RentHotelButton from "./RentHotelButton";

const IS_RENTED_QUERY = gql`
  query IsRentedQuery($date: String, $room_number: Int) {
    is_rented(date: $date, room_number: $room_number)
  }
`;

export default class BookButton extends Component {
  render() {
    return (
      <div style={{ display: "inline" }}>
        <Query
          query={IS_RENTED_QUERY}
          variables={{
            date:
              this.props.date.getFullYear() +
              "-" +
              this.props.date.getMonth() +
              "-" +
              this.props.date.getDate(),
            room_number: this.props.roomNumber
          }}
        >
          {({ loading, error, data }) => {
            if (loading) {
              return <h4> Loading </h4>;
            }
            if (error) {
              console.log(error);
            }
            console.log("this.props.date", this.props.date);
            console.log("this.props.roomNumber", this.props.roomNumber);
            console.log(data);
            return data.is_rented ? <UnRentHotelButton /> : <RentHotelButton />;
          }}
        </Query>
      </div>
    );
  }
}
