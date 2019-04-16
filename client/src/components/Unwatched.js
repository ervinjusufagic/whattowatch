import React, { Component } from "react";
import MyListItem from "./MyListItem";

import "../css/myList.css";

import Modal from "@material-ui/core/Modal";
import MovieModal from "./MovieModal";

class Unwatched extends Component {
  constructor(props) {
    super();
    this.state = {
      open: false
    };
    this.renderUnwatchedList.bind(this);
  }

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  renderUnwatchedList() {
    return this.props.unwatched.map(movie => {
      return (
        <div className="listItem">
          <MyListItem key={movie.id} movie={movie} />
        </div>
      );
    });
  }

  render() {
    return (
      <div className="list">
        {this.renderUnwatchedList()}
        <Modal
          open={this.state.open}
          open={this.state.open}
          onClose={this.handleClose}
        >
          <MovieModal />
        </Modal>
      </div>
    );
  }
}

export default Unwatched;
