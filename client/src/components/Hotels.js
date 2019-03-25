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
        <div class="container">
          <form>
            <div class="form-row">
              <div class="col">
                <div class="input-group">
                  <div class="input-group-prepend">
                    <span class="input-group-text" id="startInput">
                      Start Date:
                    </span>
                  </div>
                  <input type="date" class="form-control" id="startInput" />
                </div>
              </div>
              <div class="col">
                <div class="input-group">
                  <div class="input-group-prepend">
                    <span class="input-group-text" id="endInput">
                      End Date:
                    </span>
                  </div>
                  <input type="date" class="form-control" id="endInput" />
                </div>
              </div>
            </div>
            <div class="form-row">
              <div class="col">
                <input
                  type="text"
                  class="form-control"
                  id="cityInput"
                  placeholder="City"
                />
              </div>
              <div class="col">
                <input
                  type="text"
                  class="form-control"
                  id="stateInput"
                  placeholder="State/Province"
                />
              </div>
              <div class="col">
                <input
                  type="text"
                  class="form-control"
                  id="chainInput"
                  placeholder="Preferred hotel chain"
                />
              </div>
            </div>
            <div class="form-row">
              <div class="col">
                <div class="input-group">
                  <div class="input-group-prepend">
                    <span class="input-group-text" id="minInput">
                      Min Price: $
                    </span>
                  </div>
                  <input
                    type="number"
                    class="form-control"
                    id="minInput"
                    placeholder="Any"
                    min="0"
                    step="10"
                  />
                </div>
              </div>
              <div class="col">
                <div class="input-group">
                  <div class="input-group-prepend">
                    <span class="input-group-text" id="maxInput">
                      Max Price: $
                    </span>
                  </div>
                  <input
                    type="number"
                    class="form-control"
                    id="maxInput"
                    placeholder="Any"
                    min="0"
                    step="10"
                  />
                </div>
              </div>
              <div class="col">
                <div class="input-group">
                  <div class="input-group-prepend">
                    <span class="input-group-text" id="capacityInput">
                      Capacity:
                    </span>
                  </div>
                  <input
                    type="number"
                    class="form-control"
                    id="capacityInput"
                    placeholder="Any"
                    min="1"
                    max="12"
                  />
                </div>
              </div>
            </div>
            <div class="form-row">
              <div class="col">
                <div class="input-group">
                  <div class="input-group-prepend">
                    <span class="input-group-text" id="minRoomsInput">
                      Min # of Rooms in Hotel:
                    </span>
                  </div>
                  <input
                    type="number"
                    class="form-control"
                    id="minRoomsInput"
                    placeholder="Any"
                    min="0"
                    step="25"
                  />
                </div>
              </div>
              <div class="col">
                <div class="input-group">
                  <div class="input-group-prepend">
                    <span class="input-group-text" id="maxRoomsInput">
                      Max # of Rooms in Hotel:
                    </span>
                  </div>
                  <input
                    type="number"
                    class="form-control"
                    id="maxRoomsInput"
                    placeholder="Any"
                    min="0"
                    step="25"
                    max="10000"
                  />
                </div>
              </div>
              <div class="col">
                <div class="input-group">
                  <div class="input-group-prepend">
                    <span class="input-group-text" id="ratingInput">
                      Star Rating:
                    </span>
                  </div>
                  <input
                    type="number"
                    class="form-control"
                    id="ratingInput"
                    placeholder="Any"
                    min="1"
                    max="5"
                  />
                </div>
              </div>
            </div>

            <button type="submit" class="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
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
