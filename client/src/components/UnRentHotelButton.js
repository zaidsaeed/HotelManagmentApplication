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
      linkStyle = { cursor: "pointer", paddingLeft: 0 };
    } else {
      linkStyle = { paddingLeft: 0, color: "blue" };
    }
    return (
      <i
        style={linkStyle}
        className="material-icons nav-link"
        title="Rent Room"
        onMouseEnter={this.toggleHover}
        onMouseLeave={this.toggleHover}
        onClick={() => {
          console.log(this.props.roomNumber);
          console.log(this.props.date);
        }}
      >
        check_circle_outline
      </i>
    );
  }
}
