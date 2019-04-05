import React, { Component, Fragment } from "react";
import gql from "graphql-tag";
import { Query, withApollo } from "react-apollo";
import HotelItem from "./HotelItem";
import Navbar from "./Navbar";

const HOTELS_VIEW_QUERY = gql`
  query HotelViewQuery(
    $search_city: String
    $search_state_or_province: String
    $search_hotel_chain_name: String
    $search_rating: Int
    $search_capacity: Int
    $search_start_date: String
    $search_end_date: String
    $search_min_price: Int
    $search_max_price: Int
    $search_min_rooms: Int
    $search_max_rooms: Int
  ) {
    hotelView(
      search_city: $search_city
      search_state_or_province: $search_state_or_province
      search_hotel_chain_name: $search_hotel_chain_name
      search_rating: $search_rating
      search_capacity: $search_capacity
      search_start_date: $search_start_date
      search_end_date: $search_end_date
      search_min_price: $search_min_price
      search_max_price: $search_max_price
      search_min_rooms: $search_min_rooms
      search_max_rooms: $search_max_rooms
    ) {
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

export class Hotels extends Component {
  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onSubmit = e => {
    console.log(this.state);
    e.preventDefault();
    const searchData = {
      search_city: this.state.cityInput,
      search_state_or_province: this.state.stateInput,
      search_hotel_chain_name: this.state.chainInput,
      search_rating: parseInt(this.state.ratingInput),
      search_capacity: parseInt(this.state.capacityInput),
      search_start_date: this.state.startInput,
      search_end_date: this.state.endInput,
      search_min_price: parseInt(this.state.minPriceInput),
      search_max_price: parseInt(this.state.maxPriceInput),
      search_min_rooms: parseInt(this.state.minRoomsInput),
      search_max_rooms: parseInt(this.state.maxRoomsInput)
    };
    console.log("searchData:", searchData);
    this.props.client
      .query({
        query: HOTELS_VIEW_QUERY,
        variables: searchData
      })
      .then(data => {
        console.log("data.data", data.data);
        this.props.history.push({
          pathname: "/hotelViews",
          state: {
            hotelViews: {
              ...data.data,
              start_date: this.state.startInput,
              end_date: this.state.endInput
            }
          }
        });
      })
      .catch(err => {
        console.log("err", err);
        this.setState({
          errors: {
            userName: "Username is incorrect",
            password: "Password is incorrect"
          }
        });
      });
  };

  constructor() {
    super();
    this.state = {
      startInput: null,
      endInput: null,
      minPriceInput: null,
      maxPriceInput: null,
      stateInput: null,
      chainInput: null,
      cityInput: null,
      capacityInput: null,
      minRoomsInput: null,
      maxRoomsInput: null,
      ratingInput: null,
      errors: {}
    };
  }
  render() {
    return (
      <Fragment>
        <Navbar />
        <h1 className="display-4 my-3">Hotels</h1>
        <div class="container">
          <form noValidate onSubmit={this.onSubmit}>
            <div class="form-row">
              <div class="col">
                <div class="input-group">
                  <div class="input-group-prepend">
                    <span class="input-group-text" id="startInput">
                      Start Date:
                    </span>
                  </div>
                  <input
                    type="date"
                    class="form-control"
                    id="startInput"
                    name="startInput"
                    value={this.state.startInput}
                    onChange={this.onChange}
                  />
                </div>
              </div>
              <div class="col">
                <div class="input-group">
                  <div class="input-group-prepend">
                    <span class="input-group-text" id="endInput">
                      End Date:
                    </span>
                  </div>
                  <input
                    type="date"
                    class="form-control"
                    id="endInput"
                    name="endInput"
                    value={this.state.endInput}
                    onChange={this.onChange}
                  />
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
                  name="cityInput"
                  value={this.state.cityInput}
                  onChange={this.onChange}
                />
              </div>
              <div class="col">
                <input
                  type="text"
                  class="form-control"
                  id="stateInput"
                  placeholder="State/Province"
                  name="stateInput"
                  value={this.state.stateInput}
                  onChange={this.onChange}
                />
              </div>
              <div class="col">
                <input
                  type="text"
                  class="form-control"
                  id="chainInput"
                  placeholder="Preferred hotel chain"
                  name="chainInput"
                  value={this.state.chainInput}
                  onChange={this.onChange}
                />
              </div>
            </div>
            <div class="form-row">
              <div class="col">
                <div class="input-group">
                  <div class="input-group-prepend">
                    <span class="input-group-text" id="minPriceInput">
                      Min Price: $
                    </span>
                  </div>
                  <input
                    type="number"
                    class="form-control"
                    id="minPriceInput"
                    placeholder="Any"
                    min="0"
                    step="10"
                    name="minPriceInput"
                    value={this.state.minPriceInput}
                    onChange={this.onChange}
                  />
                </div>
              </div>
              <div class="col">
                <div class="input-group">
                  <div class="input-group-prepend">
                    <span class="input-group-text" id="maxPriceInput">
                      Max Price: $
                    </span>
                  </div>
                  <input
                    type="number"
                    class="form-control"
                    id="maxPriceInput"
                    placeholder="Any"
                    min="0"
                    step="10"
                    name="maxPriceInput"
                    value={this.state.maxPriceInput}
                    onChange={this.onChange}
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
                    name="capacityInput"
                    value={this.state.capacityInput}
                    onChange={this.onChange}
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
                    name="minRoomsInput"
                    value={this.state.minRoomsInput}
                    onChange={this.onChange}
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
                    name="maxRoomsInput"
                    value={this.state.maxRoomsInput}
                    onChange={this.onChange}
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
                    name="ratingInput"
                    value={this.state.ratingInput}
                    onChange={this.onChange}
                  />
                </div>
              </div>
            </div>
            <button type="submit" class="btn btn-primary">
              Search
            </button>
          </form>
        </div>
      </Fragment>
    );
  }
}

export default withApollo(Hotels);
