import React, { Component } from "react";

export default class HotelView extends Component {
  render() {
    console.log(this.props);

    const { hotelItem } = this.props;

    return (
      <div>
        <div class="container">
          <div class="card">
            <div class="row ">
              <div class="col-md-4">
                <img
                  src={`images/${hotelItem.hotel_chain_name}.jpg`}
                  class="w-100 h-100 rounded"
                  alt={hotelItem.hotel_chain_name}
                />
              </div>
              <div class="col-md-8 px-3">
                <div class="card-block px-3 py-3">
                  <h2 class="card-title">
                    {hotelItem.city} {hotelItem.hotel_chain_name}
                  </h2>
                  <h4 class="card-header">Star Rating: {hotelItem.rating}</h4>
                  <p class="card-text">
                    Size of hotel: {hotelItem.number_of_rooms} rooms
                  </p>
                  <p class="card-text">
                    {hotelItem.street_number} {hotelItem.street_name},{" "}
                    {hotelItem.city}, {hotelItem.state_or_province},{" "}
                    {hotelItem.zip_or_postal_code}
                  </p>
                  <button class="btn btn-primary">View Rooms</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <br />
      </div>
    );
  }
}
