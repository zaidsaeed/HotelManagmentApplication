import React, { Component, Fragment } from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import Navbar from "./Navbar";
import HotelItem from "./HotelItem";

const ALL_HOTELS_QUERY = gql`
  query AllHotelsQuery {
    ordered_hotels {
      street_name
      street_number
      city
      state_or_province
      zip_or_postal_code
      hotel_chain_id
      rating
      contact_email
      manager_ssn_sin
      number_of_rooms
      hotel_chain_name
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
            console.log("DATA", data);

            return (
              <Fragment>
                {data.ordered_hotels.map((hotelItem, index) => (
                  <HotelItem key={index} hotelItem={hotelItem} />
                ))}
              </Fragment>
            );
          }}
        </Query>
      </Fragment>
    );
  }
}
