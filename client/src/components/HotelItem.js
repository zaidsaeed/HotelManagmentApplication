import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class HotelView extends Component {
  render() {
    console.log(this.props);

    const { hotelItem } = this.props;
    const user = JSON.parse(window.localStorage.getItem("user"));
    if (user && user.employee) {
      if (user.employee.emp_role === "Manager") {
        var isManager = true;
      } else {
        var isManager = false;
      }
    } else {
      var isManager = false;
    }

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
                  <div class="row py-2">
                    <div class="col-md-4">
                      <p class="card-text">
                        Size of hotel: {hotelItem.number_of_rooms} rooms
                      </p>
                    </div>{" "}
                    <div class="col-md-6">
                      <p class="card-text">
                        Contact at: {hotelItem.contact_email}
                      </p>
                    </div>
                  </div>
                  <p class="card-text">
                    {hotelItem.street_number} {hotelItem.street_name},{" "}
                    {hotelItem.city}, {hotelItem.state_or_province},{" "}
                    {hotelItem.zip_or_postal_code}
                  </p>
                  <Link
                    to={{
                      pathname: "/rooms",
                      state: {
                        hotelItem: hotelItem
                      }
                    }}
                  >
                    <button class="btn btn-primary">View Rooms</button>
                  </Link>
                  {isManager ? (
                    <Link
                      to={{
                        pathname: "/editHotelComponent",
                        state: {
                          hotelItem: hotelItem
                        }
                      }}
                    >
                      <button class="btn btn-info" style={{ float: "right" }}>
                        Edit Hotel
                      </button>
                    </Link>
                  ) : (
                    ""
                  )}
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
