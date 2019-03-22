import React, { Component } from "react";

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
