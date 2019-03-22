import React, { Component } from "react";

export default class RentHotel extends Component {
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
      linkStyle = { cursor: "pointer", color: "blue", paddingRight: 0 };
    } else {
      linkStyle = { paddingRight: 0 };
    }
    return (
      <i
        style={linkStyle}
        className="material-icons nav-link"
        title="Rent Room"
        onMouseEnter={this.toggleHover}
        onMouseLeave={this.toggleHover}
      >
        check_circle_outline
      </i>
    );
  }
}
