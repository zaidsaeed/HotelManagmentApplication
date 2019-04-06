import React, { Component, Fragment } from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import Navbar from "./Navbar";

const ROOM_QUERY = gql`
  query RoomQuery($contact_email: String) {
    rooms_in_hotel(contact_email: $contact_email) {
      price
      room_number
      capacity
      room_view
      possible_bed_additions
    }
  }
`;

export default class HotelViews extends Component {
  render() {
    const { hotelItem } = this.props.location.state;
    const variable = { contact_email: hotelItem.contact_email };
    console.log(variable);
    return (
      <Query query={ROOM_QUERY} variables={variable}>
        {({ loading, error, data }) => {
          if (loading) {
            return <h4> Loading </h4>;
          }
          if (error) {
            console.log(error);
            return error;
          }
          return (
            <Fragment>
              <Navbar />
              <h4>
                Rooms in {hotelItem.city} {hotelItem.hotel_chain_name}
              </h4>
              <b>
                <div class="row py-4 px-3 mx-3 my-2 border border-secondary">
                  <div class="col-md-2">Room Number</div>
                  <div class="col-md-2">Capacity</div>
                  <div class="col-md-2">Price</div>
                  <div class="col-md-2">View</div>
                  <div class="col-md-2">Possible Bed Additions</div>
                  <div class="col-md-2"> </div>{" "}
                </div>
              </b>
              {data.rooms_in_hotel.map((room, index) => (
                <div class="row py-4 px-3 mx-3 my-2 border border-secondary">
                  {" "}
                  <div class="col-md-2">{room.room_number}</div>
                  <div class="col-md-2">{room.capacity}</div>
                  <div class="col-md-2">${room.price}/night</div>
                  <div class="col-md-2">{room.room_view}</div>
                  <div class="col-md-2">{room.possible_bed_additions}</div>{" "}
                  <div class="col-md-2">
                    <button />
                  </div>{" "}
                </div>
              ))}
            </Fragment>
          );
        }}
      </Query>
    );
  }
}
