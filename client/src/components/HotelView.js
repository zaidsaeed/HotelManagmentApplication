import React, { Component } from "react";

export default class HotelView extends Component {
  render() {
    const {
      city,
      hotel_chain_name,
      price,
      capacity,
      view,
      street_number,
      street_name,
      zip,
      state
    } = {
      ...this.props
    };
    return (
      <div class="container">
        <div class="card">
          <div class="row ">
            <div class="col-md-4">
              <img
                src={`images/${hotel_chain_name}.jpg`}
                class="w-100 h-100 rounded"
                alt={hotel_chain_name}
              />
            </div>
            <div class="col-md-8 px-3">
              <div class="card-block px-3 py-3">
                <h2 class="card-title">
                  {city} {hotel_chain_name}
                </h2>
                <h4 class="card-header">${price}/night </h4>
                <p class="card-text">
                  Capacity: {capacity} View: {view}
                </p>
                <p class="card-text">
                  {street_number} {street_name}, {city}, {state}, {zip}
                </p>
                <a class="btn btn-primary">Book This Room</a>
              </div>
            </div>
          </div>
        </div>
        <br />
      </div>
    );
  }
}
