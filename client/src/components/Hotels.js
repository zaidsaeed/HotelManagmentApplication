import React, { Component, Fragment } from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import HotelItem from "./HotelItem";
import Navbar from "./Navbar";

const HOTELS_QUERY = gql`
  query HotelsQuery {
    hotels {
      h_id
      hotelname
      h_address
    }
  }
`;

export class Hotels extends Component {
  render() {
    return (
      <Fragment>
        <Navbar />
        <h1 className="display-4 my-3">Hotels</h1>
        <Query query={HOTELS_QUERY}>
          {({ loading, error, data }) => {
            if (loading) {
              return <h4> Lading </h4>;
            }
            if (error) {
              console.log(error);
            }
            return (
              <Fragment>
                {/* {data.hotels.map(hotelItem => (
                  <HotelItem key={hotelItem.h_id} hotelItem={hotelItem} />
                ))} */}
              </Fragment>
            );
          }}
        </Query>
      </Fragment>
    );
  }
}

export default Hotels;
