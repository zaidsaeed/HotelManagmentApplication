import React, { Component, Fragment } from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import Navbar from "./Navbar";

const ALL_HOTELS_QUERY = gql`
  query AllHotelsQuery {
    ordered_hotels {
      room_number
      street_name
      street_number
      city
      state
      zip
      hotel_chain
      rating
      price
      hotel_contact_email
      number_of_rooms
      capacity
      room_view
    }
  }
`;
export default class HotelViews extends Component {
  render() {
    return (
      <Fragment>
        <Navbar />
        <h1 className="display-4 my-3">Hotel List</h1>
        <Query query={ALL_HOTELS_QUERY}>
          {({ loading, error, data }) => {
            if (loading) {
              return <h4> Loading </h4>;
            }
            if (error) {
              console.log(error);
            }

            // return (
            // //   <Fragment>
            // //     {data.hotel_chains.map((hotelChainItem, index) => (
            // //       <HotelChainItem key={index} hotelChainItem={hotelChainItem} />
            // //     ))}
            // //   </Fragment>
            // );
          }}
        </Query>
      </Fragment>
    );
  }
}
