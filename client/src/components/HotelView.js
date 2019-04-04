import React, { Component } from "react";
import ReactModal from "react-modal";

export default class HotelView extends Component {
  constructor() {
    super();
    this.state = {
      showModal: false
    };

    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  handleOpenModal() {
    this.setState({ showModal: true });
  }

  handleCloseModal() {
    this.setState({ showModal: false });
  }
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
                    onClick={this.handleOpenModal}
                  >
                    Book This Room
                  </button>
                  <Confirm />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <ReactModal
            class="modal-dialog"
            isOpen={this.state.showModal}
            style={{
              content: {
                bottom: "get outta here"
              }
            }}
          >
            <div class="modal-header">
              <h5 class="modal-title">Confirm Booking</h5>
            </div>
            <div class="modal-body">
              <p>
                Room {room_number} at the {hotel_chain_name} hotel
              </p>
              <p>
                Address: {street_number} {street_name}, {city}, {state}, {zip}
              </p>
              <p>Price per night: ${price}</p>
              <p>View from room: {view}</p>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-primary">
                Confirm
              </button>
              <button class="btn btn-secondary" onClick={this.handleCloseModal}>
                Cancel
              </button>
            </div>
          </ReactModal>
        </div>
        <br />
      </div>
    );
  }
}
