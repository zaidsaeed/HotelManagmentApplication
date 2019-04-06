import React, { Component } from "react";
import classnames from "classnames";
import gql from "graphql-tag";
import { Mutation, graphql, withApollo } from "react-apollo";

const DELETE_CUSTOMER = gql`
  mutation($ssn_sin: String!) {
    deleteCustomer(ssn_sin: $ssn_sin)
  }
`;

export default class EditDeleteHotel extends Component {
  constructor(props) {
    super(props);
    const { hotelItem } = props.location.state;
    this.state = {
      street_name: hotelItem.street_name,
      street_number: hotelItem.street_number,
      city: hotelItem.city,
      state_or_province: hotelItem.state_or_province,
      zip_or_postal_code: hotelItem.zip_or_postal_code,
      hotel_chain_id: hotelItem.hotel_chain_id,
      rating: hotelItem.rating,
      contact_email: hotelItem.contact_email,
      manager_ssn_sin: hotelItem.manager_ssn_sin,
      number_of_rooms: hotelItem.number_of_rooms,
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
      <Mutation mutation={DELETE_CUSTOMER}>
        {(editHotel, data) => (
          <div>
            <div className="register">
              <div className="container">
                <div className="row">
                  <div className="col-md-8 m-auto">
                    <h1 className="display-4 text-center">Edit Hotel</h1>
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
                        // editHotel({ variables: newHotel });
                      }}
                    >
                      <div className="form-group">
                        <div class="form-group row">
                          <label class="col-md-3 col-form-label">
                            Street Name:
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
                              placeholder="Street Name"
                              name="street_name"
                              value={this.state.street_name}
                              onChange={this.onChange}
                            />
                          </div>
                          <div class="invalid-feedback">{errors.email}</div>
                        </div>
                      </div>
                      <div className="form-group">
                        <div class="form-group row">
                          <label class="col-md-3 col-form-label">
                            Street Number:
                          </label>
                          <div class="col-md-9">
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
                        </div>
                      </div>
                      <div className="form-group">
                        <div class="form-group row">
                          <label class="col-md-3 col-form-label">City:</label>
                          <div class="col-md-9">
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
                            <div class="invalid-feedback">
                              {errors.password}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="form-group">
                        <div class="form-group row">
                          <label class="col-md-3 col-form-label">
                            Sate/Province:
                          </label>
                          <div class="col-md-9">
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
                            <div class="invalid-feedback">
                              {errors.password2}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="form-group">
                        <div class="form-group row">
                          <label class="col-md-3 col-form-label">
                            Zip/Postal:
                          </label>
                          <div class="col-md-9">
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
                            <div class="invalid-feedback">
                              {errors.password2}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="form-group">
                        <div class="form-group row">
                          <label class="col-md-3 col-form-label">
                            Hotel Chain ID:
                          </label>
                          <div class="col-md-9">
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
                              readonly=""
                            />
                            <div class="invalid-feedback">
                              {errors.password2}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="form-group">
                        <div class="form-group row">
                          <label class="col-md-3 col-form-label">Rating:</label>
                          <div class="col-md-9">
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
                            <div class="invalid-feedback">
                              {errors.password2}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="form-group">
                        <div class="form-group row">
                          <label class="col-md-3 col-form-label">Email:</label>
                          <div class="col-md-9">
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
                              readonly=""
                            />
                            <div class="invalid-feedback">
                              {errors.password2}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="form-group">
                        <div class="form-group row">
                          <label class="col-md-3 col-form-label">
                            Manager SSN/SIN:
                          </label>
                          <div class="col-md-9">
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
                            <div class="invalid-feedback">
                              {errors.password2}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="form-group">
                        <div class="form-group row">
                          <label class="col-md-3 col-form-label">
                            Number of Rooms:
                          </label>
                          <div class="col-md-9">
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
                            <div class="invalid-feedback">
                              {errors.password2}
                            </div>
                          </div>
                        </div>
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
