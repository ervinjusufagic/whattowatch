import React, { Component } from "react";

import Modal from "@material-ui/core/Modal";

import MyListItem from "./MyListItem";

import { connect } from "react-redux";
import { toggleModal } from "../actions/listActions";

import "../css/myList.css";
import UnwatchedDetailed from "./UnwatchedDetailed";

class Unwatched extends Component {
  constructor(props) {
    super();

    this.renderUnwatchedList.bind(this);
  }

  renderUnwatchedList() {
    return this.props.unwatched.map(movie => {
      return (
        <div
          onClick={() => this.props.toggleModal(!this.props.modalOpen, movie)}
          key={movie.id}
          className="listItem"
        >
          <MyListItem movie={movie} />
        </div>
      );
    });
  }

  render() {
    return (
      <div className="list">
        {this.renderUnwatchedList()}
        <Modal
          style={{ backgroundColor: "#000022", overflow: "scroll" }}
          open={this.props.modalOpen}
          onClose={this.handleClose}
        >
          <UnwatchedDetailed movie={this.props.modalMovie} />
        </Modal>
      </div>
    );
  }
}

const mapDispatchToProps = {
  toggleModal
};

const mapStateToProps = state => ({
  modalOpen: state.modalOpen,
  unwatched: state.unwatched,
  modalMovie: state.modalMovie
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Unwatched);
