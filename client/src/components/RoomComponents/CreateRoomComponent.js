import React, { Component } from "react";
import gql from "graphql-tag";
import { Mutation, graphql } from "react-apollo";
import classnames from "classnames";

const ADD_ROOM = gql`
  mutation(
    $room_number: Int
    $hotel_chain_id: Int
    $hotel_contact_email: String
    $price: Int
    $room_view: String
    $possible_bed_additions: Int
    $capacity: Int
  ) {
    addRoom(
      room_number: $room_number
      hotel_chain_id: $hotel_chain_id
      hotel_contact_email: $hotel_contact_email
      price: $price
      room_view: $room_view
      possible_bed_additions: $possible_bed_additions
      capacity: $capacity
    ) {
      room_number
    }
  }
`;

class CreateRoomComponent extends Component {
  constructor(props) {
    const user = JSON.parse(window.localStorage.getItem("user")).employee;
    debugger;
    super(props);
    this.state = {
      room_number: 0,
      hotel_chain_id: user.hotel_chain_id,
      hotel_contact_email: user.hotel_contact_email,
      price: 0,
      room_view: "",
      possible_bed_additions: "",
      capacity: "",
      errors: {}
    };
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    const { errors } = this.state;
    return (
      <Mutation mutation={ADD_ROOM}>
        {(addRoom, { data }) => (
          <div className="register">
            <div className="container">
              <div className="row">
                <div className="col-md-8 m-auto">
                  <h1 className="display-4 text-center">Create a room</h1>
                  <p className="lead text-center">Create a Room</p>
                  <form
                    noValidate
                    onSubmit={e => {
                      e.preventDefault();
                      const newRoom = {
                        ...this.state,
                        room_number: parseInt(this.state.room_number),
                        hotel_chain_id: parseInt(this.state.hotel_chain_id),
                        price: parseInt(this.state.price),
                        possible_bed_additions: parseInt(
                          this.state.possible_bed_additions
                        ),
                        capacity: parseInt(this.state.capacity)
                      };

                      addRoom({ variables: newRoom });
                    }}
                  >
                    <div className="form-group">
                      <div class="form-group row">
                        <label class="col-md-3 col-form-label">
                          Room Number:
                        </label>
                        <div class="col-md-9">
                          <input
                            type="String"
                            className={classnames(
                              "form-control form-control-lg",
                              {
                                "is-invalid": errors.name
                              }
                            )}
                            placeholder="Room Number:"
                            name="room_number"
                            value={this.state.room_number}
                            onChange={this.onChange}
                          />
                        </div>
                        <div class="invalid-feedback">{errors.email}</div>
                      </div>
                    </div>

                    <div className="form-group">
                      <div class="form-group row">
                        <label class="col-md-3 col-form-label">
                          Hotel Chain ID:
                        </label>
                        <div class="col-md-9">
                          <input
                            readOnly
                            type="String"
                            className={classnames(
                              "form-control form-control-lg",
                              {
                                "is-invalid": errors.name
                              }
                            )}
                            placeholder="Hotel Chain Id:"
                            name="hotel_chain_id"
                            value={this.state.hotel_chain_id}
                          />
                        </div>
                        <div class="invalid-feedback">{errors.email}</div>
                      </div>
                    </div>

                    <div className="form-group">
                      <div class="form-group row">
                        <label class="col-md-3 col-form-label">
                          Hotel Contact Email:
                        </label>
                        <div class="col-md-9">
                          <input
                            readOnly
                            type="String"
                            className={classnames(
                              "form-control form-control-lg",
                              {
                                "is-invalid": errors.name
                              }
                            )}
                            placeholder="Hotel Contact Email:"
                            name="hotel_contact_email"
                            value={this.state.hotel_contact_email}
                          />
                        </div>
                        <div class="invalid-feedback">{errors.email}</div>
                      </div>
                    </div>

                    <div className="form-group">
                      <div class="form-group row">
                        <label class="col-md-3 col-form-label">Price:</label>
                        <div class="col-md-9">
                          <input
                            type="String"
                            className={classnames(
                              "form-control form-control-lg",
                              {
                                "is-invalid": errors.name
                              }
                            )}
                            placeholder="Price:"
                            name="price"
                            value={this.state.price}
                            onChange={this.onChange}
                          />
                        </div>
                        <div class="invalid-feedback">{errors.email}</div>
                      </div>
                    </div>

                    <div className="form-group">
                      <div class="form-group row">
                        <label class="col-md-3 col-form-label">Price:</label>
                        <div class="col-md-9">
                          <input
                            type="String"
                            className={classnames(
                              "form-control form-control-lg",
                              {
                                "is-invalid": errors.name
                              }
                            )}
                            placeholder="Room View:"
                            name="room_view"
                            value={this.state.room_view}
                            onChange={this.onChange}
                          />
                        </div>
                        <div class="invalid-feedback">{errors.email}</div>
                      </div>
                    </div>

                    <div className="form-group">
                      <div class="form-group row">
                        <label class="col-md-3 col-form-label">
                          Possible Bed Additions:
                        </label>
                        <div class="col-md-9">
                          <input
                            type="String"
                            className={classnames(
                              "form-control form-control-lg",
                              {
                                "is-invalid": errors.name
                              }
                            )}
                            placeholder="Possible Bed Additions:"
                            name="possible_bed_additions"
                            value={this.state.possible_bed_additions}
                            onChange={this.onChange}
                          />
                        </div>
                        <div class="invalid-feedback">{errors.email}</div>
                      </div>
                    </div>

                    <div className="form-group">
                      <div class="form-group row">
                        <label class="col-md-3 col-form-label">Capacity:</label>
                        <div class="col-md-9">
                          <input
                            type="String"
                            className={classnames(
                              "form-control form-control-lg",
                              {
                                "is-invalid": errors.name
                              }
                            )}
                            placeholder="Capacity:"
                            name="capacity"
                            value={this.state.capacity}
                            onChange={this.onChange}
                          />
                        </div>
                        <div class="invalid-feedback">{errors.email}</div>
                      </div>
                    </div>

                    <input
                      type="submit"
                      className="btn btn-primary btn-block mt-4"
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

export default graphql(ADD_ROOM)(CreateRoomComponent);
