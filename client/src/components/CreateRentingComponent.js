import React, { Component } from "react";
import gql from "graphql-tag";
import { Mutation, graphql } from "react-apollo";

const ADD_ROOM_RENTING = gql`
  mutation(
    $room_number: Int!
    $hotel_contact_email: String
    $hotel_chain_id: Int
    $start_date: String
    $end_date: String
    $cust_ssn_sin: String
  ) {
    addRoomRenting(
      room_number: $room_number
      hotel_contact_email: $hotel_contact_email
      hotel_chain_id: $hotel_chain_id
      start_date: $start_date
      end_date: $end_date
      cust_ssn_sin: $cust_ssn_sin
    ) {
      room_number
    }
  }
`;

class CreateRentingComponent extends Component {
  constructor() {
    super();
    this.state = {
      room_number: 0,
      hotel_contact_email: "",
      hotel_chain_id: 0,
      start_date: "",
      end_date: "",
      cust_ssn_sin: ""
    };
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    return (
      <Mutation mutation={ADD_ROOM_RENTING}>
        {(addRoomRenting, { data }) => (
          <div className="register">
            <div className="container">
              <div className="row">
                <div className="col-md-8 m-auto">
                  <h1 className="display-4 text-center">Create Renting</h1>
                  <p className="lead text-center">
                    Allow a customer to rent a hotel room at your hotel
                  </p>
                  <form
                    noValidate
                    onSubmit={e => {
                      e.preventDefault();
                      const newRenting = {
                        ...this.state,
                        room_number: parseInt(this.state.room_number),
                        hotel_chain_id: parseInt(this.state.hotel_chain_id)
                      };
                      console.log("newRenting", newRenting);
                      addRoomRenting({ variables: newRenting });
                    }}
                  >
                    <div className="form-group">
                      <input
                        type="Number"
                        className={"form-control form-control-lg"}
                        placeholder="Room Number"
                        name="room_number"
                        value={this.state.room_number}
                        onChange={this.onChange}
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="String"
                        className={"form-control form-control-lg"}
                        placeholder="Hotel Contact Email"
                        name="hotel_contact_email"
                        value={this.state.hotel_contact_email}
                        onChange={this.onChange}
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="Number"
                        className={"form-control form-control-lg"}
                        placeholder="Hotel Chain Id"
                        name="hotel_chain_id"
                        value={this.state.hotel_chain_id}
                        onChange={this.onChange}
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="String"
                        className={"form-control form-control-lg"}
                        placeholder="Renting Reservation Start Date"
                        name="start_date"
                        value={this.state.start_date}
                        onChange={this.onChange}
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="String"
                        className={"form-control form-control-lg"}
                        placeholder="Renting Reservation Start Date:"
                        name="end_date"
                        value={this.state.end_date}
                        onChange={this.onChange}
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="String"
                        className={"form-control form-control-lg"}
                        placeholder="Customer SSN/SIN:"
                        name="cust_ssn_sin"
                        value={this.state.cust_ssn_sin}
                        onChange={this.onChange}
                      />
                    </div>

                    <input
                      type="submit"
                      className="btn btn-info btn-block mt-4"
                    />
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}
      </Mutation>
    );
  }
}

export default graphql(ADD_ROOM_RENTING)(CreateRentingComponent);
