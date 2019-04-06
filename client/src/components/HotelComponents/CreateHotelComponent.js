import React, { Component } from "react";
import classnames from "classnames";
import gql from "graphql-tag";
import { Mutation, graphql } from "react-apollo";

const ADD_HOTEL = gql`
  mutation(
    $street_name: String
    $street_number: Int
    $city: String
    $state_or_province: String
    $zip_or_postal_code: String
    $hotel_chain_id: Int
    $rating: Int
    $contact_email: String
    $manager_ssn_sin: Int
    $number_of_rooms: Int
  ) {
    addHotel(
      street_name: $street_name
      street_number: $street_number
      city: $city
      state_or_province: $state_or_province
      zip_or_postal_code: $zip_or_postal_code
      hotel_chain_id: $hotel_chain_id
      rating: $rating
      contact_email: $contact_email
      manager_ssn_sin: $manager_ssn_sin
      number_of_rooms: $number_of_rooms
    ) {
      zip_or_postal_code
    }
  }
`;

class CreateHotelComponent extends Component {
  constructor() {
    super();
    this.state = {
      street_name: "",
      street_number: 0,
      city: "",
      state_or_province: "",
      zip_or_postal_code: "",
      hotel_chain_id: 0,
      rating: 0,
      contact_email: "",
      manager_ssn_sin: 0,
      number_of_rooms: 0,
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
      <Mutation mutation={ADD_HOTEL}>
        {(addHotel, data) => (
          <div>
            <div className="register">
              <div className="container">
                <div className="row">
                  <div className="col-md-8 m-auto">
                    <h1 className="display-4 text-center">Create a Hotel</h1>
                    <p className="lead text-center" />
                    <form
                      noValidate
                      onSubmit={e => {
                        e.preventDefault();
                        const newHotel = {
                          ...this.state,
                          street_number: parseInt(this.state.street_number),
                          hotel_chain_id: parseInt(this.state.hotel_chain_id),
                          rating: parseInt(this.state.rating),
                          manager_ssn_sin: parseInt(this.state.manager_ssn_sin),
                          number_of_rooms: parseInt(this.state.number_of_rooms)
                        };

                        addHotel({ variables: newHotel });
                      }}
                    >
                      <div className="form-group">
                        <input
                          type="String"
                          className={classnames(
                            "form-control form-control-lg",
                            {
                              "is-invalid": errors.name
                            }
                          )}
                          placeholder="Street Name"
                          name="street_name"
                          value={this.state.street_name}
                          onChange={this.onChange}
                        />
                        <div class="invalid-feedback">{errors.email}</div>
                      </div>
                      <div className="form-group">
                        <input
                          type="integer"
                          className={classnames(
                            "form-control form-control-lg",
                            {
                              "is-invalid": errors.email
                            }
                          )}
                          placeholder="Street Number"
                          name="street_number"
                          value={this.state.street_number}
                          onChange={this.onChange}
                        />
                        <div class="invalid-feedback">{errors.email}</div>
                      </div>
                      <div className="form-group">
                        <input
                          type="String"
                          className={classnames(
                            "form-control form-control-lg",
                            {
                              "is-invalid": errors.password
                            }
                          )}
                          placeholder="City"
                          name="city"
                          value={this.state.city}
                          onChange={this.onChange}
                        />
                        <div class="invalid-feedback">{errors.password}</div>
                      </div>
                      <div className="form-group">
                        <input
                          type="Integer"
                          className={classnames(
                            "form-control form-control-lg",
                            {
                              "is-invalid": errors.password2
                            }
                          )}
                          placeholder="State/Province"
                          name="state_or_province"
                          value={this.state.state_or_province}
                          onChange={this.onChange}
                        />
                        <div class="invalid-feedback">{errors.password2}</div>
                      </div>

                      <div className="form-group">
                        <input
                          type="Integer"
                          className={classnames(
                            "form-control form-control-lg",
                            {
                              "is-invalid": errors.password2
                            }
                          )}
                          placeholder="ZIP/Postal Code:"
                          name="zip_or_postal_code"
                          value={this.state.zip_or_postal_code}
                          onChange={this.onChange}
                        />
                        <div class="invalid-feedback">{errors.password2}</div>
                      </div>

                      <div className="form-group">
                        <input
                          type="String"
                          className={classnames(
                            "form-control form-control-lg",
                            {
                              "is-invalid": errors.password2
                            }
                          )}
                          placeholder="Hotel Chain Id:"
                          name="hotel_chain_id"
                          value={this.state.hotel_chain_id}
                          onChange={this.onChange}
                        />
                        <div class="invalid-feedback">{errors.password2}</div>
                      </div>

                      <div className="form-group">
                        <input
                          type="String"
                          className={classnames(
                            "form-control form-control-lg",
                            {
                              "is-invalid": errors.password2
                            }
                          )}
                          placeholder="Rating:"
                          name="rating"
                          value={this.state.rating}
                          onChange={this.onChange}
                        />
                        <div class="invalid-feedback">{errors.password2}</div>
                      </div>

                      <div className="form-group">
                        <input
                          type="String"
                          className={classnames(
                            "form-control form-control-lg",
                            {
                              "is-invalid": errors.password2
                            }
                          )}
                          placeholder="Contact Email:"
                          name="contact_email"
                          value={this.state.contact_email}
                          onChange={this.onChange}
                        />
                        <div class="invalid-feedback">{errors.password2}</div>
                      </div>

                      <div className="form-group">
                        <input
                          type="String"
                          className={classnames(
                            "form-control form-control-lg",
                            {
                              "is-invalid": errors.password2
                            }
                          )}
                          placeholder="Manager SSN/SIN:"
                          name="manager_ssn_sin"
                          value={this.state.manager_ssn_sin}
                          onChange={this.onChange}
                        />
                        <div class="invalid-feedback">{errors.password2}</div>
                      </div>

                      <div className="form-group">
                        <input
                          type="String"
                          className={classnames(
                            "form-control form-control-lg",
                            {
                              "is-invalid": errors.password2
                            }
                          )}
                          placeholder="Number of Rooms:"
                          name="number_of_rooms"
                          value={this.state.number_of_rooms}
                          onChange={this.onChange}
                        />
                        <div class="invalid-feedback">{errors.password2}</div>
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
          </div>
        )}
      </Mutation>
    );
  }
}

export default graphql(ADD_HOTEL)(CreateHotelComponent);
