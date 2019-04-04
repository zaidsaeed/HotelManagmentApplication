import React, { Component } from "react";
import Confirm from "./Confirm";

export default class HotelView extends Component {
  constructor(...args) {
    super(...args);

    this.state = { modalShow: false };
  }
  modalClose = () => this.setState({ modalShow: false });

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
      state,
      room_number,
      number_of_rooms
    } = {
      ...this.props
    };

    return (
      <div>
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
                    {city} {hotel_chain_name} room {room_number}
                  </h2>
                  <h4 class="card-header">${price}/night </h4>
                  <div class="row py-3">
                    <div class="col-md-4">
                      <p class="card-text">Capacity: {capacity}</p>
                    </div>
                    <div class="col-md-4">
                      <p class="card-text">View: {view} </p>
                    </div>
                    <div class="col-md-4">
                      <p class="card-text">
                        Size of hotel: {number_of_rooms} rooms
                      </p>
                    </div>
                  </div>
                  <p class="card-text">
                    {street_number} {street_name}, {city}, {state}, {zip}
                  </p>
                  <button
                    class="btn btn-primary"
                    onClick={() => {
                      this.setState(
                        { modalShow: true },
                        console.log(this.state)
                      );
                    }}
                  >
                    Book This Room{" "}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="modal">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">Modal title</h5>
                <button
                  type="button"
                  class="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <p>Modal body text goes here.</p>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-primary">
                  Save changes
                </button>
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
        <br />
      </div>
    );
  }
}
