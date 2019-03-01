import React, { Component, Fragment } from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import Navbar from "./Navbar";
import HotelChainItem from "./HotelChainItem";

const HOTELCHAINS_QUERY = gql`
  query HotelChainsQuery {
    hotel_chains {
      id
      hotel_chain_name
      number_of_hotels
      hotel_chain_logo_link
    }
  }
`;

export class HotelChains extends Component {
  render() {
    return (
      <Fragment>
        <Navbar />
        <h1 className="display-4 my-3">Hotel Chains</h1>
        <Query query={HOTELCHAINS_QUERY}>
          {({ loading, error, data }) => {
            if (loading) {
              return <h4> Loading </h4>;
            }
            if (error) {
              console.log(error);
            }
            console.log(data);
            return (
              <Fragment>
                {data.hotel_chains.map((hotelChainItem, index) => (
                  <HotelChainItem key={index} hotelChainItem={hotelChainItem} />
                ))}
              </Fragment>
            );
          }}
        </Query>
      </Fragment>
    );
  }
}

export default HotelChains;
