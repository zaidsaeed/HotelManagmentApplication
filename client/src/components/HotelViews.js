import React, { Component } from "react";
import HotelView from "./HotelView";
import Navbar from "./Navbar";

export default class HotelViews extends Component {
  render() {
    const hotelViews = this.props.location.state.hotelViews.hotelView;
    debugger;
    const hotelRoomViews = hotelViews.map((hotelView, index) => {
      return (
        <HotelView
          city={hotelView.city}
          hotel_chain_name={hotelView.hotel_chain}
          price={hotelView.price}
          capacity={hotelView.capacity}
          view={hotelView.room_view}
          street_name={hotelView.street_name}
          street_number={hotelView.street_number}
          zip={hotelView.zip}
          state={hotelView.state}
          key={index}
          room_number={hotelView.room_number}
          number_of_rooms={hotelView.number_of_rooms}
        />
      );
    });

    return (
      <div>
        <Navbar />
        <br />
        {hotelRoomViews}
      </div>
    );
  }
}
