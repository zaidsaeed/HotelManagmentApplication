import React, { Component, Fragment } from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import Navbar from "./Navbar";

const AREA_QUERY = gql`
  query AreaQuery {
    area_counts {
      city
      state_or_province
      count
    }
  }
`;

export default class HotelViews extends Component {
  render() {
    return (
      <Fragment>
        <Navbar />
        <Query query={AREA_QUERY}>
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
                <div class="row py-4 px-3 mx-3 my-2 border border-secondary">
                  <div class="col-md-4">
                    <b>Area</b>
                  </div>
                  <div class="col-md-4">
                    <b>Number of Hotels</b>
                  </div>{" "}
                </div>
                {data.area_counts.map((area_count, index) => (
                  <div class="row py-4 px-3 mx-3 my-2 border border-secondary">
                    <div class="col-md-4">
                      {area_count.city}, {area_count.state_or_province}
                    </div>
                    <div class="col-md-4">{area_count.count}</div>{" "}
                  </div>
                ))}
              </Fragment>
            );
          }}
        </Query>
      </Fragment>
    );
  }
}
