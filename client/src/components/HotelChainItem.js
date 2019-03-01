import React, { Component } from "react";

export default class HotelChainItem extends Component {
  render() {
    const { hotelChainItem } = this.props;
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 mt-3">
            <div className="card">
              <div style={{ display: "flex", flex: "1 1 auto" }}>
                <div className="img-square-wrapper">
                  <img
                    style={{
                      height: "250px",
                      width: "250px",
                      display: "block"
                    }}
                    src={hotelChainItem.hotel_chain_logo_link}
                    alt="Card image cap"
                    className="img-fluid float left"
                  />
                </div>
                <div className="card-body">
                  <h4 className="card-title">
                    {hotelChainItem.hotel_chain_name}
                  </h4>
                  <p className="card-text">
                    Number of Hotels: {hotelChainItem.number_of_hotels}
                  </p>
                </div>
              </div>
              <div className="card-footer">
                <small className="text-muted">Last updated 3 mins ago</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
