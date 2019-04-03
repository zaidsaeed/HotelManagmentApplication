import React, { Component } from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";

const IS_BOOKED_QUERY = gql`
  query IsBookedQuery($date: String, $room_number: Int) {
    is_booked(date: $date, room_number: $room_number)
  }
`;

export default class BookHotelButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hover: false
    };
  }
  toggleHover = () => {
    this.setState(prevState => ({
      hover: !prevState.hover
    }));
  };
  render() {
    var linkStyle;
    if (this.state.hover) {
      linkStyle = { cursor: "pointer", color: "blue", padding: 0 };
    } else {
      linkStyle = { padding: 0 };
    }
    return (
      <i
        style={linkStyle}
        className="material-icons nav-link"
        title="Book Room"
        onMouseEnter={this.toggleHover}
        onMouseLeave={this.toggleHover}
      >
        check
      </i>
    );
  }
}
