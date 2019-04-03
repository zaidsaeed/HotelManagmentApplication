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
          hotel_chain_name={hotelView.hotel_chain_name}
          price={hotelView.price}
          capacity={hotelView.capacity}
          view={hotelView.view}
          address={hotelView.street_name}
          key={index}
        />
      );
    });
  }
}
