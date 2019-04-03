import React, { Component } from "react";

export default class HotelView extends Component {
  render() {
    const { city, hotel_chain_name, price, capacity, view, address } = {
      ...this.props
    };
    return (
      <div class="container">
        <div class="card">
          <div class="row ">
            <div class="col-md-4">
              <img
                src="https://www.ctvnews.ca/polopoly_fs/1.4198928.1543580146!/httpImage/image.jpg_gen/derivatives/landscape_960/image.jpg"
                class="w-100 h-100 rounded"
              />
            </div>
            <div class="col-md-8 px-3">
              <div class="card-block px-3 py-3">
                <h2 class="card-title">
                  {city} {hotel_chain_name}
                </h2>
                <h4 class="card-header">{price}/night </h4>
                <p class="card-text">
                  Capacity: {capacity} View: {view}
                </p>
                <p class="card-text">{address}</p>
                <a class="btn btn-primary">Book This Room</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
