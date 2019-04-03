import React, { Component } from "react";
import HotelView from "./HotelView";

export default class HotelViews extends Component {
  render() {
    const hotelViews = this.props.location.state.hotelViews.hotelView;
    debugger;
    return hotelViews.map((hotelView, index) => {
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
        />
      );
    });
  }
}
